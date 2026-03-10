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
  FormInput,
  FormSelect,
  FormTextarea,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/query.client';
import { User } from 'lucide-react';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';
import {
  playerAchievementsSchema,
  type PlayerAchievementSchema,
} from '@/schemas/sports/achievements-awards.schema';
import {
  useCreatePlayerAchievements,
  useUpdatePlayerAchievements,
} from '@/api/sports/mutations/achievements-awards.mutation';
import type { PlayerAchievementsProps } from '@/interfaces/sports/achievements-awards.interface';
import { spAchievementTypes } from '@/constants';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<PlayerAchievementSchema>({
    defaultValues: {
      sport: '',
      name: '',
      description: '',
      achievementDate: undefined,
    },
    mode: 'all',
    resolver: zodResolver(playerAchievementsSchema),
  });
  const addAch = useCreatePlayerAchievements();
  const updateAch = useUpdatePlayerAchievements();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedPlayerAchievement'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: PlayerAchievementsProps | undefined };

  const isLoading = selected ? addAch.isPending : updateAch.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedPlayerAchievement'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: PlayerAchievementSchema) => {
    const mutation = selected ? updateAch : addAch;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as PlayerAchievementSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Achievement ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof PlayerAchievementSchema, {
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
        sport: selected.sport,
        name: selected.name,
        description: selected.description || '',
        achievementDate: selected.achievementDate || undefined,
      });
    } else {
      form.reset({
        sport: '',
        name: '',
        description: '',
        achievementDate: undefined,
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
                  Select a sport <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="sport"
                  options={spAchievementTypes.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  )}
                  description={errors.sport?.message}
                  placeholder="Select a sport"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Player's name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder={`Enter player's name`}
                  description={errors.name?.message}
                  iconStart={<User />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">
                  Achievement <AppRequired />
                </Label>
                <FormTextarea
                  register={form.register}
                  name="description"
                  placeholder={`Enter achievement`}
                  description={errors.description?.message}
                  maxLen={500}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="adDate">Achievement Date</Label>
                <FormDatepicker
                  control={form.control}
                  name="achievementDate"
                  allowFutureDates={true}
                  description={errors.achievementDate?.message}
                  id="achievementDate"
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
