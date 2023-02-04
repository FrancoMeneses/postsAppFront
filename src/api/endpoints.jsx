import { json } from "react-router-dom"

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
    // const res = await fetch(`http://localhost:4000/posts/${id}`)
    const data = res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function createPostRequest(data) {
  try {
    const form = new FormData()
    for (let key in data) {
      if(key === 'tags'){
        form.append(key, JSON.stringify(data[key]))
      }else{
        form.append(key, data[key])
      }
    }
    const res = await fetch(`https://postsapp.onrender.com/posts`, {
      method: 'POST',
      body: form
    })
    let post = await res.json()
    return post
  } catch (error) {
    console.log(error)
  }
}

export async function updatePostRequest(data, id, onlyC) {
  try {
    if(onlyC){
      let headersList = {
        "Content-Type": "application/json"
       }
       let bodyContent = JSON.stringify(data);
       
       let response = await fetch(`https://postsapp.onrender.com/posts/${id}`, { 
         method: "PUT",
         body: bodyContent,
         headers: headersList
       })
       let postUpdated = await response.json()
       return true
    }else{
      console.log(data)
      const form = new FormData()
      for (let key in data) {
        form.append(key, data[key])
      }
      const res = await fetch(`https://postsapp.onrender.com/posts/${id}`, {
        method: 'PUT',
        body: form
      })
      let postUpdated = await res.json()
      return postUpdated
    }
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

export async function handleLogin(user) { 
  try {
    console.log(user)
    const res = await fetch('https://postsapp.onrender.com/login',{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function handleCreateUser(user) {
try {
  const res = await fetch('https://postsapp.onrender.com/newuser',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  // const data = await res.json()
  return res.status
} catch (error) {
  console.log(error)
}
}