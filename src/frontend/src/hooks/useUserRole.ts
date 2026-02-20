import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import type { UserRole } from '../backend';

export function useUserRole() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<UserRole>({
    queryKey: ['userRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    role: query.data,
    isAdmin: query.data === 'admin',
    isUser: query.data === 'user',
    isGuest: query.data === 'guest',
    isLoading: actorFetching || query.isLoading,
  };
}
