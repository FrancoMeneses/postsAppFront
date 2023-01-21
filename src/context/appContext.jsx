import { createContext, useState, useContext } from "react"

const postsContext = createContext()

export const usePosts = () => {
    const context = useContext(postsContext)
    return context
}

export function ContainerContext({children}) {

  const [posts, setPosts] = useState([])

  return <postsContext.Provider value={{
    posts,
    setPosts
  }}>
    {children}
  </postsContext.Provider>
}