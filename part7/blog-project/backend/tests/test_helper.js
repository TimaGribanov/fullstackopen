const Blog = require('../models/blog')

const initialNotes = [
  {
    name: 'First',
    title: 'Test Test',
    url: '/test1.html',
    upvotes: 4,
    user: '65200de414f797436da58e3f'
  },
  {
    name: 'Second',
    title: 'Test Test',
    url: '/test2.html',
    upvotes: 5,
    user: '65200de414f797436da58e3f'
  },
  {
    name: 'Third',
    title: 'Test Test',
    url: '/test3.html',
    upvotes: 1,
    user: '65200de414f797436da58e3f'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialNotes,
  blogsInDb
}