import UserHooks from "../../hooks/hooks";
import { useQuery } from "@tanstack/react-query";

export const useAuthStatus = () => {
    const { userAccount, userInfo } = UserHooks();

    console.log('userAccount info hooks', userInfo);

    return useQuery({
        queryKey: ['authStatus'],
        queryFn: async () => {
            if (!userAccount) {
                throw new Error('Not authenticated');
            }
            return { userInfo };
        },
        staleTime: 0, // Cache for 5 minutes
        refetchOnWindowFocus: false,
    });
};
