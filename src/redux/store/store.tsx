import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { registerReducer } from "../tools/RegisterSlise";
import { todoReducer } from "../tools/TodoSlise";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
	reducer: {
		register: registerReducer,
		todoTrello: todoReducer,
	},
});

export default store;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
