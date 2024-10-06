import { v4 as uuidv4 } from 'uuid';

import RecipeForm from '@/components/shared/RecipeForm';

const AddRecipe = () => {
  const defaultValues = {
    $id: '',
    slug: '',
    name: '',
    tags: [],
    fases: [
      {
        $id: uuidv4(),
        name: '',
        description: '',
        ingredients: [
          { $id: uuidv4(), name: '', quantity: '' },
        ],
      },
    ],
  };
  return (
    <div className='p-4'>
      <RecipeForm defaultValues={defaultValues} />
    </div>
  );
};

export default AddRecipe;
