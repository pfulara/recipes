'use server';

import { revalidatePath } from 'next/cache';
import { database, ID, Query } from '@/appwrite';

export const addItem = async (
  item: Recipe
): Promise<Recipe> => {
  const ingredients = item.ingredients.map((ing) => ({
    name: ing.name,
    quantity: ing.quantity,
  }));
  const tags = item.ingredients.map((ing) => ing.name);

  const newRecipe = {
    name: item.name,
    description: item.description,
    ingredients,
    tags,
  };

  const res = await database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    ID.unique(),
    newRecipe
  );

  const recipe = {
    $id: res.$id,
    name: res.name,
    description: res.description,
    tags: res.tags,
    ingredients: res.ingredients,
  };

  await revalidatePath('/admin');

  return recipe;
};

export const editItem = async (
  item: Recipe
): Promise<Recipe> => {
  const ingredients = item.ingredients.map((ing) => ({
    name: ing.name,
    quantity: ing.quantity,
  }));
  const tags = item.ingredients.map((ing) => ing.name);

  const recipe = {
    name: item.name,
    description: item.description.replaceAll(
      '\n',
      '<br />'
    ),
    ingredients,
    tags,
  };

  const response = await database.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    item.$id || '',
    recipe
  );

  await revalidatePath('/admin');

  return {
    $id: item.$id,
    name: response.name,
    description: response.description,
    ingredients: response.ingredients,
    tags: response.tags,
  };
};

export const getItems = async (
  name: string = '',
  tags: string = ''
): Promise<Recipe[]> => {
  const response = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    [
      Query.and([
        Query.contains('name', name),
        Query.contains('tags', tags.split(' ')),
      ]),
    ]
  );
  const recipies = response.documents.map((doc) => ({
    $id: doc.$id,
    name: doc.name,
    description: doc.description,
    tags: doc.tags,
    ingredients: doc.ingredients,
  }));

  return recipies;
};

export const getItem = async (
  $id: string
): Promise<Recipe> => {
  const response = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    [Query.equal('$id', $id)]
  );

  const recipe = {
    $id: response.documents[0].$id,
    name: response.documents[0].name,
    description: response.documents[0].description,
    tags: response.documents[0].tags,
    ingredients: response.documents[0].ingredients,
  };

  return recipe;
};

export const deleteItem = async ($id: string) => {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
      'recipes',
      $id
    );
    revalidatePath('/admin');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};
