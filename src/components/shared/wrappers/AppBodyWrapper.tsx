import { cn } from '@/lib/utils';

const AppBodyWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn(className)}>{children}</div>;
};
export default AppBodyWrapper;
