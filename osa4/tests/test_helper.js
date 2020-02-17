const Blog = require('../models/blogi')

const initialBlogs = [
    {
        title: 'testi1',
        author: 'McTestaaja',
        url: 'www.kehatieto.fi',
        likes: 4
    },
    {
        title: 'testi2',
        author: 'Testerson',
        url: 'www.google.fi',
        likes: 12
    }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}