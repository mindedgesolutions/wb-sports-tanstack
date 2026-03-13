import { AppRequired, FormUploadSingle } from '@/components';
import { Button } from '@/components/ui/button';
import { FieldDescription } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { titles } from '@/constants';
import { type StadiumSchema } from '@/schemas/sports/information-about.schema';
import { fileSizes } from '@/utils/format.validation';
import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { PiUserCircleLight } from 'react-icons/pi';

const CoverPhoto = ({
  files,
  setFiles,
}: {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const {
    formState: { errors },
    ...form
  } = useFormContext<StadiumSchema>();

  return (
    <>
      <Label htmlFor="boardType">
        Select a cover image <AppRequired />
      </Label>
      <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
        {form.getValues('existingImg') && files.length === 0 && (
          <img
            src={`${titles.IMAGE_URL}${form.getValues('existingImg')}`}
            alt="Existing"
            className="w-full max-h-28 object-cover"
          />
        )}
        {files.length > 0 && files[0].file.size <= fileSizes().max2mb && (
          <img
            src={URL.createObjectURL(files[0].file)}
            alt=""
            className="w-full max-h-28 object-cover"
          />
        )}
        {!form.getValues('existingImg') && files.length === 0 && (
          <PiUserCircleLight className="w-full h-full text-muted" />
        )}
        <FormUploadSingle
          setFiles={setFiles}
          files={files}
          setFormImg={(file: File) => form.setValue('newImg', file)}
        />
        <Button
          size={'icon-xs'}
          type="button"
          variant={'ghost'}
          className="absolute -right-7 bottom-0"
          onClick={() => setFiles([])}
        >
          <Trash2 className="size-4 text-destructive" />
        </Button>
      </div>
      <FieldDescription className="-mt-3">
        {errors.newImg?.message}
      </FieldDescription>
    </>
  );
};
export default CoverPhoto;
