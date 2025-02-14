import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todos/todosSlice";
const Store = () => {
  return configureStore({
    reducer: {
      todo: todoReducer,
    },
  });
};
// infer the type of store
export type AppStore = ReturnType<typeof Store>;
// infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default Store;
