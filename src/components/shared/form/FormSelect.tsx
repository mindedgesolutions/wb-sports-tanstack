import { FieldDescription } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type Control,
  type FieldValues,
  type Path,
  Controller,
} from 'react-hook-form';

export type SelectOption = {
  value: string;
  label: string;
};

export interface RHFSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  description?: string;
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder,
  onValueChange,
  description,
}: RHFSelectProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder ?? 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{placeholder ?? 'Select an option'}</SelectLabel>
                {options.length > 0 ? (
                  options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem key="0" value="0">
                    No options available
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
};
export default FormSelect;
