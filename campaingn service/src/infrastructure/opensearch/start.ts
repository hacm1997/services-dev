import { OpenSearch } from './client/openSearch';

export const StartOpenSearch = async (): Promise<void> => {
  const opensearch = new OpenSearch();
  await opensearch
    .createIndexes()
    .then(() => {
      console.log('Indexes created');
    })
    .catch((error) => {
      console.log('Error creating indexes', error);
    });
};
