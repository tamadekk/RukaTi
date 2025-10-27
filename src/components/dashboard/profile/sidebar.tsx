import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { sideBarItems } from "@/const/navigation-links";
import { signOut } from "@/lib/authentication";

const handleSignOut = async () => {
  const error = await signOut();
  if (error) {
    console.error("Error signing out:", error);
  } else {
    console.log("Signed out successfully");
    window.location.href = "/login";
  }
};

const SideBarElements = () => (
  <>
    {sideBarItems.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <a href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))}
  </>
);
const SideBar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SideBarElements />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleSignOut}>Logout</Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
