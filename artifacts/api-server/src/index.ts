import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// ── Startup validation for email (Resend) configuration ──────────────────
// These are required for recruiter notification emails to succeed. We warn
// (rather than throw) so the server still boots for health checks / non-mail
// routes, but a missing var here means the first sendRecruiterEmail() call
// will fail. This surfaces the problem in the Render boot logs immediately,
// instead of only surfacing as a 422 from Resend on the first submission.
const requiredMailEnv = [
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RECRUITER_EMAIL",
] as const;

const missingMailEnv = requiredMailEnv.filter((name) => !process.env[name]);

if (missingMailEnv.length > 0) {
  logger.warn(
    { missingMailEnv },
    "Missing email environment variables — recruiter notification emails will fail. " +
      "Set these in Render (or .env locally) to enable email delivery.",
  );
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
