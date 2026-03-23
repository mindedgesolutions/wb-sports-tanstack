import { NavMain } from '@/components/sports/app/sidebar/nav-main';
import { NavUser } from '@/components/sports/app/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sports/app/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { sportsAppMenu } from '@/constants/sports/app.menu.sports';
import { NavSettings } from '@/components/sports/app/sidebar/nav-settings';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = sportsAppMenu().navMain;
  const settings = sportsAppMenu().settings;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSettings settings={settings} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
