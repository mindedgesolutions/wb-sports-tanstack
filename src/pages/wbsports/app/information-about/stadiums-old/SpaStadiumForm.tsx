import {
  AppBodyWrapper,
  AppRequired,
  AppTitleBreadcrumb,
  FormInput,
  FormTextarea,
  FormTextEditor,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Label } from '@/components/ui/label';
import { titles } from '@/constants';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { MdOutlineStadium } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import {
  stadiumSchema,
  type StadiumSchema,
} from '@/schemas/sports/information-about.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateStadium,
  useUpdateStadium,
} from '@/tanstack/sports/mutations/information-about.mutation';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { fileSizes } from '@/utils/format.validation';
import { PiUserCircleLight } from 'react-icons/pi';
import { Trash2 } from 'lucide-react';
import { FieldDescription } from '@/components/ui/field';
import FormUploadMultiple from '@/components/shared/form/FormUploadMultiple';

const SpaStadiumForm = () => {
  const { id } = useParams();
  const {
    formState: { errors },
    ...form
  } = useForm<StadiumSchema>({
    defaultValues: {
      name: '',
      location: '',
      address: '',
      details: '',
      existingImg: undefined,
      newImg: undefined,
      newGalleryImg: [],
      existingGalleryImg: [],
      highlights: [],
    },
    mode: 'all',
    resolver: zodResolver(stadiumSchema),
  });
  const [resetKey, setResetKey] = useState(0);
  const addStadium = useCreateStadium();
  const updateStadium = useUpdateStadium();
  const [files, setFiles] = useState<any[]>([]);
  const isLoading = id ? updateStadium.isPending : addStadium.isPending;

  // ----------------------------

  const handleSubmit = async (data: StadiumSchema) => {
    const mutation = id ? updateStadium : addStadium;
    const payload = id ? { id: String(id), data } : (data as StadiumSchema);
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        showSuccess(`Stadium ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof StadiumSchema, {
                message: message as string,
              });
            },
          );
          return;
        }
        showError('Something went wrong. Please try again.');
      },
    });
  };

  const onError = (errors: any) => {
    console.log('FORM ERRORS', errors);
  };

  // ----------------------------

  const reset = () => {
    setFiles([]);
    setResetKey((k) => k + 1);
    form.reset();
  };

  // ----------------------------

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
        <form
          className="grid grid-cols-4 gap-4 p-2"
          onSubmit={form.handleSubmit(handleSubmit, onError)}
        >
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
                  description={errors.name?.message}
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
                  description={errors.location?.message}
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
                  description={errors.address?.message}
                />
              </div>
            </div>
            <div className="mt-2 col-span-3 flex flex-col gap-6">
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
            <div className="col-span-3 mt-2">
              <FormUploadMultiple
                onChange={handleImages}
                resetTrigger={resetKey}
              />
            </div>
            <div className="col-span-3">
              <div className="grid gap-2">
                <Label htmlFor="boardType">Add highlights / key points</Label>
                <FormTextarea
                  register={form.register}
                  name="address"
                  placeholder="Enter address"
                  description={errors.address?.message}
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
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

            <SubmitBtn
              isSubmitting={isLoading}
              label="Save changes"
              className="w-full"
            />
            <Button
              type="button"
              size={'sm'}
              variant="outline"
              className="w-full"
            >
              Preview
            </Button>
            <Button
              type="button"
              size={'sm'}
              variant="outline"
              className="w-full"
              onClick={reset}
            >
              Reset
            </Button>
          </div>
        </form>
      </AppBodyWrapper>
    </>
  );
};
export default SpaStadiumForm;
