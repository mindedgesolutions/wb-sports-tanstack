import {
  sportsEventsSchema,
  type SportsEventsSchema,
} from '@/schemas/sports/sports.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import {
  useAddSportsEvent,
  useUpdateSportsEvent,
} from '@/api/sports/mutations/sports.mutation';
import { useQuery } from '@tanstack/react-query';
import type { SportsEventProps } from '@/interfaces/sports/sports.interface';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';
import { queryClient } from '@/api/query.client';
import { useEffect } from 'react';
import { Label } from '@/components/ui/label';

const Form = () => {
  const {
    formState: { isSubmitSuccessful, errors },
    ...form
  } = useForm<SportsEventsSchema>({
    defaultValues: { title: '', startDate: undefined },
    mode: 'all',
    resolver: zodResolver(sportsEventsSchema),
  });
  const addEvent = useAddSportsEvent();
  const updateEvent = useUpdateSportsEvent();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedSportsEvent'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: SportsEventProps | undefined };

  const isLoading = selected ? updateEvent.isPending : addEvent.isPending;

  // -------------------------------

  const handleSubmit = (data: SportsEventsSchema) => {
    const mutation = selected ? updateEvent : addEvent;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as SportsEventsSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Sports event ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof SportsEventsSchema, {
                message: message as string,
              });
            },
          );
          return;
        }
        showError((error as any)?.response?.data?.message);
      },
    });
  };

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedSportsEvent'] });
    form.reset({
      title: '',
      startDate: undefined,
    });
  };

  // ------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        title: selected.title,
        startDate: selected.startDate
          ? new Date(selected.startDate)
          : undefined,
      });
    } else {
      form.reset({
        title: '',
        startDate: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} role</CardTitle>
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
                  placeholder="Enter title"
                  isSubmitSuccessful={isSubmitSuccessful}
                  description={errors.title?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Event date / Start date</Label>
                <FormDatepicker
                  control={form.control}
                  name="startDate"
                  allowFutureDates={false}
                  description={errors.startDate?.message}
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
