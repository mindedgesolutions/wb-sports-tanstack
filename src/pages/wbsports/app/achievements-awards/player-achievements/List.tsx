import type { PlayerAchievementsProps } from '@/interfaces/sports/achievements-awards.interface';
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
import dayjs from 'dayjs';
import { achievementsAwards } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { queryClient } from '@/api/query.client';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { spAchievementTypes } from '@/constants';

type ListProps = {
  data: PlayerAchievementsProps[];
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
            <TableHead>Achievement</TableHead>
            <TableHead>Ach. Date</TableHead>
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
            data.map((ach, index) => {
              const sportLabel = spAchievementTypes.find(
                (data) => data.value === ach.sport,
              )?.label;

              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={ach.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <AppTooltip text={sportLabel || 'N/A'} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={ach.name || '---'} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={ach.description || '---'} cropLen={20} />
                  </TableCell>
                  <TableCell>
                    {ach.achievementDate
                      ? dayjs(ach.achievementDate).format('DD/MM/YYYY')
                      : '---'}
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={ach.isActive}
                      api={achievementsAwards.playerAchievements.toggle(
                        Number(ach.id),
                      )}
                      queryKey="player-achievements"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Button
                        variant="ghost"
                        size={'icon-xs'}
                        onClick={() => {
                          queryClient.setQueryData(
                            ['selectedPlayerAchievement'],
                            ach,
                          );
                        }}
                      >
                        <HiOutlinePencilAlt className="size-4 text-chart-4" />
                      </Button>
                      <AppDeleteModal
                        api={achievementsAwards.playerAchievements.delete(
                          Number(ach.id),
                        )}
                        queryKey="player-achievements"
                        deleteQueryKey="selectedPlayerAchievement"
                        id={ach.id}
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
