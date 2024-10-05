import { Client, Databases } from 'appwrite';

export const client = new Client();

if (process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    );
}

export const database = new Databases(client);
export { ID, Query } from 'appwrite';
