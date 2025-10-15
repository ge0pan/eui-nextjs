import { useQuery } from "@tanstack/react-query";

import { Email } from "@/services/email/types";

export const useEmailsQuery = () => {
  return useQuery({
    queryKey: ["emails"],
    queryFn: async () => {
      const response = await fetch("/api/emails");
      const data = await response.json();
      return data as Email[];
    },
  });
};
