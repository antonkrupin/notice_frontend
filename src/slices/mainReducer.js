import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: '',
	notices: [],
	error: '',
}

const slice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		loadNotices: (state, action) => {
			state.notices = [...action.payload];
		},
		deleteNotice: (state, action) => {
			const { id } = action.payload;
      state.notices.forEach((notice, index) => {
        if (notice._id === id) {
          state.notices.splice(index, 1);
        }
      });
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
	}
});

export const {
	loadNotices,
	deleteNotice,
	setStatus,
} = slice.actions;

export default slice.reducer;