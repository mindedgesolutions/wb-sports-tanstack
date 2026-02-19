import type { KeyPersonnelProps } from '@/interfaces/sports/about-us.interface';
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
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { aboutUs } from '@/constants/sports';
import { Button } from '@/components/ui/button';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { titles } from '@/constants';
import { queryClient } from '@/api/query.client';

type ListProps = {
  data: KeyPersonnelProps[];
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
            <TableHead>Name</TableHead>
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
            data.map((person, index) => (
              <TableRow
                className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all"
                key={person.id}
              >
                <TableCell>{serialNo({ page, index })}.</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <section>
                      <img
                        src={`${titles.IMAGE_URL}${person.img}`}
                        alt={person.name}
                        className="max-w-12 max-h-12 object-cover"
                      />
                    </section>
                    <section className="flex flex-col justify-center items-start gap-1">
                      <span className="font-medium tracking-wider uppercase">
                        {person.name}
                      </span>
                      <span>{person.rank || 'N/A'}</span>
                    </section>
                  </div>
                </TableCell>
                <TableCell>{person.designation}</TableCell>
                <TableCell>
                  <FormToggle
                    checked={person.isActive}
                    api={aboutUs.keyPersonnel.toggle(Number(person.id))}
                    queryKey="key-personnel"
                  />
                </TableCell>
                <TableCell>
                  <span className="flex gap-6">
                    <Button
                      variant="ghost"
                      size={'icon-xs'}
                      onClick={() => {
                        queryClient.setQueryData(
                          ['selectedKeyPersonnel'],
                          person,
                        );
                      }}
                    >
                      <HiOutlinePencilAlt className="size-4 text-chart-4" />
                    </Button>
                    <AppDeleteModal
                      api={aboutUs.keyPersonnel.delete(Number(person.id))}
                      queryKey="key-personnel"
                      deleteQueryKey="selectedKeyPersonnel"
                      id={person.id}
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
