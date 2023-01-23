import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Navbar, Home, NewForm, NotFound, Post } from './imports'
import { ContainerContext } from './context/appContext'

function Layout() {
  return (
    <ContainerContext>
      <Navbar />
      <Outlet />
    </ContainerContext>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/newpost",
        element: <NewForm />
      },
      {
        path: "/post/:id",
        element: <Post />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
