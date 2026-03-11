import {
  AppBodyWrapper,
  AppRequired,
  AppTitleBreadcrumb,
  FormInput,
  FormTextarea,
} from '@/components';
import { Label } from '@/components/ui/label';
import { titles } from '@/constants';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { MdOutlineStadium } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';

const SpaStadiumForm = () => {
  const { id } = useParams();
  console.log(id);
  const {
    formState: { errors },
    ...form
  } = useForm({});

  return (
    <>
      <div className="flex justify-between items-center bg-muted mb-3">
        <div className="text-xs font-medium text-card-foreground tracking-wider uppercase p-2">
          <AppTitleBreadcrumb
            currentPage="Stadium"
            homeLabel="Stadiums"
            homeLink={`${titles.BASE_LINK_SPORTS}/stadiums`}
          />
        </div>
      </div>
      <AppBodyWrapper>
        <div className="grid grid-cols-3 gap-4 p-2">
          <div className="col-span-1">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="boardType">
                  Stadium Name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="boardType"
                  placeholder="Enter name of stadium"
                  description={``}
                  iconStart={<MdOutlineStadium />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="boardType">
                  Stadium Location <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="boardType"
                  placeholder="Enter location"
                  description={``}
                  iconStart={<IoLocationOutline />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="boardType">Address</Label>
                <FormTextarea
                  register={form.register}
                  name="boardType"
                  placeholder="Enter address"
                  description={``}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1"></div>
        </div>
      </AppBodyWrapper>
    </>
  );
};
export default SpaStadiumForm;
