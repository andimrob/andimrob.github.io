const path = require('path')

const createTagPages = (createPage, posts) => {
  const singleTagIndexTemplate = path.resolve('src/templates/singleTagIndex.js')
  const postsByTag = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[ tag ]) {
          postsByTag[ tag ] = []
        }

        postsByTag[ tag ].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTag)

  tags.forEach(tagName => {
    const post = postsByTag[ tagName ]

    createPage({
      path: `tags/${tagName}`,
      component: singleTagIndexTemplate,
      context: {
        tagName,
        posts: post
      }
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js')

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date]}
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    tags
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges

        createTagPages(createPage, posts)

        posts.forEach(({ node }, idx) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path,
              prev: idx === (posts.length - 1) ? null : posts[ idx + 1 ].node,
              next: idx === 0 ? null : posts[ idx - 1 ].node,
            }
          })
        })
      })
    )
  })
}
