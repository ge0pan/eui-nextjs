import { User } from "@/services/user/types";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  status: string;
  geo: string;
  area: string;
  language: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};

export type CampaignCreateInput = {
  name: string;
  description: string;
  type: string;
  subtype: string;
  status: string;
  geo: string;
  area: string;
  language: string;
};
