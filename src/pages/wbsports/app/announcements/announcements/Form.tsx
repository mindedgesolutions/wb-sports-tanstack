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
  FormRadio,
  FormSelect,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { spAnnouncementTypes } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/query.client';
import {
  announcementSchema,
  type AnnouncementSchema,
} from '@/schemas/sports/announcements.schema';
import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from '@/api/sports/mutations/announcements.mutation';
import type { AnnouncementProps } from '@/interfaces/sports/announcements.interface';
import { LuFileText } from 'react-icons/lu';
import { File } from 'lucide-react';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';

const isNewOptions = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' },
];

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AnnouncementSchema>({
    defaultValues: {
      annType: '',
      annNo: '',
      subject: '',
      isNew: 'true',
      startDate: undefined,
      endDate: undefined,
      existingFile: '',
      newFile: undefined,
    },
    mode: 'all',
    resolver: zodResolver(announcementSchema),
  });
  const addNews = useCreateAnnouncement();
  const updateNews = useUpdateAnnouncement();
  const type = form.watch('annType');
  const label =
    spAnnouncementTypes.find((item) => item.value === type)?.label ||
    'announcement';

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedAnnouncement'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: AnnouncementProps | undefined };

  const isLoading = selected ? addNews.isPending : updateNews.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedAnnouncement'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: AnnouncementSchema) => {
    const mutation = selected ? updateNews : addNews;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as AnnouncementSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Announcement ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AnnouncementSchema, {
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
        annType: selected.type,
        annNo: selected.annNo,
        subject: selected.subject,
        isNew: selected.isNew === true ? 'true' : 'false',
        startDate: selected.startDate || undefined,
        endDate: selected.endDate || undefined,
        existingFile: selected.filePath || undefined,
        newFile: undefined,
      });
    } else {
      form.reset({
        annType: '',
        annNo: '',
        subject: '',
        isNew: 'true',
        startDate: undefined,
        endDate: undefined,
        existingFile: undefined,
        newFile: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {selected ? 'Edit' : 'Add'}{' '}
          {form.getValues('annType') || 'announcement'}
        </CardTitle>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        autoComplete="off"
      >
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="annType">
                  Announcement Type <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="annType"
                  options={spAnnouncementTypes.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  )}
                  placeholder="Select announcement type"
                  description={errors.annType?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="annNo">
                  {label.toUpperCase()} No. <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="annNo"
                  placeholder={`Enter ${label.toLowerCase()} number`}
                  description={errors.annNo?.message}
                  iconStart={<LuFileText />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">
                  Subject <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="subject"
                  placeholder={`Enter ${label.toLowerCase()} details`}
                  description={errors.subject?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rank">Is new {label.toLowerCase()}?</Label>
                <FormRadio
                  control={form.control}
                  name="isNew"
                  options={isNewOptions}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <FormDatepicker
                  control={form.control}
                  name="startDate"
                  allowFutureDates={true}
                  description={errors.startDate?.message}
                  id="startDate"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <FormDatepicker
                  control={form.control}
                  name="endDate"
                  allowFutureDates={true}
                  description={errors.endDate?.message}
                  id="endDate"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="designation">
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
