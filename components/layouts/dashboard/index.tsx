import { MediumFooter } from '@/components/footer/medium-footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInputState } from '../../hooks';
import { HeaderSite } from '../../ui-setting/header-site';
import { useAuthContext } from '../../util/context-user';
import { HorizontalNavDashboard } from './horizontal-nav-dashboard';
import { VerticalNavDashboard } from './vertical-nav-dashboard';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export type NavbarProps = {
  title: string;
  href: string;
  count?: number;
  icon?: any;
};

const LayoutDashboard = ({ children, title }: IProps) => {
  const { user } = useAuthContext();
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };

  return (
    <>
      <HeaderSite title={title} />

      <div className="flex flex-col">
        <HorizontalNavDashboard showDrawer={showDrawer} />

        <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent
            side="left"
            className="dark:border-input dark:bg-background"
          >
            <div className="flex flex-col overflow-y-auto pt-5">
              <VerticalNavDashboard user={user} />
            </div>
          </SheetContent>
        </Sheet>

        <div
          className={`dark:bg-background min-h-screen flex-1 flex-col bg-gray-100`}
        >
          <main>{children}</main>
        </div>

        <MediumFooter />
      </div>
    </>
  );
};

export { LayoutDashboard };
