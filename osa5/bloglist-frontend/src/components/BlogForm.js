import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        title:
        <input type="text" value={title}
          name="Title" onChange={({ target }) => setTitle(target.value)}>
        </input>
      </div>
      <div>
        author:
        <input type="text" value={author}
          name="Author" onChange={({ target }) => setAuthor(target.value)}>
        </input>
      </div>
      <div>
        url:
        <input type="text" value={url}
          name="Url" onChange={({ target }) => setUrl(target.value)}>
        </input>
      </div>
      <button type="submit">create</button><br />
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm