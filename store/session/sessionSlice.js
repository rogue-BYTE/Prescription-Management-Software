import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allSessions: [],
  selectedSession: '',
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAllSessions: (state, action) => {
      state.allSessions = action.payload
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload
    },
  },
})

export const { setAllSessions, setSelectedSession } = sessionSlice.actions

export default sessionSlice.reducer