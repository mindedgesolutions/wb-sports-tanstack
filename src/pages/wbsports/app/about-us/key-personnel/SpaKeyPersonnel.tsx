import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppSortListAll,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import List from './List';
import Form from './Form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import {
  useKeyPersonnel,
  useKeyPersonnelAll,
} from '@/api/sports/queries/about-us.query';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { aboutUs } from '@/constants/sports';
import type { KeyPersonnelProps } from '@/interfaces/sports/about-us.interface';
import { useResetPaginationOnSearch } from '@/hooks/use-reset-pagination-on-search';

const SpaKeyPersonnel = () => {
  document.title = `Key Personnel | ${titles.APP_TITLE_SPORTS}`;
  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;
  const { data, isFetching, isLoading, isError, error } = useKeyPersonnel({
    page: Number(currentPage) || page,
    search: debounced,
  });
  const {
    data: allData,
    isError: isErrorAll,
    error: errorAll,
  } = useKeyPersonnelAll();

  if (isError) console.log(error);
  if (isErrorAll) console.log(errorAll);

  const sortData = allData?.map((item: KeyPersonnelProps) => ({
    id: item.id,
    primary: item.name,
    secondary: item.designation,
    img: item.img,
  }));

  const meta = data?.meta;

  return (
    <>
      <AppTitleWrapper title="Key Personnel" />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <AppFilterWrapper className="mb-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-2">
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {meta?.total || 0} records found
                  </span>
                </div>
                <div className="col-span-1">
                  <FormInput
                    name="search"
                    iconStart={<HiOutlineMagnifyingGlass />}
                    iconEnd={`${meta?.total || 0} records`}
                    register={form.register}
                    placeholder="Search by anything ..."
                  />
                </div>
              </div>
            </AppFilterWrapper>
            <div className="mb-3">
              <AppSortListAll
                data={sortData ?? []}
                queryKey="key-personnel"
                api={aboutUs.keyPersonnel.listSort}
              />
            </div>
            <List
              data={data?.data ?? []}
              meta={meta}
              isLoading={isLoading}
              isFetching={isFetching}
              page={currentPage}
              onPageChange={setPage}
            />
          </div>
          <div className="">
            <Form />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaKeyPersonnel;
