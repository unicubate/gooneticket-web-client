import { MediumFooter } from '@/components/footer/medium-footer';
import { HeaderSite } from '@/components/ui-setting';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInputState } from '../../hooks';
import { HorizontalNavSite } from './horizontal-nav-site';
import { VerticalNavSite } from './vertical-nav-site';

interface IProps {
  title: string;
  metas?: React.ReactNode;
  children: React.ReactNode;
}

export type NavbarSiteProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const LayoutSite = ({ children, title, metas }: IProps) => {
  const { isOpen, setIsOpen, user } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  return (
    <>
      <HeaderSite
        title={title}
        metas={
          <meta
            name="description"
            key="description"
            content={`Tickets for concerts, musicals, shows, sports and culture`}
          />
        }
      />

      {/* <div className="min-h-screen space-y-5"> */}
      <HorizontalNavSite showDrawer={showDrawer} user={user} />

      {/* Fix Drawer */}
      <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent className="dark:border-input dark:bg-background">
          <div className="flex flex-col overflow-y-auto pt-5">
            <VerticalNavSite />
          </div>
        </SheetContent>
      </Sheet>
      {/*End Fix Drawer */}

      <div className={`dark:bg-background flex min-h-screen flex-1 flex-col`}>
        <main>{children}</main>
      </div>

      <MediumFooter />
      {/* </div> */}
    </>
  );
};

export { LayoutSite };
