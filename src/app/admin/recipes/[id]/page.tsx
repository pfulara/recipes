import { getItem } from '@/actions/itemsActions';
import RecipeForm from '@/components/shared/RecipeForm';

export default async function AdminRecipeEdit({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { $id, name, slug, tags, fases } = (await getItem(
    id
  )) as Recipe;

  const defaultValues = {
    $id,
    slug,
    name,
    fases,
    tags,
  };

  return (
    <div className='p-4'>
      <RecipeForm defaultValues={defaultValues} />
    </div>
  );
}
