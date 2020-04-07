import React from "react"
import { graphql, Link } from "gatsby"

const SingleTagTemplate = ({ data, pageContext }) => {
  const { posts, tagName } = pageContext
  console.log(data)
  console.log(pageContext)

  return (
    <>
      <div>
        Posts about {tagName}
      </div>
      <ul>
        {posts.map(post => (
          <li>
            <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SingleTagTemplate;
