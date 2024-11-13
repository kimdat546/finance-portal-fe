
import { iziRoute } from '@/routes/routes';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <RouterProvider router={iziRoute.getRouter()} />
  )
}

export default App
