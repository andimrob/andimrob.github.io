import React from "react"
import { graphql, Link } from "gatsby"

const BlogPostTemplate = ({ data, pageContext }) => {
  const { prev, next } = pageContext
  const post = data.markdownRemark
  const { title, tags } = post.frontmatter

  return (
    <article>
      <header>
        <h1>{title}</h1>
        <div>
          {tags.map(tagName => (
            <Link to={`tags/${tagName}`}>
              {tagName}
            </Link>
          ))}
        </div>
      </header>
      <section>
        <div className="blogPost"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </section>
      <footer>
        {prev && <Link to={prev.frontmatter.path}>Prev</Link>}
        {next && <Link to={next.frontmatter.path}>Next</Link>}
      </footer>
    </article>
  )
}

export const pageQuery = graphql`
  query($pathSlug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        tags
        title
      }
    }
  }
`;

export default BlogPostTemplate;
