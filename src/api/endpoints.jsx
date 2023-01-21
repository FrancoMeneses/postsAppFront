export async function getPosts() {
  let res = await fetch('https://postsapp.onrender.com/posts')
  let data = res.json()
  return data
}