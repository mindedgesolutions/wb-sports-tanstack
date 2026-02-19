import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

type RHFFormInputProps<T extends FieldValues> = {
  id?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  placeholder?: string;
  description?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  maxLen?: number;
};

const FormTextarea = <T extends FieldValues>({
  id,
  name,
  register,
  placeholder,
  description,
  maxLen = 500,
}: RHFFormInputProps<T>) => {
  return (
    <>
      <FieldGroup className="max-w-sm">
        <Field>
          <InputGroup>
            <InputGroupTextarea
              id={id ?? name}
              placeholder={placeholder}
              {...register(name)}
            />
            <InputGroupAddon align="block-end">
              <InputGroupText className="text-[10px]">
                0/{maxLen}
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
      </FieldGroup>
    </>
  );
};
export default FormTextarea;
