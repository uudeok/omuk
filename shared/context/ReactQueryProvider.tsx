'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,

                        // SSR을 위해서는 staleTime을 설정해야 한다.
                        /* 
                         staleTime이 0으로 설정할 경우 서버에서 prefetch이후 
                         클라이언트에서 hydrate하는 과정에서 
                        한번 더 fetch가 발생하고 이는 잠재적인 불일치를 야기한다.
                        */

                        /* 
                          SSR 보다는 CSR 에서 query 를 사용하는 편이 많으니 기본값을 0 으로 주고
                          SSR 로 요청을 보낼때 따로 설정해주는 것으로 정리
                        */

                        // staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default ReactQueryProvider;
