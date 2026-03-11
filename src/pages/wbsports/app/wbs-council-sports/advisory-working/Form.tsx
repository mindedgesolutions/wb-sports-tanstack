import { queryClient } from '@/tanstack/query.client';
import {
  useAddWbsCouncilMember,
  useUpdateWbsCouncilMember,
} from '@/tanstack/sports/mutations/wbs-council-sports.mutation';
import type {
  WbsCouncilMemberProps,
  WbsCouncilSportsDesignationProps,
} from '@/interfaces/sports/wbs-council-sports.interface';
import {
  wbsCouncilMemberSchema,
  type WbsCouncilMemberSchema,
} from '@/schemas/sports/wbs-council-sports.schema';
import { showError } from '@/utils/show.error';
import { showSuccess } from '@/utils/show.success';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AppRequired,
  FormInput,
  FormSelect,
  FormTextarea,
  FormUploadSingle,
  SubmitBtn,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Printer, Trash2, User } from 'lucide-react';
import { SlBadge } from 'react-icons/sl';
import { spBoardTypes, titles } from '@/constants';
import { fileSizes } from '@/utils/format.validation';
import { PiUserCircleLight } from 'react-icons/pi';
import { useWbsCouncilDesignationsAll } from '@/tanstack/sports/queries/wbs-council-sports.query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HiOutlinePencilAlt } from 'react-icons/hi';

const Form = ({ member }: { member?: WbsCouncilMemberProps }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    if (!member) reset();
    setOpen((v) => !v);
  };
  const {
    formState: { errors, isSubmitSuccessful },
    ...form
  } = useForm<WbsCouncilMemberSchema>({
    defaultValues: {
      boardType: '',
      designationId: '',
      name: '',
      designationLabel: '',
      address: '',
      phone: '',
      email: '',
      fax: '',
      newImg: undefined,
      existingImg: '',
    },
    mode: 'all',
    resolver: zodResolver(wbsCouncilMemberSchema),
  });
  const [files, setFiles] = useState<any[]>([]);
  const addMember = useAddWbsCouncilMember();
  const updateMember = useUpdateWbsCouncilMember();

  // -------------------------------

  const selectedBoardType = form.watch('boardType');
  const {
    data: designations,
  }: { data: WbsCouncilSportsDesignationProps[] | undefined } =
    useWbsCouncilDesignationsAll();

  const filteredDesignations = useMemo(() => {
    return designations?.filter((d) => d.boardType === selectedBoardType) ?? [];
  }, [designations, selectedBoardType]);

  const formattedDesignations = useMemo(() => {
    return filteredDesignations.map((v) => ({
      value: String(v.id),
      label: v.name,
    }));
  }, [filteredDesignations]);

  // -------------------------------

  const { data: selected } = useQuery({
    queryKey: ['selectedWbsCouncilMember'],
    queryFn: () => null,
    staleTime: Infinity,
  }) as { data: WbsCouncilMemberProps | undefined };

  const isLoading = selected ? updateMember.isPending : addMember.isPending;

  // -------------------------------

  const reset = () => {
    setFiles([]);
    queryClient.removeQueries({ queryKey: ['selectedWbsCouncilMember'] });
    form.reset();
  };

  // -------------------------------

  useEffect(() => {
    if (selected) {
      form.reset({
        boardType: selected.boardType,
        name: selected.name,
        designationLabel: selected.designationLabel || '',
        address: selected.address || '',
        phone: selected.phone || '',
        email: selected.email || '',
        fax: selected.fax || '',
        existingImg: selected.img || undefined,
        newImg: undefined,
      });
    } else {
      form.reset({
        boardType: '',
        designationId: '',
        name: '',
        designationLabel: '',
        address: '',
        phone: '',
        email: '',
        fax: '',
        existingImg: undefined,
        newImg: undefined,
      });
    }
  }, [selected]);

  useEffect(() => {
    selected && form.setValue('designationId', String(selected.designationId));
  }, [selected, filteredDesignations]);

  // -------------------------------

  const handleSubmit = async (data: WbsCouncilMemberSchema) => {
    const mutation = selected ? updateMember : addMember;
    console.log(data);
    const payload = selected ? { id: selected.id, data } : data;
    const msg = selected ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        reset();
        openModal();
        showSuccess(`Member ${msg} successfully`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              form.setError(key as keyof WbsCouncilMemberSchema, {
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

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {member ? (
          <Button
            type="button"
            variant="ghost"
            size={'icon-xs'}
            onClick={() => {
              queryClient.setQueryData(['selectedWbsCouncilMember'], member);
            }}
          >
            <HiOutlinePencilAlt className="size-4 text-chart-4" />
          </Button>
        ) : (
          <Button
            type="button"
            size={'sm'}
            className="cs-btn-primary"
            onClick={openModal}
          >
            Add member
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{selected ? 'Edit' : 'Add'} member details</DialogTitle>
          <DialogDescription>
            Click the Save button at the bottom
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          autoComplete="off"
          className="w-full mt-4"
        >
          <fieldset disabled={isLoading}>
            <div>
              <ScrollArea className="sm:max-w-xl max-h-[calc(100vh-250px)] overflow-y-scroll">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="boardType">
                      Select Board <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      options={spBoardTypes}
                      name="boardType"
                      placeholder="Select board type"
                      description={errors.boardType?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designationId">
                      Select Designation <AppRequired />
                    </Label>
                    <FormSelect
                      control={form.control}
                      options={formattedDesignations}
                      name="designationId"
                      placeholder="Select designation"
                      description={errors.designationId?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">
                      Name <AppRequired />
                    </Label>
                    <FormInput
                      register={form.register}
                      name="name"
                      placeholder="Enter name"
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
                      maxLen={255}
                      isSubmitSuccessful={isSubmitSuccessful}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designationLabel">Position</Label>
                    <FormInput
                      register={form.register}
                      name="designationLabel"
                      placeholder="Enter designation label"
                      description={errors.designationLabel?.message}
                      iconStart={<SlBadge />}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <FormInput
                      register={form.register}
                      name="phone"
                      placeholder="Enter phone number"
                      description={errors.phone?.message}
                      iconStart={<Phone />}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <FormInput
                      register={form.register}
                      name="email"
                      placeholder="Enter email number"
                      description={errors.email?.message}
                      iconStart={<Mail />}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="fax">FAX</Label>
                    <FormInput
                      register={form.register}
                      name="fax"
                      placeholder="Enter FAX number"
                      description={errors.fax?.message}
                      iconStart={<Printer />}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="designation">Upload an image</Label>
                    <div className="p-1 border border-muted-foreground/30 border-dashed w-32 h-32 relative">
                      {form.getValues('existingImg') && files.length === 0 && (
                        <img
                          src={`${titles.IMAGE_URL}${form.getValues('existingImg')}`}
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
                      {!form.getValues('existingImg') && files.length === 0 && (
                        <PiUserCircleLight className="w-full h-full text-muted" />
                      )}
                      <FormUploadSingle
                        setFiles={setFiles}
                        files={files}
                        setFormImg={(file: File) =>
                          form.setValue('newImg', file)
                        }
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
              </ScrollArea>
            </div>
            <div className="flex justify-between items-center pt-8">
              <Button
                type="reset"
                size={'sm'}
                variant="outline"
                onClick={reset}
              >
                Reset
              </Button>
              <SubmitBtn
                isSubmitting={isLoading}
                label={selected ? 'Update' : 'Add'}
                submitLabel="Submitting ..."
              />
            </div>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default Form;
