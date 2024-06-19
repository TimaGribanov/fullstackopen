import axios from "axios"

const baseUrl = "http://localhost:3003/api/blogs"

const getAll = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  
  return response.data
}

const newBlog = async (body, token) => {  
  try {
    return await axios.post(baseUrl, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    return error
  }
}

const likeBlog = async (id, token) => {
  const current = await get(id)
  console.log(current)
  const body = {
    ...current,
    upvotes: current[0].upvotes + 1
  }

  try {
    return await axios.put(`${baseUrl}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    return error
  }
}

const editBlog = async (id, title, author, url, likes, token) => {
  const body = {
    author: author,
    upvotes: likes,
    title: title,
    url: url,
  }

  try {
    return await axios.put(`${baseUrl}/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    return error
  }
}

const deleteBlog = async (id, token) => {
  try {
    return await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    return error
  }
}

export default { getAll, get, newBlog, editBlog, deleteBlog, likeBlog }