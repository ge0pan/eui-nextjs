import { useQuery } from "@tanstack/react-query";

import { Campaign } from "@/services/campaign/types";

export const useCampaignsQuery = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const response = await fetch("/api/campaigns");
      const data = await response.json();
      return data as Campaign[];
    },
  });
};
