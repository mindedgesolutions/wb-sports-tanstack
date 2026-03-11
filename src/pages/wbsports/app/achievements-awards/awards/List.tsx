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
import { achievementsAwards } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { queryClient } from '@/tanstack/query.client';
import type { AwardsProps } from '@/interfaces/sports/achievements-awards.interface';

type ListProps = {
  data: AwardsProps[];
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
            <TableHead>Attch.</TableHead>
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
            data.map((awd, index) => {
              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={awd.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={awd.name} cropLen={30} />
                  </TableCell>
                  <TableCell>
                    <AppDownloadIcon
                      api={achievementsAwards.awards.download(awd.filePath)}
                      fileName={awd.fileName}
                    />
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={awd.isActive}
                      api={achievementsAwards.awards.toggle(Number(awd.id))}
                      queryKey="awards"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(['selectedAward'], awd);
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-chart-4" />
                      </Button>
                      <AppDeleteModal
                        api={achievementsAwards.awards.delete(Number(awd.id))}
                        queryKey="awards"
                        deleteQueryKey="selectedAward"
                        id={awd.id}
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
