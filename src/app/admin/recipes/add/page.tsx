import { v4 as uuidv4 } from 'uuid';

import RecipeForm from '@/components/shared/RecipeForm';

const AddRecipe = () => {
  const defaultValues = {
    id: '',
    name: '',
    ingredients: [{ id: uuidv4(), name: '', quantity: '' }],
    tags: [],
    description: '',
  };
  return (
    <div className='p-4'>
      <RecipeForm defaultValues={defaultValues} />
    </div>
  );
};

export default AddRecipe;
