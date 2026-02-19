import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

type SubmitBtnProps = {
  label: string;
  submitLabel?: string;
  isSubmitting: boolean;
  className?: string;
};

const SubmitBtn = ({
  label = 'Submit',
  submitLabel,
  isSubmitting,
  className,
}: SubmitBtnProps) => {
  return (
    <Button
      type="submit"
      size="sm"
      disabled={isSubmitting}
      className={cn('bg-primary', className)}
    >
      {isSubmitting && <Spinner />}
      {isSubmitting ? submitLabel : label}
    </Button>
  );
};
export default SubmitBtn;
