import { useState } from 'react';

import { Button } from '../../atoms/button/Button';
import { Input } from '../../atoms/forms/Input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../molecules/dialog';

const TableCreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="filled" color="gradient">
          Add a new table
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start creating your new table</DialogTitle>
        </DialogHeader>

        <form className="w-full md:w-3/4 flex flex-col gap-8">
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
