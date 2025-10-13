import { Campaign } from "@/services/campaign/types";

const data: Campaign[] = [
  {
    id: "1",
    name: "Summer Sales Promotion",
    description: "Promote summer products to increase sales",
    status: "active",
    geo: "North America",
    area: "Retail Stores",
    language: "English",
    owner: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Regional Manager",
      createdAt: new Date("2021-06-15T14:30:00.000Z"),
      updatedAt: new Date("2022-02-20T14:30:00.000Z"),
    },
    createdAt: new Date("2021-06-15T14:30:00.000Z"),
    updatedAt: new Date("2022-02-20T14:30:00.000Z"),
  },
  {
    id: "2",
    name: "Back to School Promotion",
    description:
      "Increase sales of school supplies by offering discounts and promotions",
    status: "active",
    geo: "United States",
    area: "Retail Stores",
    language: "English",
    owner: {
      id: "2",
      name: "Emily Chen",
      email: "emily.chen@example.com",
      role: "Regional Manager",
      createdAt: new Date("2022-01-05T14:30:00.000Z"),
      updatedAt: new Date("2022-03-15T14:30:00.000Z"),
    },
    createdAt: new Date("2022-01-05T14:30:00.000Z"),
    updatedAt: new Date("2022-03-15T14:30:00.000Z"),
  },
  {
    id: "3",
    name: "Holiday Gift Promotion",
    description: "Promote holiday gift products to increase sales",
    status: "inactive",
    geo: "Europe",
    area: "Retail Stores",
    language: "English",
    owner: {
      id: "3",
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      role: "Regional Manager",
      createdAt: new Date("2022-04-10T14:30:00.000Z"),
      updatedAt: new Date("2022-05-15T14:30:00.000Z"),
    },
    createdAt: new Date("2022-04-10T14:30:00.000Z"),
    updatedAt: new Date("2022-05-15T14:30:00.000Z"),
  },
];

export default data;
