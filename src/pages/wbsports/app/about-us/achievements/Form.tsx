import { queryClient } from '@/api/query.client';
import {
  useCreateAchievement,
  useUpdateAchievement,
} from '@/api/sports/mutations/about-us.mutation';
import {
  AppRequired,
  FormDatepicker,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { AchievementsProps } from '@/interfaces/sports/about-us.interface';
import {
  achievementSchema,
  type AchievementSchema,
} from '@/schemas/sports/about-us.schema';
import { showSuccess } from '@/utils/show.success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AchievementSchema>({
    defaultValues: {
      title: '',
      description: '',
      achievementDate: undefined,
    },
    mode: 'all',
    resolver: zodResolver(achievementSchema),
  });
  const createAchievement = useCreateAchievement();
  const updateAchievementMutation = useUpdateAchievement();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedAchievement'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: AchievementsProps | undefined };

  const isLoading = selected
    ? updateAchievementMutation.isPending
    : createAchievement.isPending;

  // -------------------------------

  const handleSubmit = (data: AchievementSchema) => {
    const mutation = selected ? updateAchievementMutation : createAchievement;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Achievement ${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AchievementSchema, {
                message: message as string,
              });
            },
          );
        }
      },
    });
  };

  // -------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        description: selected.description || undefined,
        achievementDate: selected.achievementDate
          ? new Date(selected.achievementDate)
          : undefined,
      });
    } else {
      form.reset({ title: '', description: '', achievementDate: undefined });
    }
  }, [selected]);

  // -------------------------------

  const reset = () => {
    form.reset({ title: '', description: '', achievementDate: undefined });
    queryClient.removeQueries({ queryKey: ['selectedAchievement'] });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} achievement</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  Title <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="title"
                  placeholder="Enter achievement title"
                  description={errors.title?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder="Enter achievement description"
                  description={errors.description?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventDate">Event date</Label>
                <FormDatepicker
                  control={form.control}
                  name="achievementDate"
                  description={errors.achievementDate?.message}
                  allowFutureDates={false}
                />
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
