import { DateTime } from "luxon";

export interface User {
  personaId: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface Event {
  id: number;
  name: string;
  date: DateTime;
  location: string;
  description: string;
  participants: User[];
}

export interface Wedding {
  weddingId: string;
  name: string;
  story: string;
  dresscode: string;
  witnesses: string[];
}

export interface Rsvp {
  weddingId: string;
  userId: string;
  status: RsvpStatus;
  role: RoleType[];
}

export type RsvpStatus = "yes" | "no" | "maybe";
export type RoleType = "guest" | "couple" | "organizer" | "spouse";
