import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import BlobStorage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
    mobile : ?Text;
    role : Text; // "Citizen" or "Admin"
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Types
  type Category = {
    #garbage;
    #streetLight;
    #drainage;
    #others;
  };

  type Status = {
    #pending;
    #inProgress;
    #completed;
  };

  type Complaint = {
    id : Text;
    userId : Text;
    name : Text;
    mobile : Text;
    category : Category;
    description : Text;
    photo : ?BlobStorage.ExternalBlob;
    audio : ?BlobStorage.ExternalBlob;
    location : Text;
    status : Status;
    assignedWorker : ?Text;
    completionProof : ?BlobStorage.ExternalBlob;
    rating : ?Nat;
    createdAt : Time.Time;
  };

  module Complaint {
    public func compare(a : Complaint, b : Complaint) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  type Tree = {
    id : Text;
    userId : Text;
    treeType : Text;
    photo : ?BlobStorage.ExternalBlob;
    location : Text;
    plantedDate : Time.Time;
    survivalStatus : Bool;
  };

  module Tree {
    public func compare(a : Tree, b : Tree) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  type SolarApplication = {
    id : Text;
    userId : Text;
    aadhaarDoc : BlobStorage.ExternalBlob;
    billDoc : BlobStorage.ExternalBlob;
    housePhoto : BlobStorage.ExternalBlob;
    status : Status;
    createdAt : Time.Time;
  };

  module SolarApplication {
    public func compare(a : SolarApplication, b : SolarApplication) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  type WaterProject = {
    id : Text;
    userId : Text;
    landPhoto : BlobStorage.ExternalBlob;
    workerAssigned : ?Text;
    completionStatus : Status;
    createdAt : Time.Time;
  };

  module WaterProject {
    public func compare(a : WaterProject, b : WaterProject) : Order.Order {
      Text.compare(a.id, b.id);
    };
  };

  let complaints = Map.empty<Text, Complaint>();
  let trees = Map.empty<Text, Tree>();
  let solarApplications = Map.empty<Text, SolarApplication>();
  let waterProjects = Map.empty<Text, WaterProject>();

  // Complaint Reporting
  public shared ({ caller }) func submitComplaint(
    name : Text,
    mobile : Text,
    category : Category,
    description : Text,
    photo : ?BlobStorage.ExternalBlob,
    audio : ?BlobStorage.ExternalBlob,
    location : Text
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit complaints");
    };

    let id = name.concat(Time.now().toText());
    let complaint : Complaint = {
      id;
      userId = caller.toText();
      name;
      mobile;
      category;
      description;
      photo;
      audio;
      location;
      status = #pending;
      assignedWorker = null;
      completionProof = null;
      rating = null;
      createdAt = Time.now();
    };

    complaints.add(id, complaint);
    id;
  };

  public query ({ caller }) func getComplaint(id : Text) : async Complaint {
    switch (complaints.get(id)) {
      case (null) { Runtime.trap("Complaint not found") };
      case (?complaint) {
        // Only allow owner or admin to view
        if (complaint.userId != caller.toText() and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own complaints");
        };
        complaint;
      };
    };
  };

  public query ({ caller }) func getAllComplaints() : async [Complaint] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all complaints");
    };
    complaints.values().toArray().sort();
  };

  public query ({ caller }) func getMyComplaints() : async [Complaint] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their complaints");
    };
    let userIdText = caller.toText();
    complaints.values().toArray().filter(func(c : Complaint) : Bool {
      c.userId == userIdText;
    }).sort();
  };

  public shared ({ caller }) func updateComplaintStatus(id : Text, status : Status, assignedWorker : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update complaint status");
    };

    switch (complaints.get(id)) {
      case (null) { Runtime.trap("Complaint not found") };
      case (?complaint) {
        let updatedComplaint = {
          complaint with
          status;
          assignedWorker;
        };
        complaints.add(id, updatedComplaint);
      };
    };
  };

  public shared ({ caller }) func addComplaintRating(id : Text, rating : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can rate complaints");
    };

    switch (complaints.get(id)) {
      case (null) { Runtime.trap("Complaint not found") };
      case (?complaint) {
        if (complaint.userId != caller.toText()) {
          Runtime.trap("Unauthorized: Can only rate your own complaint");
        };
        if (complaint.status != #completed) {
          Runtime.trap("Can only rate completed complaints");
        };

        let updatedComplaint = {
          complaint with
          rating = ?rating;
        };
        complaints.add(id, updatedComplaint);
      };
    };
  };

  // Tree Plantation
  public shared ({ caller }) func requestTree(
    treeType : Text,
    photo : ?BlobStorage.ExternalBlob,
    location : Text
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request trees");
    };

    let id = treeType.concat(Time.now().toText());
    let tree : Tree = {
      id;
      userId = caller.toText();
      treeType;
      photo;
      location;
      plantedDate = Time.now();
      survivalStatus = true;
    };

    trees.add(id, tree);
    id;
  };

  public query ({ caller }) func getTree(id : Text) : async Tree {
    switch (trees.get(id)) {
      case (null) { Runtime.trap("Tree not found") };
      case (?tree) {
        // Only allow owner or admin to view
        if (tree.userId != caller.toText() and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own tree requests");
        };
        tree;
      };
    };
  };

  public query ({ caller }) func getAllTrees() : async [Tree] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all trees");
    };
    trees.values().toArray().sort();
  };

  public query ({ caller }) func getMyTrees() : async [Tree] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their tree requests");
    };
    let userIdText = caller.toText();
    trees.values().toArray().filter(func(t : Tree) : Bool {
      t.userId == userIdText;
    }).sort();
  };

  public shared ({ caller }) func updateTreeStatus(id : Text, survivalStatus : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update tree status");
    };

    switch (trees.get(id)) {
      case (null) { Runtime.trap("Tree not found") };
      case (?tree) {
        let updatedTree = {
          tree with
          survivalStatus;
        };
        trees.add(id, updatedTree);
      };
    };
  };

  // Rainwater Harvesting
  public shared ({ caller }) func requestWaterProject(
    landPhoto : BlobStorage.ExternalBlob
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can request water projects");
    };

    let id = "water_".concat(Time.now().toText());
    let project : WaterProject = {
      id;
      userId = caller.toText();
      landPhoto;
      workerAssigned = null;
      completionStatus = #pending;
      createdAt = Time.now();
    };

    waterProjects.add(id, project);
    id;
  };

  public query ({ caller }) func getWaterProject(id : Text) : async WaterProject {
    switch (waterProjects.get(id)) {
      case (null) { Runtime.trap("Water project not found") };
      case (?project) {
        // Only allow owner or admin to view
        if (project.userId != caller.toText() and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own water projects");
        };
        project;
      };
    };
  };

  public query ({ caller }) func getAllWaterProjects() : async [WaterProject] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all water projects");
    };
    waterProjects.values().toArray().sort();
  };

  public query ({ caller }) func getMyWaterProjects() : async [WaterProject] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their water projects");
    };
    let userIdText = caller.toText();
    waterProjects.values().toArray().filter(func(p : WaterProject) : Bool {
      p.userId == userIdText;
    }).sort();
  };

  public shared ({ caller }) func updateWaterProjectStatus(id : Text, workerAssigned : ?Text, status : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update water project status");
    };

    switch (waterProjects.get(id)) {
      case (null) { Runtime.trap("Water project not found") };
      case (?project) {
        let updatedProject = {
          project with
          workerAssigned;
          completionStatus = status;
        };
        waterProjects.add(id, updatedProject);
      };
    };
  };

  // Solar Scheme Application
  public shared ({ caller }) func submitSolarApplication(
    aadhaarDoc : BlobStorage.ExternalBlob,
    billDoc : BlobStorage.ExternalBlob,
    housePhoto : BlobStorage.ExternalBlob
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit solar applications");
    };

    let id = "solar_".concat(Time.now().toText());
    let application : SolarApplication = {
      id;
      userId = caller.toText();
      aadhaarDoc;
      billDoc;
      housePhoto;
      status = #pending;
      createdAt = Time.now();
    };

    solarApplications.add(id, application);
    id;
  };

  public query ({ caller }) func getSolarApplication(id : Text) : async SolarApplication {
    switch (solarApplications.get(id)) {
      case (null) { Runtime.trap("Solar application not found") };
      case (?application) {
        // Only allow owner or admin to view
        if (application.userId != caller.toText() and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own solar applications");
        };
        application;
      };
    };
  };

  public query ({ caller }) func getAllSolarApplications() : async [SolarApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all solar applications");
    };
    solarApplications.values().toArray().sort();
  };

  public query ({ caller }) func getMySolarApplications() : async [SolarApplication] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their solar applications");
    };
    let userIdText = caller.toText();
    solarApplications.values().toArray().filter(func(a : SolarApplication) : Bool {
      a.userId == userIdText;
    }).sort();
  };

  public shared ({ caller }) func updateSolarApplicationStatus(id : Text, status : Status) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update solar application status");
    };

    switch (solarApplications.get(id)) {
      case (null) { Runtime.trap("Solar application not found") };
      case (?application) {
        let updatedApplication = {
          application with
          status;
        };
        solarApplications.add(id, updatedApplication);
      };
    };
  };
};
