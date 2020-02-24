import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    let newBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(newBlog))
    setNotification('a new blog '
      + newBlog.title
      + ' by '
      + newBlog.author
      + ' added')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => (
    <div>
      <h1>login</h1>
      <Notification message={notification} error={true}></Notification>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username}
            name="Username" onChange={({ target }) => setUsername(target.value)}>
          </input>
        </div>
        <div>
          password
          <input type="password" value={password}
            name="Password" onChange={({ target }) => setPassword(target.value)}>
          </input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => {

    return (

      <div>
        <h2>blogs</h2>
        <Notification message={notification} error={false}></Notification>
        <div>
          <div>{user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
        <Togglable buttonLabel="new blog" cancelLabel="cancel" ref={blogFormRef}>
          <BlogForm createBlog={createBlog}></BlogForm>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        loginForm() :
        blogForm()}
    </div>
  )
}

export default App