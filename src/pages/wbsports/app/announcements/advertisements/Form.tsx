import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import {
  AppRequired,
  FormDatepicker,
  FormFile,
  FormInput,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/tanstack/query.client';
import {
  advertisementSchema,
  type AdvertisementSchema,
} from '@/schemas/sports/announcements.schema';
import {
  useCreateAdvertisement,
  useUpdateAdvertisement,
} from '@/tanstack/sports/mutations/announcements.mutation';
import type { AdvertisementProps } from '@/interfaces/sports/announcements.interface';
import { LuFileText } from 'react-icons/lu';
import { File } from 'lucide-react';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AdvertisementSchema>({
    defaultValues: {
      title: '',
      description: '',
      adDate: undefined,
      newFile: undefined,
      existingFile: undefined,
    },
    mode: 'all',
    resolver: zodResolver(advertisementSchema),
  });
  const addAd = useCreateAdvertisement();
  const updateAd = useUpdateAdvertisement();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedAdvertisement'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: AdvertisementProps | undefined };

  const isLoading = selected ? addAd.isPending : updateAd.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedAdvertisement'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: AdvertisementSchema) => {
    const mutation = selected ? updateAd : addAd;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as AdvertisementSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Advertisement ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AdvertisementSchema, {
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

  // -------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        description: selected.description || '',
        adDate: selected.adDate || undefined,
        existingFile: selected.filePath || undefined,
        newFile: undefined,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        adDate: undefined,
        existingFile: undefined,
        newFile: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add'} Advertisement</CardTitle>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        autoComplete="off"
      >
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Title <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="title"
                  placeholder={`Enter title`}
                  description={errors.title?.message}
                  iconStart={<LuFileText />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder={`Enter description`}
                  description={errors.description?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adDate">Advertisement Date</Label>
                <FormDatepicker
                  control={form.control}
                  name="adDate"
                  allowFutureDates={true}
                  description={errors.adDate?.message}
                  id="adDate"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newFile">
                  Select a file <AppRequired />
                </Label>
                <FormFile
                  id="newFile"
                  control={form.control}
                  name="newFile"
                  iconEnd={<File />}
                  description={errors.newFile?.message}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" size={'sm'} variant="outline" onClick={reset}>
              Reset
            </Button>
            <SubmitBtn
              isSubmitting={isLoading}
              label={selected ? 'Update' : 'Add'}
              submitLabel="Submitting ..."
            />
          </CardFooter>
        </fieldset>
      </form>
    </Card>
  );
};
export default Form;
