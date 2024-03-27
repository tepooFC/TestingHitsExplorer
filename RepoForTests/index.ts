import { z } from "zod";

const envVariables = z.object({
  GITHUB_TOKEN: z.string(),
  Explorer_USER: z.string(),
  Explorer_PASS: z.string(),
  Explorer_OTP: z.string()
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends z.infer<typeof envVariables> {}
  }
}