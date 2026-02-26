import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { FieldDescription } from '@/components/ui/field';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { cn } from '@/lib/utils';

type RHFFormInputProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  description?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
};

const FormInput = <T extends FieldValues>({
  id,
  name,
  register,
  type,
  placeholder,
  description,
  iconStart,
  iconEnd,
  className,
}: RHFFormInputProps<T>) => {
  return (
    <>
      <InputGroup className={cn(className)}>
        <InputGroupInput
          id={id ?? name}
          placeholder={placeholder}
          {...register(name)}
          type={type ?? 'text'}
          autoComplete="off"
        />
        {iconStart && (
          <InputGroupAddon align="inline-start">{iconStart}</InputGroupAddon>
        )}
        {iconEnd && (
          <InputGroupAddon align="inline-end" className="text-xs">
            {iconEnd}
          </InputGroupAddon>
        )}
      </InputGroup>
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
};
export default FormInput;
