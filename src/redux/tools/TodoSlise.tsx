/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// interface CreateTodoType {
// 	values(_id: number, values: any, _id1: any): void;
// 	_id: number;
// 	title: string;
// 	newItems: {
// 		title: string;
// 		values: {
// 			_id: number;
// 			valueTitle: string;
// 		}[];
// 	};
// 	newComments: {
// 		_id: number;
// 		title: string;
// 	}[];
// }

interface TodoState {
	loading: boolean;
	error: string | null;
	todo: TypeTodos[];
}

interface TypeTodos {
	_id: number;
	title: string;
	values: [
		{
			_id: number;
			valueTitle: string;
		}
	];
}

const initialState: TodoState = {
	loading: false,
	error: null,
	todo: [],
};

interface TypeNewTodo {
	title: string;
}

interface TypeTrelloPatch {
	title: string;
}

//!GET
const url =
	"https://api.elchocrud.pro/api/v1/276374fffe1c60c80d84840856bb9eee/trelloTodo";

export const getTodo = createAsyncThunk("todo/getTodo", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(error);
	}
});

//!POST
export const postTodo = createAsyncThunk(
	"todo/postTodo",
	async (newTodo: TypeNewTodo) => {
		try {
			const response = await axios.post(url, newTodo);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
);

//!PATCH
export const patchTodo = createAsyncThunk(
	"todo/patchTodo",
	async ({
		newTodoItem,
		_id,
	}: {
		newTodoItem: TypeTrelloPatch;
		_id: number;
	}) => {
		try {
			const response = await axios.patch(`${url}/${_id}`, newTodoItem);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

//!PUT
export const putTodo = createAsyncThunk(
	"todo_patchTodo",
	async ({ newItems, _id }: { _id: number; newItems: TypeTrelloPatch }) => {
		try {
			const response = await axios.put(`${url}/${_id}`, newItems);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTodo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getTodo.fulfilled, (state, action) => {
				state.loading = false;
				state.todo = action.payload;
			})
			.addCase(getTodo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(postTodo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(postTodo.fulfilled, (state, action) => {
				state.loading = false;
				state.todo = action.payload;
			})
			.addCase(postTodo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(patchTodo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(patchTodo.fulfilled, (state, action) => {
				state.loading = false;
				state.todo = action.payload;
			})
			.addCase(patchTodo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			})
			.addCase(putTodo.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(putTodo.fulfilled, (state, action) => {
				state.loading = false;
				state.todo = action.payload;
				console.log(state.todo, action.payload.data);
			})
			.addCase(putTodo.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message as string;
			});
	},
});

export const todoReducer = todoSlice.reducer;
