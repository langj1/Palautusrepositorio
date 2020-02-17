const blogsRouter = require('express').Router()
const Blog = require('../models/blogi')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(b => b.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null

    if(!request.token || !decodedToken.id){
        return response.status(401).json({error:'Token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

    if (!blog.url || !blog.author) {
        response.status(400).end()
    } else {
        if (!blog.likes) blog.likes = 0
        blog.user = user._id
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id) 
        await user.save()

        response.json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const decodedToken = request.token ? jwt.verify(request.token, process.env.SECRET) : null

    if(!request.token || !decodedToken.id){
        return response.status(401).json({error:'Token missing or invalid'})
    }

    const blogi = await Blog.findById(request.params.id)
    console.log(blogi)
    if(blogi.user.toString() !== decodedToken.id.toString()){
        return response.status(401).json({error:'User doesnt own blog'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

module.exports = blogsRouter