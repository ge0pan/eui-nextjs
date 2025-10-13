import { Email } from "@/services/email/types";

const data: Email[] = [
  {
    id: "1",
    name: "New Product Launch",
    type: "Promotional",
    content: {
      subject: "New Product Launch: Summer Sale",
      body: `<p>Dear valued customer,</p><p>We are excited to introduce our new summer collection. This season, we have a range of products that are perfect for the warm weather.</p><p>From now until the end of summer, we are offering a 20% discount on all products in our summer collection.</p><p>Don't miss out on this amazing opportunity to refresh your wardrobe with our latest products.</p><p>Best regards,</p><p>The [Brand Name] Team</p>`,
    },
    campaign: {
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
    sendDate: new Date(),
    owner: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Regional Manager",
      createdAt: new Date("2021-06-15T14:30:00.000Z"),
      updatedAt: new Date("2022-02-20T14:30:00.000Z"),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "End of Summer Sale",
    type: "Promotional",
    content: {
      subject: "End of Summer Sale: Up to 50% Off",
      body: `<p>Dear valued customer,</p><p>The summer is coming to an end, and we want to make sure you have the best chance to get your hands on our latest products at an unbeatable price.</p><p>We are offering up to 50% off on all products in our summer collection. This is a one-time offer, so don't miss out!</p><p>Best regards,</p><p>The [Brand Name] Team</p>`,
    },
    campaign: {
      id: "2",
      name: "End of Summer Sale",
      description: "Promote summer products to increase sales",
      status: "active",
      geo: "North America",
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
    sendDate: new Date(),
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
];

export default data;
