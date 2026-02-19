import { images, titles } from '@/constants';
import { GiSoccerBall } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FormInput, FormPassword, SubmitBtn } from '@/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { authSchema, type AuthSchema } from '@/schemas/auth/auth.schema';

const SpaSignin = () => {
  document.title = `Admin Sign In | ${titles.APP_TITLE_SPORTS}`;
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<AuthSchema>({
    defaultValues: { username: '', password: '' },
    mode: 'all',
    resolver: zodResolver(authSchema),
  });

  // ------------------------

  const handleSubmit = async (data: AuthSchema) => {
    console.log(data);
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
                      Login to your account
                    </h1>
                    <p className="text-muted-foreground text-xs text-balance">
                      Enter your email below to login to your account
                    </p>
                  </div>
                  <Field className="max-w-sm">
                    <FieldLabel htmlFor="username">Email</FieldLabel>
                    <FormInput
                      id="username"
                      name="username"
                      register={form.register}
                      placeholder="Enter your email address"
                      description={errors.username?.message}
                      iconStart={<MdOutlineAlternateEmail />}
                    />
                  </Field>
                  <Field className="max-w-sm">
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      {!isSubmitting && (
                        <Link
                          to={`${titles.BASE_LINK_SPORTS}/forgot-password`}
                          tabIndex={-1}
                          className="ml-auto text-xs underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      )}
                    </div>
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
                  <Field>
                    <SubmitBtn
                      label="Sign in"
                      isSubmitting={isSubmitting}
                      submitLabel="Signing in ..."
                    />
                    {!isSubmitting && (
                      <FieldDescription className="text-center text-primary mt-2">
                        Don't have an account?{' '}
                        <Link to={`${titles.BASE_LINK_SPORTS}/signup`}>
                          Sign up
                        </Link>
                      </FieldDescription>
                    )}
                  </Field>
                </FieldGroup>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={images.loginBgSports}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default SpaSignin;
