import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import SubmitBtn from './form/SubmitBtn';
import { useSortList } from '@/api/shared/sort-list/useSortList';

function SortableItem({ id, title }: { id: number; title: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="text-muted-foreground text-xs bg-muted hover:bg-muted-foreground/15 rounded my-3 p-2 cursor-grab"
    >
      {title}
    </div>
  );
}

const AppSortList = ({
  data,
  queryKey,
  api,
}: {
  data: any;
  queryKey: string;
  api: string;
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen((op) => !op);
  const { mutate, isPending } = useSortList(queryKey);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = items.map((item: any, index: number) => ({
      id: item.id,
      show: index,
    }));

    mutate({ api, data: payload });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          className="cs-btn-primary"
          onClick={() => openModal}
        >
          Sort structure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl min-w-xl">
        <ScrollArea className="sm:max-w-xl pr-4 m-0">
          <DialogHeader>
            <DialogTitle>Sort structure</DialogTitle>
            <DialogDescription>
              Click the Save button at the bottom
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return;

                  if (active.id !== over?.id) {
                    setItems((data: any[]) => {
                      const oldIndex = data.findIndex(
                        (item) => item.id === active.id,
                      );
                      const newIndex = data.findIndex(
                        (item) => item.id === over.id,
                      );
                      return arrayMove(data, oldIndex, newIndex);
                    });
                  }
                }}
              >
                <SortableContext
                  items={items}
                  strategy={verticalListSortingStrategy}
                >
                  {items.map((pos: any) => (
                    <SortableItem key={pos.id} id={pos.id} title={pos.name} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
            <div className="mt-8 flex justify-end">
              <SubmitBtn isSubmitting={isPending} label="Save" />
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default AppSortList;
