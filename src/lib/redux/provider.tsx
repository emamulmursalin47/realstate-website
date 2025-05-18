
// src/lib/redux/provider.tsx
'use client';

import { Provider } from 'react-redux';
import { makeStore } from './store';
import { ReactNode } from 'react';

// Creating the store here to ensure it's only created once
const store = makeStore();

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}