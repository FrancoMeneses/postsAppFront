export async function getPostsRequest() {
  try {
    const res = await fetch('https://postsapp.onrender.com/posts')
    const data = res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getPostRequest(id) {
  try {
    const res = await fetch(`https://postsapp.onrender.com/posts/${id}`)
    const data = res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createPostRequest(data) {
  // try {
  //   console.log(data)
  //   const res = await fetch(`https://postsapp.onrender.com/posts`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     mode: 'no-cors',
  //     headers: {
  //       'Content-Type': 'application/json'
  //   }
  // })
  //   console.log(res)
  //   return res
  // } catch (error) {
  //   console.log(error)
  // }
  try {
    const form = new FormData()
    for(let key in data){
      form.append(key, data[key])
    }
    const res = await fetch(`https://postsapp.onrender.com/posts`, {
      method: 'POST',
      body: form
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

export async function deletePostRequest(id) {
  try {
    const res = await fetch(`https://postsapp.onrender.com/posts/${id}`, {
      method: 'DELETE'
    })
    return res
  } catch (error) {
    console.log(error)
  }
}