import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
//import 'bootstrap/dist/css/bootstrap.min.css';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key:'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, productReducer)
const store = configureStore({
    reducer:{
        cartProduct:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// const store = configureStore({
//     reducer: {
//         cartProduct: productReducer
//     }
// });

export default store;
export const persistor = persistStore(store);




