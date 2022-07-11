import { useQuery } from "react-query";

export const useUserData = (userId: string) => {
  return useQuery(["user-query"], async () => {
    return await (await fetch(`/api/users/${userId}`)).json();
  });
};
