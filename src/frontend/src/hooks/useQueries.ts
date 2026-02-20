import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';
import type { Complaint, Tree, WaterProject, SolarApplication, Category, Status, UserProfile } from '../backend';
import { ExternalBlob } from '../backend';

// User Profile
export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

// Complaints
export function useSubmitComplaint() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      mobile: string;
      category: Category;
      description: string;
      photo: File | null;
      audio: File | null;
      location: string;
    }) => {
      if (!actor) throw new Error('Actor not available');

      let photoBlob: ExternalBlob | null = null;
      let audioBlob: ExternalBlob | null = null;

      if (data.photo) {
        const photoBytes = new Uint8Array(await data.photo.arrayBuffer());
        photoBlob = ExternalBlob.fromBytes(photoBytes);
      }

      if (data.audio) {
        const audioBytes = new Uint8Array(await data.audio.arrayBuffer());
        audioBlob = ExternalBlob.fromBytes(audioBytes);
      }

      return actor.submitComplaint(
        data.name,
        data.mobile,
        data.category,
        data.description,
        photoBlob,
        audioBlob,
        data.location
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myComplaints'] });
      toast.success('Complaint submitted successfully');
    },
    onError: (error) => {
      console.error('Submit complaint error:', error);
      toast.error('Failed to submit complaint');
    },
  });
}

export function useMyComplaints() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Complaint[]>({
    queryKey: ['myComplaints'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyComplaints();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAllComplaints() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Complaint[]>({
    queryKey: ['allComplaints'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllComplaints();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateComplaintStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; status: Status; assignedWorker: string | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateComplaintStatus(data.id, data.status, data.assignedWorker);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allComplaints'] });
      toast.success('Status updated successfully');
    },
    onError: (error) => {
      console.error('Update status error:', error);
      toast.error('Failed to update status');
    },
  });
}

export function useAddComplaintRating() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; rating: number }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addComplaintRating(data.id, BigInt(data.rating));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myComplaints'] });
      toast.success('Rating submitted successfully');
    },
    onError: (error) => {
      console.error('Add rating error:', error);
      toast.error('Failed to submit rating');
    },
  });
}

// Trees
export function useRequestTree() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { treeType: string; photo: File | null; location: string }) => {
      if (!actor) throw new Error('Actor not available');

      let photoBlob: ExternalBlob | null = null;
      if (data.photo) {
        const photoBytes = new Uint8Array(await data.photo.arrayBuffer());
        photoBlob = ExternalBlob.fromBytes(photoBytes);
      }

      return actor.requestTree(data.treeType, photoBlob, data.location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myTrees'] });
      toast.success('Tree request submitted successfully');
    },
    onError: (error) => {
      console.error('Request tree error:', error);
      toast.error('Failed to submit tree request');
    },
  });
}

export function useMyTrees() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Tree[]>({
    queryKey: ['myTrees'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyTrees();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAllTrees() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Tree[]>({
    queryKey: ['allTrees'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTrees();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateTreeStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; survivalStatus: boolean }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateTreeStatus(data.id, data.survivalStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTrees'] });
      toast.success('Survival status updated successfully');
    },
    onError: (error) => {
      console.error('Update tree status error:', error);
      toast.error('Failed to update survival status');
    },
  });
}

// Water Projects
export function useRequestWaterProject() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { landPhoto: File }) => {
      if (!actor) throw new Error('Actor not available');

      const photoBytes = new Uint8Array(await data.landPhoto.arrayBuffer());
      const photoBlob = ExternalBlob.fromBytes(photoBytes);

      return actor.requestWaterProject(photoBlob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myWaterProjects'] });
      toast.success('Water project request submitted successfully');
    },
    onError: (error) => {
      console.error('Request water project error:', error);
      toast.error('Failed to submit water project request');
    },
  });
}

export function useMyWaterProjects() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WaterProject[]>({
    queryKey: ['myWaterProjects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyWaterProjects();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAllWaterProjects() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<WaterProject[]>({
    queryKey: ['allWaterProjects'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWaterProjects();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateWaterProjectStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; workerAssigned: string | null; status: Status }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateWaterProjectStatus(data.id, data.workerAssigned, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allWaterProjects'] });
      toast.success('Project status updated successfully');
    },
    onError: (error) => {
      console.error('Update water project status error:', error);
      toast.error('Failed to update project status');
    },
  });
}

// Solar Applications
export function useSubmitSolarApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { aadhaarDoc: File; billDoc: File; housePhoto: File }) => {
      if (!actor) throw new Error('Actor not available');

      const aadhaarBytes = new Uint8Array(await data.aadhaarDoc.arrayBuffer());
      const billBytes = new Uint8Array(await data.billDoc.arrayBuffer());
      const houseBytes = new Uint8Array(await data.housePhoto.arrayBuffer());

      const aadhaarBlob = ExternalBlob.fromBytes(aadhaarBytes);
      const billBlob = ExternalBlob.fromBytes(billBytes);
      const houseBlob = ExternalBlob.fromBytes(houseBytes);

      return actor.submitSolarApplication(aadhaarBlob, billBlob, houseBlob);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySolarApplications'] });
      toast.success('Solar application submitted successfully');
    },
    onError: (error) => {
      console.error('Submit solar application error:', error);
      toast.error('Failed to submit solar application');
    },
  });
}

export function useMySolarApplications() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SolarApplication[]>({
    queryKey: ['mySolarApplications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySolarApplications();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useAllSolarApplications() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<SolarApplication[]>({
    queryKey: ['allSolarApplications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSolarApplications();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateSolarStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; status: Status }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateSolarApplicationStatus(data.id, data.status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allSolarApplications'] });
      toast.success('Application status updated successfully');
    },
    onError: (error) => {
      console.error('Update solar status error:', error);
      toast.error('Failed to update application status');
    },
  });
}
