'use server';

import { revalidatePath } from 'next/cache';
import { database, ID, Query } from '@/appwrite';

export const addItem = async (
  item: Recipe
): Promise<Recipe> => {
  const fases = item.fases.map((fase, index) => {
    const ingredients = fase.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
    }));
    return {
      name: fase.name || `Etap ${index + 1}`,
      description: fase.description.replaceAll(
        '\n',
        '<br />'
      ),
      ingredients,
    };
  });

  const tags = new Set();

  fases.map(({ ingredients }) => {
    ingredients.map(({ name }) => tags.add(name));
  });

  const newRecipe = {
    name: item.name,
    slug: item.slug,
    fases,
    tags: Array.from(tags),
  };

  const res = await database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    ID.unique(),
    newRecipe
  );

  const recipe = {
    $id: res.$id,
    slug: res.slug,
    name: res.name,
    fases: res.fases,
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
  const fases = item.fases.map((fase) => {
    const ingredients = fase.ingredients.map((ing) => ({
      $id: ing.$id,
      name: ing.name,
      quantity: ing.quantity,
    }));

    return {
      $id: fase.$id,
      name: fase.name,
      description: fase.description.replaceAll(
        '\n',
        '<br />'
      ),
      ingredients,
    };
  });

  const tags = new Set();

  fases.map(({ ingredients }) => {
    ingredients.map(({ name }) => tags.add(name));
  });

  const recipe = {
    $id: item.$id,
    name: item.name,
    slug: item.slug,
    fases,
    tags: Array.from(tags),
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
    slug: response.slug,
    name: response.name,
    fases: response.fases,
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
    slug: doc.slug,
    name: doc.name,
    fases: doc.fases,
    tags: doc.tags,
  }));

  return recipies;
};

export const getItem = async (
  slug: string
): Promise<Recipe> => {
  const response = await database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    'recipes',
    [Query.equal('slug', slug)]
  );

  const recipe = {
    $id: response.documents[0].$id,
    slug: response.documents[0].slug,
    name: response.documents[0].name,
    fases: response.documents[0].fases,
    tags: response.documents[0].tags,
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
