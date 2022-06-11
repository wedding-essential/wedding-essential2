import { v4 as uuidv4 } from "uuid";
import { User } from "../app_types";

export const mockUsers: User[] = [
  {
    personaId: "1",
    firstName: "John",
    lastName: "Doe",
    email: "example@hello.com",
  },
  {
    personaId: "2",
    firstName: "Alice",
    lastName: "Cooper",
    email: "example2@hello.com",
  },
  {
    personaId: "3",
    firstName: "Bob",
    lastName: "Smith",
    email: "example3@hello.com",
  },
];
