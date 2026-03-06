import type { AnnouncementProps } from '@/interfaces/sports/announcements.interface';
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
import { announcements } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { queryClient } from '@/api/query.client';

type ListProps = {
  data: AnnouncementProps[];
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
            <TableHead>Annc. Type</TableHead>
            <TableHead>Annc. No.</TableHead>
            <TableHead>Subject</TableHead>
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
            data.map((ann, index) => {
              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={ann.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>{ann.type.toUpperCase()}</TableCell>
                  <TableCell>
                    <AppTooltip text={ann.annNo} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={ann.subject} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    <AppDownloadIcon
                      api={announcements.announcements.download(ann.filePath)}
                      fileName={ann.fileName}
                    />
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={ann.isActive}
                      api={announcements.announcements.toggle(Number(ann.id))}
                      queryKey="announcements"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['selectedAnnouncement'],
                            ann,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-chart-4" />
                      </Button>
                      <AppDeleteModal
                        api={announcements.announcements.delete(Number(ann.id))}
                        queryKey="announcements"
                        deleteQueryKey="selectedAnnouncement"
                        id={ann.id}
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
