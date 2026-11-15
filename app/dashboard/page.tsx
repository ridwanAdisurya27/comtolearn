import { Suspense } from "react";
import { RequireLogin } from "@/components/dashboard/require-login";
import { requireSession } from "@/lib/session";


// untuk komponen yang membutuhkan data pakai async function
async function Greeting() {
  const session = await requireSession();
  return <h1>Welcome, {session.user.name}</h1>;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RequireLogin>
        <main>
          <Greeting />
          <p>Find a community that matches your interest.</p>
        </main>
      </RequireLogin>
    </Suspense>
  );
}