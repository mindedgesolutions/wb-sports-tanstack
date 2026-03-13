import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { StadiumSchema } from '@/schemas/sports/information-about.schema';
import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { AppTooltip } from '@/components';
import { showError } from '@/utils/show.error';

const Highlights = () => {
  const { ...form } = useFormContext<StadiumSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'highlights',
  });
  const [input, setInput] = useState('');

  // ------------------------------

  const addHighlight = () => {
    if (!input.trim()) return;

    if (input.length > 500) {
      showError('Highlight must be at most 500 characters long');
      return;
    }

    append({ value: input.trim() });
    setInput('');
  };

  return (
    <div className="col-span-3 grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="boardType">Highlights</Label>
          <div className="flex gap-4 items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter highlights of stadium"
            />
            <Button type="button" onClick={addHighlight}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Sl. No.</TableHead>
              <TableHead>Highlight</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>
                  <AppTooltip text={field.value} cropLen={60} />
                </TableCell>
                <TableCell>
                  <Trash2
                    className="size-4 text-destructive cursor-pointer"
                    onClick={() => remove(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Highlights;
