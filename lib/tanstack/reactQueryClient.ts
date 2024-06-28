// reactQueryClient.ts
import { QueryClient } from '@tanstack/react-query';

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    //   cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

export default reactQueryClient;
