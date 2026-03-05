import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { FieldDescription } from '@/components/ui/field';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

export interface RHFFileProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  id?: string;
  iconEnd?: React.ReactNode;
  className?: string;
  description?: string;
}

const FormFile = <T extends FieldValues>({
  name,
  control,
  id,
  description,
  iconEnd,
  className,
}: RHFFileProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputGroup className={cn(className)}>
            <InputGroupInput
              id={id ?? name}
              type={'file'}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);
              }}
            />
            {iconEnd && (
              <InputGroupAddon align="inline-end" className="text-xs">
                {iconEnd}
              </InputGroupAddon>
            )}
          </InputGroup>
        )}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
};
export default FormFile;
