import { v4 as uuidv4 } from "uuid";
import { Event } from "../app_types";
import { DateTime } from "luxon";

export const mockEvents: Event[] = [
  {
    id: 1,
    name: "Reception",
    date: DateTime.now().plus({ days: 1 }),
    location: "Amazing restaurant",
    description: "Miam Miam Miam",
    participants: [],
  },
  {
    id: 2,
    name: "Church ceremony",
    date: DateTime.now().plus({ days: 1, hours: 3 }),
    location: "Church",
    description: "Main ceremony",
    participants: [],
  },
  {
    id: 3,
    name: "Dress fitting for her",
    date: DateTime.now().minus({ days: 25 }),
    location: "Wedding dress shop",
    description: "Get that dress",
    participants: [],
  },
  {
    id: 4,
    name: "Suit fitting for him",
    date: DateTime.now().minus({ days: 25, hours: 3 }),
    location: "Suit shop",
    description: "Get that Suit",
    participants: [],
  },
];
