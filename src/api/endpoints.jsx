export async function getPosts() {
  try {
    const res = await fetch('https://postsapp.onrender.com/posts')
    const data = res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getPost(id) {
  try {
    const res = await fetch(`https://postsapp.onrender.com/posts/${id}`)
    const data = res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createPost(data) {
  try {
    const form = new FormData()
    for(let key in data){
      form.append(key, data[key])
    }
    const res = await fetch(`https://postsapp.onrender.com/posts`, {
      method: 'POST',
      body: form
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function deletePost(id) {
  try {
    const res = await fetch(`https://postsapp.onrender.com/posts/${id}`, {
      method: 'DELETE'
    })
    return res
  } catch (error) {
    console.log(error)
  }
}