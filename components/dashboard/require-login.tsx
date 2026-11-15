import { requireSession } from "@/lib/session";

export async function RequireLogin({ children }: { children: React.ReactNode }) {
  await requireSession();
  return <>{children}</>;
}