const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blogi')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const authors = response.body.map(r => r.author)
    expect(authors).toContain(
        'Testerson'
    )
})

test("blog id field is named 'id'", async () => {
    const response = await api.get('/api/blogs')

    const blog = response.body[0]
    expect(blog.id).toBeDefined()
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'testi1',
        author: 'McTestaaja',
        url: 'www.kehatieto.fi',
        likes: 4
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const authors = blogsAtEnd.map(b => b.author)
    expect(authors).toContain(
        'Testerson'
    )
})

test('new blog has 0 likes if undefined', async () => {
    const newBlog = {
        title: 'testi1',
        author: 'McTestaaja',
        url: 'www.kehatieto.fi'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const blogs = await helper.blogsInDb()
    const last = blogs[blogs.length - 1]
    expect(last.likes).toBe(0)

})

test('new blog returns 400 if no author or url', async () => {
    const newBlog = {
        title: 'testi1',
        url: 'www.kehatieto.fi'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const newBlog2 = {
        title: 'testi2',
        author: 'McTestaaja'
    }
    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})