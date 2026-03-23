import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/sports/app/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppPageWrapper, SpcFooter, SpcTopnav } from '@/components';

const SpaLayout = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SpcTopnav />
          <AppPageWrapper>
            <Outlet />
          </AppPageWrapper>
          <SpcFooter />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
export default SpaLayout;
