import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Title from './Title.jsx'
import TodoList from './TodoList.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Title />
    <TodoList />
  </StrictMode>,
)
