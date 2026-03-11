import { departments, images, titles } from '@/constants';
import { GiSoccerBall } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FormInput, FormPassword, FormSelect, SubmitBtn } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  registerSchema,
  type RegisterSchema,
} from '@/schemas/auth/auth.schema';
import { FiUser } from 'react-icons/fi';
import { FaMobileAlt } from 'react-icons/fa';
import { customFetch } from '@/tanstack/custom.fetch';
import { showSuccess } from '@/utils/show.success';
import { showError } from '@/utils/show.error';

const SpaRegister = () => {
  document.title = `Admin Sign Up | ${titles.APP_TITLE_SPORTS}`;
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<RegisterSchema>({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      department: '',
    },
    mode: 'all',
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  // ------------------------

  const handleSubmit = async (data: RegisterSchema) => {
    try {
      const response = await customFetch.post('/auth/register', data);

      if (response.status === 201) {
        showSuccess('Registration successful! Please sign in.');
        navigate(`${titles.BASE_LINK_SPORTS}/signin`);
      }
    } catch (error) {
      if ((error as any).response.data.error) {
        Object.entries((error as any).response.data.error).forEach(
          ([key, message]) => {
            form.setError(key as keyof RegisterSchema, {
              message: message as string,
            });
          },
        );
        return;
      }
      showError((error as any).response.data.message);
      return;
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-md">
              <GiSoccerBall className="size-8" />
            </div>
            <span className="uppercase font-semibold tracking-wider text-xl">
              {titles.APP_TITLE_SPORTS}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <fieldset disabled={isSubmitting}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-base font-semibold">
                      Register for an account
                    </h1>
                  </div>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <FormInput
                      id="name"
                      name="name"
                      register={form.register}
                      placeholder="Enter your name"
                      description={errors.name?.message}
                      iconStart={<FiUser />}
                    />
                  </Field>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <FormInput
                      id="email"
                      name="email"
                      register={form.register}
                      placeholder="Enter your email"
                      description={errors.email?.message}
                      iconStart={<MdOutlineAlternateEmail />}
                    />
                  </Field>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="mobile">Mobile no.</FieldLabel>
                    <FormInput
                      id="mobile"
                      name="mobile"
                      register={form.register}
                      placeholder="Enter your mobile number"
                      description={errors.mobile?.message}
                      iconStart={<FaMobileAlt />}
                    />
                  </Field>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <FormPassword
                      id="password"
                      name="password"
                      register={form.register}
                      type="password"
                      placeholder={`*`.repeat(8)}
                      description={errors.password?.message}
                      iconStart={<RiLockPasswordLine />}
                    />
                  </Field>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="department">
                      Select department
                    </FieldLabel>
                    <FormSelect
                      control={form.control}
                      name="department"
                      options={departments}
                      description={errors.department?.message}
                      disabled={isSubmitting}
                      placeholder="Select your department"
                    />
                  </Field>
                  <Field>
                    <SubmitBtn
                      label="Sign up"
                      isSubmitting={isSubmitting}
                      submitLabel="Processing ..."
                    />
                    <FieldDescription className="text-center text-primary mt-2">
                      Already have an account?{' '}
                      <Link to={`${titles.BASE_LINK_SPORTS}/signin`}>
                        Sign in
                      </Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={images.registerBgSports}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default SpaRegister;
