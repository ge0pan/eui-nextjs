import { Campaign } from "@/services/campaign/types";
import { User } from "@/services/user/types";

export type Email = {
  id: string;
  name: string;
  type: string;
  content: Record<string, string>;
  campaign: Campaign;
  targeting: string; // JSON
  sendDate: Date;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};
