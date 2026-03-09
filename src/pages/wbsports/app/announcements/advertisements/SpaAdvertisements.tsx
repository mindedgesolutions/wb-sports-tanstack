import { useAdvertisements } from '@/api/sports/queries/announcements.query';
import {
  AppBodyWrapper,
  AppFilterWrapper,
  AppTitleWrapper,
  FormInput,
} from '@/components';
import { titles } from '@/constants';
import { useDebounce, type QuickFilterSchema } from '@/utils/functions';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import List from './List';
import Form from './Form';

const SpaAdvertisements = () => {
  document.title = `Advertisements | ${titles.APP_TITLE_SPORTS}`;
  const { ...form } = useForm<QuickFilterSchema>({
    defaultValues: { search: '' },
  });
  const search = form.watch('search');
  const debounced = useDebounce(search, 1000);

  const [page, setPage] = useState(1);
  const query = useLocation();
  const queryString = new URLSearchParams(query.search);
  const currentPage = queryString.get('page') || 1;
  const { data, isFetching, isLoading, isError, error } = useAdvertisements({
    page: Number(currentPage) || page,
    search: debounced,
  });

  if (isError) console.log(error);
  const meta = data?.meta;

  return (
    <>
      <AppTitleWrapper title="Advertisements" />
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
export default SpaAdvertisements;
