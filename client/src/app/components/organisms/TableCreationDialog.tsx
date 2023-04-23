import { useBoolean } from 'usehooks-ts';

import { useCreateTableMutation } from '@/entities/tables/useCreateTableMutation';
import { TableRequestDto } from '@/entities/tables/tables.dto';

import { Button } from '../atoms/button/Button';
import { Input } from '../atoms/forms/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../molecules/dialog';

interface TableCreationElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
}

interface TableCreationElement extends HTMLFormElement {
  readonly elements: TableCreationElements;
}

type TableCreationDialogProps = {
  buttonLabel: string;
};

const TableCreationDialog = ({ buttonLabel }: TableCreationDialogProps) => {
  const { value: dialogIsOpen, setValue: setDialogIsOpen } = useBoolean(false);
  const { mutateAsync: createTable } = useCreateTableMutation();

  const handleOnSubmit = async (e: React.FormEvent<TableCreationElement>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    const body = {
      title: target.title.value,
    } as TableRequestDto;

    await createTable({ body });
    setDialogIsOpen(false);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button variant="filled" color="gradient">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start creating your new table</DialogTitle>
        </DialogHeader>

        <form
          className="w-full md:w-3/4 flex flex-col gap-8"
          onSubmit={handleOnSubmit}
        >
          <Input
            label="Dilemma you are indecisive about"
            id="title"
            type="text"
            placeholder="Where should I go in holidays?"
          />

          <Button variant="filled" color="gradient">
            Create table
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { TableCreationDialog };
