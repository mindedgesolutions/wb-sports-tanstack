import FormUploadMultiple from '@/components/shared/form/FormUploadMultiple';
import type { StadiumSchema } from '@/schemas/sports/information-about.schema';
import { useFormContext } from 'react-hook-form';

const StadiumGallery = ({ resetKey }: { resetKey: number }) => {
  const { ...form } = useFormContext<StadiumSchema>();

  const handleImages = ({
    newFiles,
    existing,
  }: {
    newFiles: File[];
    existing: string[];
  }) => {
    form.setValue('newGalleryImg', newFiles);
    form.setValue('existingGalleryImg', existing);
  };

  return (
    <div className="col-span-3 mt-2">
      <FormUploadMultiple onChange={handleImages} resetTrigger={resetKey} />
    </div>
  );
};
export default StadiumGallery;
