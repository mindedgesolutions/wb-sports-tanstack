import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { AppRequired, FormFile, FormInput, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/query.client';
import { LuFileText } from 'react-icons/lu';
import { File } from 'lucide-react';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';
import {
  awardsSchema,
  type AwardsSchema,
} from '@/schemas/sports/achievements-awards.schema';
import {
  useCreateAwards,
  useUpdateAwards,
} from '@/api/sports/mutations/achievements-awards.mutation';
import type { AwardsProps } from '@/interfaces/sports/achievements-awards.interface';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<AwardsSchema>({
    defaultValues: {
      name: '',
      existingFile: '',
      newFile: undefined,
    },
    mode: 'all',
    resolver: zodResolver(awardsSchema),
  });
  const addAward = useCreateAwards();
  const updateAward = useUpdateAwards();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedAward'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: AwardsProps | undefined };

  const isLoading = selected ? addAward.isPending : updateAward.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedAward'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: AwardsSchema) => {
    const mutation = selected ? updateAward : addAward;
    const payload = selected
      ? { id: String(selected.id), data }
      : (data as AwardsSchema);
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Award ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof AwardsSchema, {
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
        name: selected.name,
        existingFile: selected.filePath || undefined,
        newFile: undefined,
      });
    } else {
      form.reset({
        name: '',
        existingFile: undefined,
        newFile: undefined,
      });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add'} award</CardTitle>
      </CardHeader>
      <form
        onSubmit={form.handleSubmit(handleSubmit, onError)}
        autoComplete="off"
      >
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Title <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder={`Enter name`}
                  description={errors.name?.message}
                  iconStart={<LuFileText />}
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
