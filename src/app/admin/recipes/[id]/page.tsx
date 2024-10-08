import { getItem } from '@/actions/itemsActions';
import RecipeForm from '@/components/shared/RecipeForm';
import { Metadata } from 'next';

interface RecipeProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: RecipeProps): Promise<Metadata> {
  const { id } = params;
  const { name } = (await getItem(id)) as Recipe;
  return {
    title: name,
  };
}

export default async function AdminRecipeEdit({
  params,
}: RecipeProps) {
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
