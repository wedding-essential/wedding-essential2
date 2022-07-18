import * as yup from "yup";

import { guestSchema, eventSchema } from "./weddingTypeSchemas";
import {
  wizardNameSchema,
  wizardStorySchema,
  wizardDresscodeSchema,
  wizardGuestsSchema,
  wizardEventsSchema,
} from "./weddingWizardSchemas";

const validator =
  (schema: any) =>
  (value: any): yup.ValidationError => {
    const result = schema.validateSync(value);
    return result;
  };

export const emailValidator = validator(
  yup.string().min(1).email("is not a valid email")
);
// Joi.string().email({ tlds:{allow: false} })
export const guestValidator = validator(guestSchema);
export const eventValidator = validator(eventSchema);
export const wizardNameValidator = validator(wizardNameSchema);
export const wizardStoryValidator = validator(wizardStorySchema);
export const wizardDresscodeValidator = validator(wizardDresscodeSchema);
export const wizardGuestsValidator = validator(wizardGuestsSchema);
export const wizardEventsValidator = validator(wizardEventsSchema);
