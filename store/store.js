import { configureStore } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import sessionReducer from './session/sessionSlice'
import prescriptionReducer from './prescription/prescriptionSlice'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    prescription: prescriptionReducer,
  },
  middleware: customizedMiddleware,
})