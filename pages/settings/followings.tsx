import { PrivateComponent } from '@/components/util/private-component';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { Skeleton } from 'antd';
import { useInView } from 'react-intersection-observer';
import { GetInfiniteFollowingsAPI } from '@/api-site/follow';
import ListFollowings from '../../components/setting/list-followings';
import { useEffect } from 'react';
import { GetStaticPropsContext } from 'next';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { useInputState } from '@/components/hooks/use-input-state';
import { LoadingFile } from '@/components/ui-setting/ant';

const Followings = () => {
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingFollowings,
    isError: isErrorFollowings,
    data: dataFollowings,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteFollowingsAPI({
    take: 10,
    sort: 'DESC',
    search,
  });

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableFollowings = isLoadingFollowings ? (
    <LoadingFile />
  ) : isErrorFollowings ? (
    <strong>Error find data please try again...</strong>
  ) : dataFollowings?.pages[0]?.data?.total <= 0 ? (
    ''
  ) : (
    dataFollowings?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListFollowings item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Followings'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
            <HorizontalNavSetting />

            <div className="flow-root">
              <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">Followings</div>
                    <div className="mt-4 sm:mt-0">
                      <SearchInput
                        placeholder="Search by first name, last name, email"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableFollowings}
                  </div>
                </div>

                {hasNextPage && (
                  <div className=" mx-auto mt-4 justify-center text-center">
                    <ButtonLoadMore
                      ref={ref}
                      isFetchingNextPage={isFetchingNextPage}
                      onClick={() => fetchNextPage()}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Followings);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}
