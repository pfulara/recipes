'use server';

import db from '@/lib/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from '@firebase/firestore';
import { revalidatePath } from 'next/cache';

export const addItem = async (item: RecipeParams) => {
  try {
    const ingredients = item.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
    }));

    const body = {
      name: item.name,
      description: item.description.replaceAll(
        '\n',
        '<br />'
      ),
      ingredients,
      tags: item.tags,
    };

    const docRef = await addDoc(
      collection(db, 'recipes'),
      body
    );

    await revalidatePath('/admin');

    return JSON.parse(JSON.stringify(docRef));
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (search: string = '') => {
  try {
    const queryRef = collection(db, 'recipes');

    const querySnapshot = search
      ? await getDocs(
          query(
            queryRef,
            or(
              where('tags', 'array-contains-any', [search]),
              where('name', '==', search)
            )
          )
        )
      : await getDocs(queryRef);

    const items = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (id: string) => {
  try {
    const docRef = await doc(db, 'recipes', id);
    const item = await getDoc(docRef);

    return JSON.parse(JSON.stringify(item.data()));
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id: string) => {
  try {
    const itemRef = doc(db, 'recipes', id);
    await deleteDoc(itemRef);

    revalidatePath('/admin');
  } catch (error) {
    console.error('Error deleting document: ', error);
  }
};
