import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { FieldDescription } from '@/components/ui/field';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type RHFFormInputProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  description?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
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
}: RHFFormInputProps<T>) => {
  return (
    <>
      <InputGroup>
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
