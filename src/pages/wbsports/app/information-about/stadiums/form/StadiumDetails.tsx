import { FormTextEditor } from '@/components';
import { Label } from '@/components/ui/label';
import type { StadiumSchema } from '@/schemas/sports/information-about.schema';
import { useFormContext } from 'react-hook-form';

const StadiumDetails = () => {
  const {
    formState: { errors },
    ...form
  } = useFormContext<StadiumSchema>();

  return (
    <div className="mt-6 col-span-3 flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="boardType">Stadium Details</Label>
        <FormTextEditor
          control={form.control}
          name="details"
          placeholder="Enter stadium details"
          description={errors.details?.message}
        />
      </div>
    </div>
  );
};
export default StadiumDetails;
