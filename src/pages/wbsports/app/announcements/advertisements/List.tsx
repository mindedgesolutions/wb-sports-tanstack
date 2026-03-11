import type { AdvertisementProps } from '@/interfaces/sports/announcements.interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppDeleteModal,
  AppDownloadIcon,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import dayjs from 'dayjs';
import { announcements } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/tanstack/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';

type ListProps = {
  data: AdvertisementProps[];
  meta: PaginationProps;
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  onPageChange: (page: number) => void;
};

const List = ({
  data,
  meta,
  isLoading,
  isFetching,
  page,
  onPageChange,
}: ListProps) => {
  return (
    <div>
      <Table className="text-[11px]">
        <TableHeader>
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Ad Date</TableHead>
            <TableHead>Attch.</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={7}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isFetching && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((ad, index) => {
              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={ad.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={ad.title} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={ad.description || '---'} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    {ad.adDate ? dayjs(ad.adDate).format('DD/MM/YYYY') : '---'}
                  </TableCell>
                  <TableCell>
                    {ad.fileName && (
                      <AppDownloadIcon
                        api={announcements.advertisements.download(ad.filePath)}
                        fileName={ad.fileName}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={ad.isActive}
                      api={announcements.advertisements.toggle(Number(ad.id))}
                      queryKey="advertisements"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['selectedAdvertisement'],
                            ad,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-chart-4" />
                      </Button>
                      <AppDeleteModal
                        api={announcements.advertisements.delete(Number(ad.id))}
                        queryKey="advertisements"
                        deleteQueryKey="selectedAdvertisement"
                        id={ad.id}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <AppPaginationContainer meta={meta} onPageChange={onPageChange} />
    </div>
  );
};
export default List;
