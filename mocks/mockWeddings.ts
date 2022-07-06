import { v4 as uuidv4 } from "uuid";
import { Wedding } from "../app_types";

export const mockWeddings: Wedding[] = [
  {
    weddingId: "1",
    name: "Laura & John Doe",
    story: "Our story is about... to get better. We are going to get better.",
    events: [],
    dresscode: "You can wear anything1",
    witnesses: ["3"],
  },
  {
    weddingId: "2",
    name: "Eva & Adele Mera",
    story: "Our story is about... to get better. We are going to get better.",
    events: [],
    dresscode: "You can wear anything2",
    witnesses: ["3"],
  },
  {
    weddingId: "3",
    name: "Alan & Charlie Bottine",
    story: "Our story is about... to get better. We are going to get better.",
    events: [],
    dresscode: "You can wear anything3",
    witnesses: ["3"],
  },
];
