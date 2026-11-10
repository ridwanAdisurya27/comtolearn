import { GuildRail } from "./components/guild-rail";
import { ChannelSidebar } from "./components/channel-sidebar";
import { MemberSidebar } from "./components/member-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface font-sans select-none overflow-hidden h-screen w-screen flex antialiased">
      {/* Rail Komunitas */}
      <GuildRail />

      {/* Saluran & Menu Guild */}
      <ChannelSidebar />

      {/* Dynamic Content: /dashboard (Chat) or /dashboard/path (Learning Path) */}
      <main className="flex-1 bg-surface flex flex-col min-w-0 h-full overflow-hidden">
        {children}
      </main>

      {/* Anggota Guild */}
      <MemberSidebar />
    </div>
  );
}

