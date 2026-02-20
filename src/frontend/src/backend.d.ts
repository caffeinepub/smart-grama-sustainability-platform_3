import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Tree {
    id: string;
    treeType: string;
    userId: string;
    survivalStatus: boolean;
    photo?: ExternalBlob;
    location: string;
    plantedDate: Time;
}
export type Time = bigint;
export interface Complaint {
    id: string;
    status: Status;
    completionProof?: ExternalBlob;
    audio?: ExternalBlob;
    userId: string;
    name: string;
    createdAt: Time;
    assignedWorker?: string;
    description: string;
    category: Category;
    rating?: bigint;
    mobile: string;
    photo?: ExternalBlob;
    location: string;
}
export interface SolarApplication {
    id: string;
    status: Status;
    housePhoto: ExternalBlob;
    userId: string;
    createdAt: Time;
    billDoc: ExternalBlob;
    aadhaarDoc: ExternalBlob;
}
export interface WaterProject {
    id: string;
    completionStatus: Status;
    userId: string;
    createdAt: Time;
    workerAssigned?: string;
    landPhoto: ExternalBlob;
}
export interface UserProfile {
    name: string;
    role: string;
    mobile?: string;
}
export enum Category {
    streetLight = "streetLight",
    drainage = "drainage",
    garbage = "garbage",
    others = "others"
}
export enum Status {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComplaintRating(id: string, rating: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllComplaints(): Promise<Array<Complaint>>;
    getAllSolarApplications(): Promise<Array<SolarApplication>>;
    getAllTrees(): Promise<Array<Tree>>;
    getAllWaterProjects(): Promise<Array<WaterProject>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComplaint(id: string): Promise<Complaint>;
    getMyComplaints(): Promise<Array<Complaint>>;
    getMySolarApplications(): Promise<Array<SolarApplication>>;
    getMyTrees(): Promise<Array<Tree>>;
    getMyWaterProjects(): Promise<Array<WaterProject>>;
    getSolarApplication(id: string): Promise<SolarApplication>;
    getTree(id: string): Promise<Tree>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWaterProject(id: string): Promise<WaterProject>;
    isCallerAdmin(): Promise<boolean>;
    requestTree(treeType: string, photo: ExternalBlob | null, location: string): Promise<string>;
    requestWaterProject(landPhoto: ExternalBlob): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitComplaint(name: string, mobile: string, category: Category, description: string, photo: ExternalBlob | null, audio: ExternalBlob | null, location: string): Promise<string>;
    submitSolarApplication(aadhaarDoc: ExternalBlob, billDoc: ExternalBlob, housePhoto: ExternalBlob): Promise<string>;
    updateComplaintStatus(id: string, status: Status, assignedWorker: string | null): Promise<void>;
    updateSolarApplicationStatus(id: string, status: Status): Promise<void>;
    updateTreeStatus(id: string, survivalStatus: boolean): Promise<void>;
    updateWaterProjectStatus(id: string, workerAssigned: string | null, status: Status): Promise<void>;
}
