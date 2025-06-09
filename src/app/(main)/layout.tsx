import { Header } from "@/components/layout/header";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { TonLogo } from "@/components/icons/ton-logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <Header />
      <div className="flex">
        <Sidebar collapsible="icon" variant="sidebar" className="border-r border-border/40">
          <SidebarHeader className="p-4 items-center hidden md:flex">
             {/* Can add logo or title here for collapsed view if needed */}
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
          <SidebarFooter className="p-4 mt-auto">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <Settings className="mr-2 h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">Settings</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 bg-background">
          <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
