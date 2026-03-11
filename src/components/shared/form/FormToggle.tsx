import { useToggleStatus } from '@/tanstack/shared/toggle-status/useToggleStatus';
import { Switch } from '@/components/ui/switch';

const FormToggle = ({
  checked,
  api,
  queryKey,
}: {
  checked: boolean;
  api: string;
  queryKey: string;
}) => {
  const mutation = useToggleStatus(queryKey);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        onCheckedChange={(value) =>
          mutation.mutate({ url: api, checked: value })
        }
        disabled={mutation.isPending}
      />
    </div>
  );
};
export default FormToggle;
