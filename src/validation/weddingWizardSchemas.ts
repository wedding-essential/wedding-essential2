import * as yup from "yup";

import { guestSchema, eventSchema } from "./weddingTypeSchemas";

export const wizardNameSchema = yup.string().min(3).max(50).required();
export const wizardStorySchema = yup.string().max(1000);
export const wizardDresscodeSchema = yup.string().max(100);
export const wizardGuestsSchema = yup.array().of(guestSchema);
export const wizardEventsSchema = yup.array().of(eventSchema);
