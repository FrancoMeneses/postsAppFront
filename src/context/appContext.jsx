import { createContext, useState, useContext, useEffect } from "react"
import { createPostRequest, getPostsRequest } from "../api/endpoints"

const postsContext = createContext()

export const usePosts = () => {
  const context = useContext(postsContext)
  return context
}

export function ContainerContext({ children }) {

  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const data = await getPostsRequest()
    setPosts(data)
  }

  const createPost = async post => {
    const data = await createPostRequest(post)
    return data
  }

  useEffect(() => {
    getPosts()
  }, [])


  return <postsContext.Provider value={{
    posts,
    setPosts,
    createPost
  }}>
    {children}
  </postsContext.Provider>
}