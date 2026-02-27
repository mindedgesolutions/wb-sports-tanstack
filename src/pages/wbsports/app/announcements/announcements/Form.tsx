import { useEffect, useState } from 'react';
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
  FormInput,
  FormSelect,
  FormTextarea,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';
import { fileSizes } from '@/utils/format.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { spAnnouncementTypes, titles } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/query.client';
import { PiUserCircleLight } from 'react-icons/pi';
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

const Form = () => {
  const {
    formState: { isSubmitted, errors },
    ...form
  } = useForm<AnnouncementSchema>({
    defaultValues: {
      annType: '',
      annNo: '',
      subject: '',
      isNew: true,
      startDate: undefined,
      endDate: undefined,
      existingFile: undefined,
      newFile: undefined,
    },
    mode: 'all',
    resolver: zodResolver(announcementSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
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
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['selectedAnnouncement'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: AnnouncementSchema) => {};

  // -------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        annType: selected.type,
        annNo: selected.annNo,
        subject: selected.subject,
        isNew: selected.isNew,
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
        isNew: true,
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
        <CardTitle>{selected ? 'Edit' : 'Add new'} key personnel</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
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
                {/* <FormInput
                  register={form.register}
                  name="rank"
                  placeholder="Enter rank"
                  description={errors.rank?.message}
                  iconStart={<PiTreeStructureLight />}
                /> */}
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
                <Label htmlFor="designation">Upload an image</Label>
                <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                  {form.getValues('existingFile') && files.length === 0 && (
                    <img
                      src={`${titles.IMAGE_URL}${form.getValues('existingFile')}`}
                      alt="Existing"
                      className="w-full max-h-28 object-cover"
                    />
                  )}
                  {files.length > 0 &&
                    files[0].file.size <= fileSizes().max2mb && (
                      <img
                        src={URL.createObjectURL(files[0].file)}
                        alt=""
                        className="w-full max-h-28 object-cover"
                      />
                    )}
                  {!form.getValues('existingFile') && files.length === 0 && (
                    <PiUserCircleLight className="w-full h-full text-muted" />
                  )}
                  <FormUploadSingle
                    setFiles={setFiles}
                    files={files}
                    setFormImg={(file: File) => form.setValue('newFile', file)}
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="reset" size={'sm'} variant="outline" onClick={reset}>
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
