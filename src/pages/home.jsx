import { usePosts } from "../context/appContext"

export function Home () {

  const { posts } = usePosts()

  return(
    <div className="container-home">
      <div className="container-data">
        <div>
          <button>Agregar</button>
          {posts.map((post) => {
            return(
              <div key={post._id}>
                <h2>{post.title}</h2>
                <li>{post.body}</li>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}