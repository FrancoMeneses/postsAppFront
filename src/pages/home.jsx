import { usePosts } from "../context/appContext"
import { VscNewFile } from "react-icons/vsc"
import { NavLink } from "react-router-dom"
import "../styles/home.css"

export function Home() {

  const { posts, parseDate } = usePosts()

  document.title = 'Posts App'

  if (posts.length === 0) {
    return (
      <div className="nopost">
        <div className="header-home">
          <h2>Posts</h2>
        </div>
        <h2>There are no post</h2>
        <NavLink to='/newpost' className="header-home-newpost">
            <VscNewFile />
            <p>Create New Post</p>
        </NavLink>
        <p>Probably due to API does not active yet, with this call will be enabled soon, please wait.</p>
      </div>
    )
  }

  return (
    <div className="container-home">
      <div className="container-data">
        <div className="header-home">
          <h2>Posts</h2>
        </div>
        <div className="posts">
          {posts.map((post) => {
            return (
              <NavLink to={`/post/${post._id}`} key={post._id} className='post'>
                <div className="post-title-date">
                  <h2>{post.title}</h2>
                  <p>{parseDate(post.date)}</p>
                </div>
                <summary>{post.description}</summary>
                <div className="post-tag-comments">
                  <div className="post-no-comments">Comments: {post.comments.length}</div>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}