import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CreateRegisterType {
	_id?: number;
	email: string | number;
	login: string | number;
	password: number | string;
	img: string;
}

interface RegisterState {
	loading: boolean;
	error: string | null;
	data: CreateRegisterType[];
}

const initialState: RegisterState = {
	loading: false,
	error: null,
	data: [],
};

const url =
	"https://api.elchocrud.pro/api/v1/a095d393c562f6b3f86a5d9e8c8a93e4/trrello";

export const getRegister = createAsyncThunk(
	"register/getRegister",
	async () => {
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const postRegister = createAsyncThunk(
	"register/postRegister",
	async (newUser: CreateRegisterType) => {
		try {
			const response = await axios.post(url, newUser);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

const registerSlice = createSlice({
	name: "Register",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRegister.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(getRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred";
			})
			.addCase(postRegister.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.data.push(action.payload);
			})
			.addCase(postRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "An error occurred";
			});
	},
});

export const registerReducer = registerSlice.reducer;
