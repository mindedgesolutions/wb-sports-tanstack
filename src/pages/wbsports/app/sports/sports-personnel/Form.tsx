import { queryClient } from '@/tanstack/query.client';
import {
  useAddSportsPersonnel,
  useUpdateSportsPersonnel,
} from '@/tanstack/sports/mutations/sports.mutation';
import {
  AppRequired,
  FormDatepicker,
  FormInput,
  FormSelect,
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
import { sportsCategories } from '@/constants';
import type { SportsPersonnelProps } from '@/interfaces/sports/sports.interface';
import {
  sportsPersonnelSchema,
  type SportsPersonnelSchema,
} from '@/schemas/sports/sports.schema';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Phone, User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<SportsPersonnelSchema>({
    defaultValues: {
      sport: '',
      name: '',
      address: '',
      dob: undefined,
      contactOne: '',
      contactTwo: '',
    },
    mode: 'all',
    resolver: zodResolver(sportsPersonnelSchema),
  });
  const addSportsPersonnel = useAddSportsPersonnel();
  const updateSportsPersonnel = useUpdateSportsPersonnel();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedSportsPersonnel'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: SportsPersonnelProps | undefined };

  const isLoading = selected
    ? updateSportsPersonnel.isPending
    : addSportsPersonnel.isPending;

  // -------------------------------

  const handleSubmit = (data: SportsPersonnelSchema) => {
    const mutation = selected ? updateSportsPersonnel : addSportsPersonnel;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as SportsPersonnelSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Sports personnel ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof SportsPersonnelSchema, {
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

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedSportsPersonnel'] });
    form.reset({
      sport: '',
      name: '',
      address: '',
      dob: undefined,
      contactOne: '',
      contactTwo: '',
    });
  };

  // ------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        sport: selected.sport,
        name: selected.name,
        address: selected.address ?? '',
        dob: selected.dob ? new Date(selected.dob) : undefined,
        contactOne: selected.contactOne ?? '',
        contactTwo: selected.contactTwo ?? '',
      });
    } else {
      form.reset({
        sport: '',
        name: '',
        address: '',
        dob: undefined,
        contactOne: '',
        contactTwo: '',
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
                <Label htmlFor="name">
                  Select a sport <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="sport"
                  options={sportsCategories.sort((a, b) =>
                    a.label.localeCompare(b.label),
                  )}
                  description={errors.sport?.message}
                  placeholder="Select a sport"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Name <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter person's name"
                  description={errors.name?.message}
                  iconStart={<User />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <FormTextarea
                  register={form.register}
                  name="address"
                  placeholder="Enter address"
                  description={errors.address?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <FormDatepicker
                  control={form.control}
                  name="dob"
                  allowFutureDates={false}
                  description={errors.dob?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactOne">Contact no. 1</Label>
                <FormInput
                  register={form.register}
                  name="contactOne"
                  placeholder="Enter contact number"
                  description={errors.contactOne?.message}
                  iconStart={<Phone />}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactTwo">Contact no. 2</Label>
                <FormInput
                  register={form.register}
                  name="contactTwo"
                  placeholder="Enter contact number"
                  description={errors.contactTwo?.message}
                  iconStart={<Phone />}
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
