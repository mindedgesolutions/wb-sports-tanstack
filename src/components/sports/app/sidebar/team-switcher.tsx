import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { titles } from '@/constants';
import { GiSoccerBall } from 'react-icons/gi';
import AppTooltip from '@/components/shared/AppTooltip';
import { showLess } from '@/utils/functions';

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link to={`${titles.BASE_LINK_SPORTS}/dashboard`}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GiSoccerBall className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight gap-0.5">
                  <AppTooltip
                    text={titles.APP_TITLE_SPORTS}
                    cropped={showLess(titles.APP_TITLE_SPORTS, 20)}
                  />
                  <span className="truncate text-xs text-muted-foreground">
                    Sports Wing
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
