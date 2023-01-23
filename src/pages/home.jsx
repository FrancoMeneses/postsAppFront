import { usePosts } from "../context/appContext"
import { VscNewFile } from "react-icons/vsc"
import { NavLink } from "react-router-dom"

export function Home () {

  const { posts } = usePosts()

  return(
    <div className="container-home">
      <div className="container-data">
        <div className="header-home">
          <h2>Posts</h2>
          <NavLink to='/newpost'>
            <VscNewFile />
          </NavLink>
        </div>
        <div className="posts">
          {posts.map((post) => {
            return(
              <NavLink to={`/post/${post._id}`} key={post._id} className='post'>
                <h2>{post.title}</h2>
                <li>{post.body}</li>
                <div className="post-tag">
                  {post.category}
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}