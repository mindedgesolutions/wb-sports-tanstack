import { useDeleteEntity } from '@/api/shared/delete/useDeleteEntity';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { FaRegTrashCan } from 'react-icons/fa6';

const AppDeleteModal = ({
  api,
  queryKey,
  id,
  deleteQueryKey,
}: {
  api: string;
  queryKey: string;
  id: number;
  deleteQueryKey: string;
}) => {
  const deleteEntity = useDeleteEntity(queryKey, deleteQueryKey);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={'icon-xs'}>
          <FaRegTrashCan className="size-4 text-destructive cursor-pointer" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will be permanently deleted from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteEntity.mutate({ url: api, id })}
            disabled={deleteEntity.isPending}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AppDeleteModal;
