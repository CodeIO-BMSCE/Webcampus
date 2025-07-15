import { AppSidebar } from "@/modules/sidebar/app-sidebar";
import { SiteHeader } from "@/modules/sidebar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@webcampus/ui/components/sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
