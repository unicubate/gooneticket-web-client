import { UserModel } from '@/types/user';
import { useAuth } from '../../util/context-user';
import { HorizontalNavUserPublicSite } from './horizontal-nav-user-public-site';

import { HeaderSite } from '@/components/ui-setting';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInputState } from '../../hooks';
import { VerticalNavUserPublicSite } from './vertical-nav-user-public-site';
interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

const LayoutUserPublicSite = ({ children, title, user }: IProps) => {
  const { theme } = useAuth() as any;
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  // const user = useAuth() as any;

  return (
    <>
      <HeaderSite
        title={title}
        metas={
          <meta
            name="description"
            content={`Tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
          />
        }
      />

      {/* <div className="flex flex-col"> */}
      {user?.id ? (
        <HorizontalNavUserPublicSite showDrawer={showDrawer} user={user} />
      ) : null}

      {/* Fix Drawer */}
      <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent className="dark:border-gray-800 dark:bg-[#1c1b22]">
          <div className="flex flex-col overflow-y-auto pt-5">
            <VerticalNavUserPublicSite user={user} />
          </div>
        </SheetContent>
      </Sheet>
      {/*End Fix Drawer */}

      <div className="flex flex-1 dark:bg-black/15">
        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
        >
          <main>{children}</main>
        </div>
      </div>

      {/* <main>{children}</main> */}

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };
