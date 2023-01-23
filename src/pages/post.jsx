import { useEffect, useState } from "react"
import { usePosts } from "../context/appContext"
import { useParams } from "react-router-dom"

export function Post() {

  const {id} = useParams()
  const { getPost } = usePosts()
  const [post, setPost] = useState({})

  const fetch = async(id) => {
    const res = await getPost(id)
    setPost(res)
  }

  useEffect(() => {
    fetch(id)
  },[])

  if(post.length === 0) {
    return(
      <div>Loading post...</div>
    )
  }

  return (
    <div className="post-container">
      <h2>{post.title}</h2>
      <div>{post.body}</div>
      <div>{post.author}</div>
      <div>{post.category}</div>
    </div>
  )
}