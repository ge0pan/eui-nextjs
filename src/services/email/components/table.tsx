import React from "react";

import { EuiBasicTable, EuiBasicTableColumn, EuiCode } from "@elastic/eui";

import { Email } from "@/services/email/types";

export type EmailTableProps = {
  emails: Email[];
};

const columns: EuiBasicTableColumn<Email>[] = [
  {
    field: "id",
    name: "ID",
    truncateText: true,
    width: "7rem",
    render: (_, email) => <EuiCode>{email.id}</EuiCode>,
  },
  {
    field: "name",
    name: "Name",
    truncateText: true,
  },
  {
    field: "type",
    name: "Type",
    width: "15rem",
  },
  {
    field: "campaign.geo",
    name: "Geo",
    width: "15rem",
  },
  {
    field: "sendDate",
    name: "Send Date",
    render: (_, email) => new Date(email.sendDate).toLocaleDateString(),
    width: "10rem",
  },
];

export const EmailTable: React.FC<EmailTableProps> = ({ emails }) => (
  <EuiBasicTable items={emails} columns={columns} />
);
