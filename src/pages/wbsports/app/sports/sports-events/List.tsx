import type { SportsEventProps } from '@/interfaces/sports/sports.interface';
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
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { sports } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { queryClient } from '@/api/query.client';
import dayjs from 'dayjs';

type ListProps = {
  data: SportsEventProps[];
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
            <TableHead>Event Date</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={5}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isFetching && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((event, index) => (
              <TableRow
                className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                key={event.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppTooltip text={event.title} cropLen={40} />
                </TableCell>
                <TableCell>
                  {dayjs(event.startDate).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={event.isActive}
                    api={sports.events.toggle(Number(event.id))}
                    queryKey="sports-events"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedSportsEvent'],
                          event,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={sports.events.delete(Number(event.id))}
                      queryKey="sports-events"
                      deleteQueryKey="selectedSportsEvent"
                      id={event.id}
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <AppPaginationContainer meta={meta} onPageChange={onPageChange} />
    </div>
  );
};
export default List;
