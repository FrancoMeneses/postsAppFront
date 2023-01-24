import { createContext, useState, useContext, useEffect } from "react"
import { createPostRequest, getPostRequest, getPostsRequest, updatePostRequest } from "../api/endpoints"

const postsContext = createContext()

export const usePosts = () => {
  const context = useContext(postsContext)
  return context
}

export function ContainerContext({ children }) {

  const [posts, setPosts] = useState([])

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

  useEffect(() => {
    getPosts()
  }, [])


  return <postsContext.Provider value={{
    posts,
    setPosts,
    createPost,
    getPost,
    updatePost,
    parseDate
  }}>
    {children}
  </postsContext.Provider>
}