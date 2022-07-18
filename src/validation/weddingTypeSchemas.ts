import * as yup from "yup";

export const guestSchema = yup.string().email();
export const eventSchema = yup.object({
  id: yup.string().uuid(),
  name: yup.string().required(),
  date: yup.date().required(),
  location: yup.string().required(),
  description: yup.string().max(200),
});
