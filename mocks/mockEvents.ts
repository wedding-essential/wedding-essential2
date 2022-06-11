import { v4 as uuidv4 } from "uuid";
import { Event } from "../app_types";

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Reception",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    location: "Amazing restaurant",
    description: "Miam Miam Miam",
  },
  {
    id: 2,
    name: "Church ceremony",
    date: new Date(Date.now()),
    location: "Church",
    description: "Main ceremony",
  },
  {
    id: 3,
    name: "Dress fitting for her",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    location: "Wedding dress shop",
    description: "Get that dress",
  },
  {
    id: 4,
    name: "Suit fitting for him",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 - 1000 * 60 * 60 * 2),
    location: "Suit shop",
    description: "Get that Suit",
  },
];
