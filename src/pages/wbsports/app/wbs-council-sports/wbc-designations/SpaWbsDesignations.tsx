import {
  useWbsCouncilDesignations,
  useWbsCouncilDesignationsAll,
} from '@/api/sports/queries/wbs-council-sports.query';
import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppSortListAll,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { spBoardTypes, titles } from '@/constants';
import { wbsCouncilSports } from '@/constants/sports';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import List from './List';
import Form from './Form';
import type { WbsCouncilSportsDesignationProps } from '@/interfaces/sports/wbs-council-sports.interface';
import { useResetPaginationOnSearch } from '@/hooks/use-reset-pagination-on-search';

const SpaWbsDesignations = () => {
  document.title = `WBS Council Designations | ${titles.APP_TITLE_SPORTS}`;
  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 500);
  useResetPaginationOnSearch(search);

  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || page;
  const { data, isFetching, isLoading, isError, error } =
    useWbsCouncilDesignations({
      page: Number(currentPage) || page,
      search: debounced,
    });
  const {
    data: allData,
    isError: isErrorAll,
    error: errorAll,
  } = useWbsCouncilDesignationsAll();

  if (isError) console.log(error);
  if (isErrorAll) console.log(errorAll);

  const sortData = allData?.map((item: WbsCouncilSportsDesignationProps) => ({
    id: item.id,
    primary: item.name,
    secondary: spBoardTypes.find((v) => v.value === item.boardType)?.label,
  }));

  const meta = data?.meta;

  return (
    <>
      <AppTitleWrapper title="WBS Council Designations" />
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
                queryKey="wbs-council-designations"
                api={wbsCouncilSports.designations.listSort}
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
export default SpaWbsDesignations;
