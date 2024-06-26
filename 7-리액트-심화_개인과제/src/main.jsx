import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from '../redux/store.js'
import { Provider } from 'react-redux'


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initiallsOpen={false} />
      <App />
    </QueryClientProvider>
  </Provider>
)
