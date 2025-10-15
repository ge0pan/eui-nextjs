import React from "react";

import { EuiBasicTable, EuiBasicTableColumn } from "@elastic/eui";

import { Campaign } from "@/services/campaign/types";

export type CampaignTableProps = {
  campaigns: Campaign[];
};

const columns: EuiBasicTableColumn<Campaign>[] = [
  {
    field: "id",
    name: "ID",
    truncateText: true,
    width: "15%",
  },
  {
    field: "name",
    name: "Name",
    truncateText: true,
    width: "30%",
  },
  {
    field: "status",
    name: "Status",
    width: "15%",
  },
  {
    field: "createdAt",
    name: "Created At",
    render: (_, campaign) => campaign.createdAt.toLocaleDateString(),
    width: "20%",
  },
];

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => (
  <EuiBasicTable items={campaigns} columns={columns} />
);
