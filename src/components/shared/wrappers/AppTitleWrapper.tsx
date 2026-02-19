import { cn } from '@/lib/utils';

const AppTitleWrapper = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-between items-center bg-muted mb-3">
      <div className={cn('text-xs tracking-wider uppercase p-2', className)}>
        {title}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
export default AppTitleWrapper;
