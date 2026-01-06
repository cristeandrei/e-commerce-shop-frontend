import z from "zod";

export type UserLoginDetails = z.infer<typeof userLoginDetailsSchema>;

export const userLoginDetailsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});
