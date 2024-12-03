import { z } from "zod";

export const userCredentialsSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

export const authCookiesSchema = z.object({
  authToken: z.string().min(1),
})

export const reportSchema = z.object({
  job_url: z.string(),
  report_type: z.string(),
  report_reason: z.string()
})




  