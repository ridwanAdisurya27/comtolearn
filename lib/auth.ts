import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, clientPromise, db } from "./mongodb";
import { haveIBeenPwned } from "better-auth/plugins";
import { checkPassword, MIN_LENGTH } from "./password-policy";

const ALLOWED_SUFFIX = "@student.its.ac.id";

await clientPromise;

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // Send `url` to user.email with Resend, Nodemailer, etc.
      console.log("Verify link for", user.email, url);
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      const guarded = ["/sign-up/email", "/change-password", "/reset-password"];
      if (!guarded.includes(ctx.path)) return;

      const password = ctx.body?.password ?? ctx.body?.newPassword;
      const problems = checkPassword(String(password ?? ""), {
        email: ctx.body?.email,
        name: ctx.body?.name,
      });

      if (problems.length > 0) {
        throw new APIError("BAD_REQUEST", { message: problems[0] });
      }
    }),
  },
  plugins: [haveIBeenPwned(), nextCookies()],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!user.email.toLowerCase().endsWith(ALLOWED_SUFFIX)) {
            throw new APIError("BAD_REQUEST", {
              message: "Use your ITS student email (@student.its.ac.id).",
            });
          }
          return { data: user };
        },
      },
    },
  },
});