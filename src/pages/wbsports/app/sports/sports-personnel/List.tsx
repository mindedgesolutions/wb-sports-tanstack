import type { SportsPersonnelProps } from '@/interfaces/sports/sports.interface';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppContactInfo,
  AppDeleteModal,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo, showLess } from '@/utils/functions';
import { sports } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { queryClient } from '@/api/query.client';
import dayjs from 'dayjs';

type ListProps = {
  data: SportsPersonnelProps[];
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
            <TableHead>Sport</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>D.O.B</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Contact No.</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={8}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isFetching && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((data, index) => (
              <TableRow
                className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={data.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppTooltip
                    cropped={showLess(
                      data.sport.charAt(0).toUpperCase() +
                        data.sport.slice(1) || '',
                      20,
                    )}
                    text={
                      data.sport.charAt(0).toUpperCase() +
                        data.sport.slice(1) || ''
                    }
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip
                    cropped={showLess(data?.name || '', 20)}
                    text={data.name || ''}
                  />
                </TableCell>
                <TableCell>
                  {data.dob ? dayjs(data.dob).format('DD/MM/YYYY') : 'N/A'}
                </TableCell>
                <TableCell>
                  <AppTooltip
                    cropped={showLess(data.address || '', 20)}
                    text={data.address || ''}
                  />
                </TableCell>
                <TableCell>
                  {data.contactOne && (
                    <AppContactInfo
                      contact1={data.contactOne}
                      contact2={data.contactTwo || null}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.isActive}
                    api={sports.sportsPersonnel.toggle(Number(data.id))}
                    queryKey="sports-personnel"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedSportsPersonnel'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={sports.sportsPersonnel.delete(Number(data.id))}
                      queryKey="sports-personnel"
                      deleteQueryKey="selectedSportsPersonnel"
                      id={1}
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
