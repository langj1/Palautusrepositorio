import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return(
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="view" cancelLabel="hide">
      <br/>{blog.url}<br/>
      likes {blog.likes} <button type="button">like</button><br/>
      {blog.user ? blog.user.name : ''}<br/>
    </Togglable>
  </div>
)
}
export default Blog
