import { UserModel } from '@/types/user.type';
import Head from 'next/head';
import { useAuth } from '../util/context-user';
import { HorizontalNavUserPublicSite } from './horizontal-nav-user-public-site';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInputState } from '../hooks';
import { VerticalNavUserPublicSite } from './vertical-nav-user-public-site';
interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

const LayoutUserPublicSite: React.FC<IProps> = ({ children, title, user }) => {
  const { theme } = useAuth() as any;
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  // const user = useAuth() as any;

  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
      </Head>

      <div className="flex flex-col">
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

        <main>
          <div className="mx-auto mb-10 lg:flex">
            <div
              className={`flex flex-1 flex-col bg-gray-100 dark:bg-[#232325]`}
            >
              {children}
            </div>
          </div>
        </main>
        {/* </div> */}
      </div>
    </>
  );
};

export { LayoutUserPublicSite };
