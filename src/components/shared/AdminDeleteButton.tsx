'use client';

import { Trash2 } from 'lucide-react';

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
import { deleteItem } from '@/actions/itemsActions';

export default function AdminDeleteButton({
  id,
  name,
}: {
  id: Recipe['$id'];
  name: Recipe['name'];
}) {
  const deleteHandler = async () => {
    await deleteItem(id || '');
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Trash2 color='#b40000' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Usuwanie przepisu
            </AlertDialogTitle>
            <AlertDialogDescription>
              Na pewno chcesz usunąć przepis {name}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Nie</AlertDialogCancel>
            <AlertDialogAction onClick={deleteHandler}>
              Tak
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
