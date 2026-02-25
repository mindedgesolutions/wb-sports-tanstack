import { queryClient } from '@/api/query.client';
import {
  useCreateWbsCouncilDesignation,
  useUpdateWbsCouncilDesignation,
} from '@/api/sports/mutations/wbs-council-sports.mutation';
import type { WbsCouncilSportsDesignationProps } from '@/interfaces/sports/wbs-council-sports.interface';
import {
  wbsCouncilDesgnationSchema,
  type WbsCouncilDesgnationSchema,
} from '@/schemas/sports/wbs-council-sports.schema';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppRequired, FormInput, FormSelect, SubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PiTreeStructureLight } from 'react-icons/pi';
import { spBoardTypes } from '@/constants';

const Form = () => {
  const {
    formState: { errors },
    ...form
  } = useForm<WbsCouncilDesgnationSchema>({
    defaultValues: { boardType: '', name: '' },
    mode: 'all',
    resolver: zodResolver(wbsCouncilDesgnationSchema),
  });
  const addDesignation = useCreateWbsCouncilDesignation();
  const updateDesignation = useUpdateWbsCouncilDesignation();

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedWbsCouncilDesignation'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: WbsCouncilSportsDesignationProps | undefined };

  const isLoading = selected
    ? updateDesignation.isPending
    : addDesignation.isPending;

  // -------------------------------

  const reset = () => {
    queryClient.removeQueries({ queryKey: ['selectedWbsCouncilDesignation'] });
    form.reset();
  };

  // -------------------------------

  const handleSubmit = async (data: WbsCouncilDesgnationSchema) => {
    const mutation = selected ? updateDesignation : addDesignation;
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        showSuccess(`Designation ${msg} successfully`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof WbsCouncilDesgnationSchema, {
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

  useEffect(() => {
    if (selected) {
      form.reset({
        boardType: selected.boardType,
        name: selected.name,
      });
    } else {
      form.reset({ boardType: '', name: '' });
    }
  }, [selected]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{selected ? 'Edit' : 'Add new'} designation</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <fieldset disabled={isLoading}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Board Type <AppRequired />
                </Label>
                <FormSelect
                  control={form.control}
                  name="boardType"
                  options={spBoardTypes}
                  description={errors.boardType?.message}
                  placeholder="Select board type"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">
                  Designation <AppRequired />
                </Label>
                <FormInput
                  register={form.register}
                  name="name"
                  placeholder="Enter designation"
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
