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
import { Mail, Phone, Printer } from 'lucide-react';
import type { AssociationProps } from '@/interfaces/sports/information-about.interface';

type ListProps = {
  data: AssociationProps[];
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
            <TableHead>Address</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Contact Info</TableHead>
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
            data.map((assoc, index) => {
              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={assoc.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>{assoc.name}</TableCell>
                  <TableCell>
                    {assoc.address ? (
                      <AppTooltip text={assoc.address} cropLen={30} />
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>{assoc.website || 'N/A'}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {assoc.phoneOne && (
                        <section className="flex items-center gap-1.5">
                          <Phone className="size-3" />
                          <span>{assoc.phoneOne}</span>
                        </section>
                      )}
                      {assoc.phoneTwo && (
                        <section className="flex items-center gap-1.5">
                          <Phone className="size-3" />
                          <span>{assoc.phoneTwo}</span>
                        </section>
                      )}
                      {assoc.email && (
                        <section className="flex items-center gap-1.5">
                          <Mail className="size-3" />
                          <span>{assoc.email}</span>
                        </section>
                      )}
                      {assoc.fax && (
                        <section className="flex items-center gap-1.5">
                          <Printer className="size-3" />
                          <span>{assoc.fax}</span>
                        </section>
                      )}
                      {!assoc.phoneOne &&
                        !assoc.phoneTwo &&
                        !assoc.email &&
                        !assoc.fax && <span>N/A</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={assoc.isActive}
                      api={wbsCouncilSports.members.toggle(Number(assoc.id))}
                      queryKey="associations"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      {/* <Form assoc={assoc} /> */}
                      <AppDeleteModal
                        api={wbsCouncilSports.members.delete(Number(assoc.id))}
                        queryKey="associations"
                        deleteQueryKey="selectedAssociation"
                        id={assoc.id}
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
