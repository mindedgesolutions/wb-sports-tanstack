import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppDefaultUser,
  AppDeleteModal,
  AppPaginationContainer,
  AppSkeletonRow,
  AppTooltip,
  FormToggle,
} from '@/components';
import { serialNo } from '@/utils/functions';
import { wbsCouncilSports } from '@/constants/sports';
import type { WbsCouncilMemberProps } from '@/interfaces/sports/wbs-council-sports.interface';
import { spBoardTypes, titles } from '@/constants';
import { Mail, Phone, Printer } from 'lucide-react';
import Form from './Form';

type ListProps = {
  data: WbsCouncilMemberProps[];
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
            <TableHead>Position</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
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
            data.map((member, index) => {
              return (
                <TableRow
                  className="text-muted-foreground grayscale-100 hover:grayscale-0 transition-all group"
                  key={member.id}
                >
                  <TableCell>{serialNo({ page, index })}.</TableCell>
                  <TableCell>
                    <section className="flex flex-col justify-center items-start gap-1">
                      <span className="font-medium tracking-wider uppercase">
                        {member.cDesignation.name}
                      </span>
                      <span className="font-light italic">
                        {
                          spBoardTypes.find((v) => v.value === member.boardType)
                            ?.label
                        }
                      </span>
                    </section>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <section>
                        {member.img ? (
                          <img
                            src={`${titles.IMAGE_URL}${member.img}`}
                            alt={member.name}
                            className="max-w-12 max-h-12 object-cover"
                          />
                        ) : (
                          <AppDefaultUser />
                        )}
                      </section>
                      <section className="flex flex-col justify-center items-start gap-1">
                        <span className="font-medium tracking-wider uppercase">
                          <AppTooltip text={member.name} cropLen={30} />
                        </span>
                        <span className="font-light italic">
                          <AppTooltip
                            text={member.designationLabel || ''}
                            cropLen={30}
                          />
                        </span>
                      </section>
                    </div>
                  </TableCell>
                  <TableCell>
                    <AppTooltip text={member.address || 'N/A'} cropLen={40} />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {member.phone && (
                        <section className="flex items-center gap-1.5">
                          <Phone className="size-3" />
                          <span>{member.phone}</span>
                        </section>
                      )}
                      {member.email && (
                        <section className="flex items-center gap-1.5">
                          <Mail className="size-3" />
                          <span>{member.email}</span>
                        </section>
                      )}
                      {member.fax && (
                        <section className="flex items-center gap-1.5">
                          <Printer className="size-3" />
                          <span>{member.fax}</span>
                        </section>
                      )}
                      {!member.phone && !member.email && !member.fax && (
                        <span>N/A</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormToggle
                      checked={member.isActive}
                      api={wbsCouncilSports.members.toggle(Number(member.id))}
                      queryKey="wbs-council-members"
                    />
                  </TableCell>
                  <TableCell>
                    <span className="flex gap-6">
                      <Form member={member} />
                      <AppDeleteModal
                        api={wbsCouncilSports.members.delete(Number(member.id))}
                        queryKey="wbs-council-members"
                        deleteQueryKey="selectedWbsCouncilMember"
                        id={member.id}
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
