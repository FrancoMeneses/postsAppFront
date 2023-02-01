import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { Navbar, Home, NewPost, NotFound, Post, Login} from './imports'
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
        element: <NewPost />
      },
      {
        path: "/post/:id",
        element: <Post />
      },
      {
        path: '/login',
        element: <Login />
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
