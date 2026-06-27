'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import UserLoader from '@/Components/UserLoader';

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserLoader />
        {children}
      </PersistGate>
    </Provider>
  );
}
