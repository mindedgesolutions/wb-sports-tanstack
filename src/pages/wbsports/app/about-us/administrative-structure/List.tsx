import type { AdminStructureProps } from '@/interfaces/sports/about-us.interface';
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
import { serialNo, showLess } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { aboutUs } from '@/constants/sports';
import { queryClient } from '@/api/query.client';

type ListProps = {
  data: AdminStructureProps[];
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
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={4}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isFetching && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
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
                    cropped={showLess(data?.name || '', 40)}
                    text={data.name || ''}
                  />
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={data.isActive}
                    api={aboutUs.adminStructure.toggle(Number(data.id))}
                    queryKey="admin-structure"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedAdminStructure'],
                          data,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={aboutUs.adminStructure.delete(Number(data.id))}
                      queryKey="admin-structure"
                      deleteQueryKey="selectedAdminStructure"
                      id={data.id}
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
