import type { AchievementsProps } from '@/interfaces/sports/about-us.interface';
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
import { formatDate, serialNo, showLess } from '@/utils/functions';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { aboutUs } from '@/constants/sports';
import { queryClient } from '@/tanstack/query.client';

type ListProps = {
  data: AchievementsProps[];
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
            <TableHead>Ach. Date</TableHead>
            <TableHead>Active</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(isLoading || isFetching) && (
            <TableRow>
              <TableCell colSpan={6}>
                <AppSkeletonRow count={10} />
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isFetching && data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground uppercase tracking-wider"
              >
                No records found
              </TableCell>
            </TableRow>
          ) : (
            data.map((achievement, index) => (
              <TableRow
                className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={achievement.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <AppTooltip
                    cropped={showLess(achievement?.title || '', 40)}
                    text={achievement.title || ''}
                  />
                </TableCell>
                <TableCell>
                  <AppTooltip
                    cropped={showLess(achievement?.description || '', 40)}
                    text={achievement.description || ''}
                  />
                </TableCell>
                <TableCell>
                  {achievement.achievementDate
                    ? formatDate(achievement.achievementDate)
                    : ''}
                </TableCell>
                <TableCell>
                  <FormToggle
                    checked={achievement.isActive}
                    api={aboutUs.achievements.toggle(Number(achievement.id))}
                    queryKey="achievements"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedAchievement'],
                          achievement,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={aboutUs.achievements.delete(Number(achievement.id))}
                      queryKey="achievements"
                      deleteQueryKey="selectedAchievement"
                      id={achievement.id}
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
