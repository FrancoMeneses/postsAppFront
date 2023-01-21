import { createContext, useState, useContext, useEffect } from "react"
import { getPosts } from "../api/endpoints"

const postsContext = createContext()

export const usePosts = () => {
    const context = useContext(postsContext)
    return context
}

export function ContainerContext({children}) {
  
  const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   const get = async () => {
  //     const data = await getPosts()
  //     setPosts(data)
  //   }
  //   get()
  // },[])


  return <postsContext.Provider value={{
    posts,
    setPosts
  }}>
    {children}
  </postsContext.Provider>
}