declare type RecipeParams = {
  id?: string;
  name: string;
  description: string;
  tags?: string[];
  ingredients: {
    id: string;
    name: string;
    quantity: string;
  }[];
};
