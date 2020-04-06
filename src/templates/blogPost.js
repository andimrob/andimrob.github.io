import React from "react"
import { graphql } from "gatsby"

const Template = ({ data }) => {
  const { markdownRemark } = data
  const title = markdownRemark.frontmatter.title
  const html = markdownRemark.html

  return (
    <>
      <h1>{title}</h1>
      <div className="blogPost"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  )
}

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: $pathSlug }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
