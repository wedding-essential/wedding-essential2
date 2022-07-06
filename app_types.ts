export interface User {
  personaId: string;
  lastName: string;
  firstName: string;
  email: string;
}

export interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description: string;
}

export interface Wedding {
  weddingId: string;
  name: string;
  story: string;
  events: Event[];
  dresscode: string;
  witnesses: string[];
}

export interface EventParticipation {
  weddingId: string;
  eventId: string;
  userId: string;
}

export interface Rsvp {
  weddingId: string;
  userId: string;
  status: RsvpStatus;
  role: RoleType[];
}

export type RsvpStatus = "yes" | "no" | "maybe";
export type RoleType = "guest" | "couple" | "organizer" | "spouse";
