import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Form from './Form';
import List from './List';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAchievements } from '@/api/sports/queries/about-us.query';
import { useLocation } from 'react-router-dom';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';

const SpaAchievements = () => {
  document.title = `Achievements | ${titles.APP_TITLE_SPORTS}`;

  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 1000);

  const [page, setPage] = useState(1);
  const query = useLocation();
  const queryString = new URLSearchParams(query.search);
  const currentPage = queryString.get('page') || 1;
  const { data, isLoading, isError, error, isFetching } = useAchievements({
    page: Number(currentPage) || page,
    search: debounced,
  });

  if (isError) console.log(error);

  const meta = data?.meta;

  return (
    <>
      <AppTitleWrapper title="Achievements" />
      <AppBodyWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <AppFilterWrapper>
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
            <div className="">
              <List
                data={data?.data ?? []}
                meta={meta}
                isLoading={isLoading}
                isFetching={isFetching}
                page={page}
                onPageChange={setPage}
              />
            </div>
          </div>
          <div className="">
            <Form />
          </div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaAchievements;
