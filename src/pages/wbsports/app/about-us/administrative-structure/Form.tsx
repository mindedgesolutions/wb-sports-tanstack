import { queryClient } from '@/api/query.client';
import {
  useCreateAdminStructure,
  useUpdateAdminStructure,
} from '@/api/sports/mutations/about-us.mutation';
import { AppRequired, FormInput, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import type { AdminStructureProps } from '@/interfaces/sports/about-us.interface';
import {
  adminStructureSchema,
  type AdminStructureSchema,
} from '@/schemas/sports/about-us.schema';
import { showSuccess } from '@/utils/show.success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { PiTreeStructureLight } from 'react-icons/pi';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AdminStructureSchema>({
    defaultValues: { name: '' },
    mode: 'all',
    resolver: zodResolver(adminStructureSchema),
  });
  const createAdminStructure = useCreateAdminStructure();
  const updateAdminStructure = useUpdateAdminStructure();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedAdminStructure'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: AdminStructureProps | undefined };

  const isLoading = selected
    ? updateAdminStructure.isPending
    : createAdminStructure.isPending;

  // -------------------------------

  const handleSubmit = (data: AdminStructureSchema) => {
    const mutation = selected ? updateAdminStructure : createAdminStructure;

    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'Updated' : 'Added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`${msg} successfully`);
      },
      onError: (error) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AdminStructureSchema, {
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
      form.reset({ name: selected.name });
    } else {
      form.reset({ name: '' });
    }
  }, [selected]);

  // -------------------------------

  const reset = () => {
    form.reset({ name: '' });
    queryClient.removeQueries({ queryKey: ['selectedAdminStructure'] });
  };

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
                  Role <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter role name"
                  description={errors.name?.message}
                  iconStart={<PiTreeStructureLight />}
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
