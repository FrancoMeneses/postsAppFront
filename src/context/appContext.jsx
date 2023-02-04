import { createContext, useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createPostRequest, getPostRequest, getPostsRequest, updatePostRequest, handleLogin, handleCreateUser } from "../api/endpoints"

const postsContext = createContext()

export const usePosts = () => {
  const context = useContext(postsContext)
  return context
}

export function ContainerContext({ children }) {

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [loggedUser, setLoggedUser] = useState(null)
  const [newCreation, setNewCreation] = useState({
    status: false,
    loading: false
  })

  const getPosts = async () => {
    const data = await getPostsRequest()
      data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    setPosts(data)
  }

  const getPost = async (id) => {
    const data = await getPostRequest(id)
    return data
  }

  const createPost = async post => {
    const data = await createPostRequest(post)
    return data
  }

  const updatePost = async (post, id, onlyC) => {
    const data = await updatePostRequest(post, id, onlyC)
    return data
  }

  const parseDate = date => {
    const parse = new Date(date)
    return parse.toLocaleDateString('en-GB')
  }

  const login = async user => {
    const data = await handleLogin(user)
    return data
  }

  const newuser = async user => {
    const data = await handleCreateUser(user)
    return data
  }

  const signOut = () => {
    console.log('Sign Out')
    setLoggedUser(null)
    navigate('/')
  }

  useEffect(() => {
    getPosts()
  }, [])


  return <postsContext.Provider value={{
    posts,
    setPosts,
    createPost,
    getPost,
    updatePost,
    parseDate,
    login,
    newuser,
    loggedUser,
    setLoggedUser,
    newCreation,
    setNewCreation,
    signOut
  }}>
    {children}
  </postsContext.Provider>
}