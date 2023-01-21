import { usePosts } from "../context/appContext"

export function Home () {

  const { posts, setPosts } = usePosts()

  return(
    <div className="container-home">
      <div className="container-data">
        <div>
          <button onClick={() => {
            setPosts([...posts, 'Adios'])
          }}>Agregar</button>
          {posts.map((post, i) => {
            return(
              <li key={i}>{post}</li>
            )
          })}
        </div>
      </div>
    </div>
  )
}