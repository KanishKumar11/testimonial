import { getBoards } from "@/actions/board";
import { SidebarItems } from "@/components/sidebar/sidebar-items";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const boards = await getBoards();
  const session = await auth();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  T
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Testimonial Platform
                  </span>
                  <span className="truncate text-xs">
                    Manage your testimonials
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarItems boards={boards} />
      </SidebarContent>
      <SidebarFooter>
        {session?.user && (
          <NavUser
            user={{
              name: session.user.name || "User",
              email: session.user.email || "",
              avatar: session.user.image || "",
            }}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
