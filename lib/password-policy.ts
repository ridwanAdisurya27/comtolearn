export const MIN_LENGTH = 10;

type Context = { email?: string; name?: string };

export function checkPassword(password: string, ctx: Context = {}): string[] {
  const problems: string[] = [];

  if (password.length < MIN_LENGTH) {
    problems.push(`Use at least ${MIN_LENGTH} characters.`);
  }

  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) =>
    r.test(password),
  ).length;
  if (kinds < 3) {
    problems.push("Mix at least three of: lowercase, uppercase, numbers, symbols.");
  }

  const emailName = ctx.email?.split("@")[0]?.toLowerCase();
  if (emailName && emailName.length >= 3 && password.toLowerCase().includes(emailName)) {
    problems.push("Don't use your email name inside the password.");
  }

  if (/(.)\1{3,}/.test(password)) {
    problems.push("Avoid repeating the same character four or more times.");
  }

  return problems;
}