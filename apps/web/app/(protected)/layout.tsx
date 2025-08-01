import { AppSidebar } from "@/modules/sidebar/app-sidebar";
import { SiteHeader } from "@/modules/sidebar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@webcampus/ui/components/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-foreground/10">
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
