import { usePosts } from "../context/appContext"
import { VscNewFile } from "react-icons/vsc"
import { NavLink } from "react-router-dom"

export function Home () {

  const { posts } = usePosts()

  const parseDate = date => {
    const parse = new Date(date)
    return parse.toLocaleDateString('en-GB')
  }

  if(posts.length === 0 ){
    return(
      <div>
        <p>There are no post</p>
      </div>
    )
  }

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
          {console.log(posts.sort((a,b)=>a.date-b.date))}
          {posts.map((post) => {
            return(
              <NavLink to={`/post/${post._id}`} key={post._id} className='post'>
                <div className="post-title-date">
                <h2>{post.title}</h2>
                <p>{parseDate(post.date)}</p>
                </div>
                <li>{post.body}</li>
                <div className="post-tag-comments">
                  <div className="post-comments">Comments: {post.comments.length}</div>
                <div className="post-tag">
                  {post.category}
                </div>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}