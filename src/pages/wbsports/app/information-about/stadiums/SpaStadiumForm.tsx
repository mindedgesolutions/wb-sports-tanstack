import {
  AppBodyWrapper,
  AppFormSectionHeader,
  AppTitleBreadcrumb,
  SubmitBtn,
} from '@/components';
import { titles } from '@/constants';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  stadiumSchema,
  type StadiumSchema,
} from '@/schemas/sports/information-about.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateStadium,
  useUpdateStadium,
} from '@/tanstack/sports/mutations/information-about.mutation';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';
import GeneralSection from './form/GeneralSection';
import StadiumDetails from './form/StadiumDetails';
import StadiumGallery from './form/StadiumGallery';
import Highlights from './form/Highlights';
import { Button } from '@/components/ui/button';
import CoverPhoto from './form/CoverPhoto';
import { useState } from 'react';

const SpaStadiumForm = () => {
  const { id } = useParams();
  const methods = useForm<StadiumSchema>({
    defaultValues: {
      name: '',
      location: '',
      address: '',
      details: '',
      existingImg: undefined,
      newImg: undefined,
      newGalleryImg: [],
      existingGalleryImg: [],
      highlights: [],
    },
    mode: 'all',
    resolver: zodResolver(stadiumSchema),
  });
  const addStadium = useCreateStadium();
  const updateStadium = useUpdateStadium();
  const isLoading = id ? updateStadium.isPending : addStadium.isPending;

  // ------------------------------

  const [resetKey, setResetKey] = useState(0);
  const [files, setFiles] = useState<any[]>([]);

  // -----------------------------

  const handleSubmit = async (data: StadiumSchema) => {
    const mutation = id ? updateStadium : addStadium;
    const payload = id ? { id: String(id), data } : (data as StadiumSchema);
    const msg = id ? 'updated' : 'added';

    mutation.mutate(payload as any, {
      onSuccess: () => {
        // reset();
        showSuccess(`Stadium ${msg} successfully!`);
      },
      onError: (error: any) => {
        if ((error as any)?.response?.data?.error) {
          Object.entries((error as any)?.response?.data?.error).forEach(
            ([key, message]) => {
              methods.setError(key as keyof StadiumSchema, {
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

  // -----------------------------

  const reset = () => {
    setResetKey((k) => k + 1);
    setFiles([]);
    methods.reset();
  };

  return (
    <>
      <div className="flex justify-between items-center bg-muted mb-3">
        <div className="text-xs font-medium text-card-foreground tracking-wider uppercase p-2">
          <AppTitleBreadcrumb
            currentPage="Stadium"
            homeLabel="Stadiums"
            homeLink={`${titles.BASE_LINK_SPORTS}/stadiums`}
          />
        </div>
      </div>
      <AppBodyWrapper>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit, onError)}>
            <fieldset className="grid grid-cols-4 gap-4 p-2">
              <div className="col-span-3">
                <GeneralSection />
                <StadiumDetails />
                <AppFormSectionHeader title="Add stadium images" />
                <StadiumGallery resetKey={resetKey} />
                <AppFormSectionHeader title="Add stadium highlights" />
                <Highlights />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <CoverPhoto files={files} setFiles={setFiles} />
                <SubmitBtn
                  isSubmitting={isLoading}
                  label="Save changes"
                  className="w-full"
                />
                <Button
                  type="button"
                  size={'sm'}
                  variant="outline"
                  className="w-full"
                >
                  Preview
                </Button>
                <Button
                  type="button"
                  size={'sm'}
                  variant="outline"
                  className="w-full"
                  onClick={reset}
                >
                  Reset
                </Button>
              </div>
            </fieldset>
          </form>
        </FormProvider>
      </AppBodyWrapper>
    </>
  );
};
export default SpaStadiumForm;
