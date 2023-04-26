import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { type } from '@testing-library/user-event/dist/type'
import todoSlice from './createSlice'
import todoSliceDask  from './CreateSliseDask'


import { 
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'



const persistConfig = {
   key: 'primary',
   storage,
   whitelist: ['dasks','todos']
 }
const rootReduser = combineReducers({
      todos: todoSlice,
      dasks: todoSliceDask,

}   
)

 const persistedReducer = persistReducer(persistConfig, rootReduser)

 export const store:any = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware:any) =>
      getDefaultMiddleware({
         serializableCheck:{
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,]
         },
      }),
    
}) 

// const store = setupStore()
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof store>
export type AppDispatch = AppStore['dispatch']