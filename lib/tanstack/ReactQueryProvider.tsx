// ReactQueryProvider.tsx
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import reactQueryClient from '@/lib/tanstack/reactQueryClient';

interface ReactQueryProviderProps {
  children: ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
