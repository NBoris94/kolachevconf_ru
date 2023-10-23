'use client'

import { ReactNode } from 'react'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import {Provider} from 'react-redux'
import {persistor, store} from '@/redux/store'
import {PersistGate} from 'redux-persist/integration/react'

export function Providers(
    {
        children
    }: {
        children: ReactNode
    }
) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <CacheProvider>
                    <ChakraProvider>
                        {children}
                    </ChakraProvider>
                </CacheProvider>
            </PersistGate>
        </Provider>
    )
}
