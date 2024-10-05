import { getItem } from '@/actions/itemsActions';
import RecipeForm from '@/components/shared/RecipeForm';

export default async function AdminRecipeEdit({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { name, ingredients, description, tags } =
    (await getItem(id)) as Recipe;

  const defaultValues = {
    $id: id,
    name,
    ingredients,
    tags,
    description: description.replaceAll('<br />', '\n'),
  };

  return (
    <div className='p-4'>
      <RecipeForm defaultValues={defaultValues} />
    </div>
  );
}
