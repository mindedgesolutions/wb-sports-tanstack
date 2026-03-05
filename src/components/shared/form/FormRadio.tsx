import { FieldDescription } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

export type RadioOption = {
  value: string;
  label: string;
};

export interface RHFRadioProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: RadioOption[];
  disabled?: boolean;
  description?: string;
}

const FormRadio = <T extends FieldValues>({
  name,
  control,
  options,
  description,
}: RHFRadioProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            className="w-full flex gap-4"
            onValueChange={field.onChange}
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center gap-3">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
    </>
  );
};
export default FormRadio;
