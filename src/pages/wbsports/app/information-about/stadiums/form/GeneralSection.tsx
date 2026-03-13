import { AppRequired, FormInput, FormTextarea } from '@/components';
import { Label } from '@/components/ui/label';
import type { StadiumSchema } from '@/schemas/sports/information-about.schema';
import { useFormContext } from 'react-hook-form';
import { IoLocationOutline } from 'react-icons/io5';
import { MdOutlineStadium } from 'react-icons/md';

const GeneralSection = () => {
  const {
    formState: { errors },
    ...form
  } = useFormContext<StadiumSchema>();

  return (
    <div className="col-span-3 grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="boardType">
            Stadium Name <AppRequired />
          </Label>
          <FormInput
            register={form.register}
            name="name"
            placeholder="Enter name of stadium"
            description={errors.name?.message as string}
            iconStart={<MdOutlineStadium />}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="boardType">
            Stadium Location <AppRequired />
          </Label>
          <FormInput
            register={form.register}
            name="location"
            placeholder="Enter location"
            description={errors.location?.message as string}
            iconStart={<IoLocationOutline />}
          />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="boardType">Address</Label>
          <FormTextarea
            register={form.register}
            name="address"
            placeholder="Enter address"
            description={errors.address?.message as string}
          />
        </div>
      </div>
    </div>
  );
};
export default GeneralSection;
