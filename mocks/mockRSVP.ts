import { Rsvp } from "../app_types";

export const mockRSVP: Rsvp[] = [
  { weddingId: "1", userId: "1", status: "yes", role: ["guest"] },
  { weddingId: "1", userId: "2", status: "no", role: ["guest"] },
  { weddingId: "1", userId: "3", status: "maybe", role: ["guest"] },
  { weddingId: "2", userId: "1", status: "yes", role: ["spouse", "organizer"] },
  { weddingId: "2", userId: "2", status: "no", role: ["guest"] },
];
