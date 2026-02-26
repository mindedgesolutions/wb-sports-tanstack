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
import { wbsCouncilSports } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { queryClient } from '@/api/query.client';
import type { WbsCouncilSportsDesignationProps } from '@/interfaces/sports/wbs-council-sports.interface';
import { spBoardTypes } from '@/constants';

type ListProps = {
  data: WbsCouncilSportsDesignationProps[];
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
            <TableHead>Board Type</TableHead>
            <TableHead>Designation</TableHead>
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
            data.map((designation, index) => (
              <TableRow
                className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                key={designation.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {
                      spBoardTypes.find(
                        (v) => v.value === designation.boardType,
                      )?.label
                    }
                  </div>
                </TableCell>
                <TableCell>
                  <AppTooltip text={designation.name} />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={designation.isActive}
                    api={wbsCouncilSports.designations.toggle(
                      Number(designation.id),
                    )}
                    queryKey="wbs-council-designations"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedWbsCouncilDesignation'],
                          designation,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={wbsCouncilSports.designations.delete(
                        Number(designation.id),
                      )}
                      queryKey="wbs-council-designations"
                      deleteQueryKey="selectedWbsCouncilDesignation"
                      id={designation.id}
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
