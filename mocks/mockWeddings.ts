import { v4 as uuidv4 } from "uuid";
import { Wedding } from "../app_types";

export const mockWeddings: Wedding[] = [
  {
    weddingId: "123",
    couple: ["1", "2"],
    story: "Our story is about... to get better. We are going to get better.",
    events: [],
    dresscode: "You can wear anything",
    witnesses: ["3"],
  },
];
