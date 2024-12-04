import z from "zod";

export const userCredentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const serverErrorSchema = z.object({
  errorMessage: z.string()
})

export const tokenResponseSchema = z.object({
  authToken: z.string()
}).or(serverErrorSchema)

export const implicitLoginSchema = z.object({
  authToken: z.string(),
  username: z.string(),
}).or(serverErrorSchema)

export const reportSchema = z.object({
  id: z.number(),
  reporter: z.string(),
  job_url: z.string(),
  report_type: z.string(),
  report_reason: z.string()
})

export const reportsSchema = z.array(reportSchema)
