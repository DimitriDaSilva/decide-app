import { TableCreationDialog } from '@/app/components/organisms/TableCreationDialog';

const EmptyTables = () => {
  return (
    <div className="flex gap-y-7 justify-center items-center flex-col">
      <h1 className="w-4/5 text-2xl md:text-3xl text-transparent text-center font-semibold header-gradient bg-clip-text">
        Stop agonising over your dilemma and take action!
      </h1>

      <TableCreationDialog buttonLabel="Create your first Decide table" />
    </div>
  );
};

export { EmptyTables };
