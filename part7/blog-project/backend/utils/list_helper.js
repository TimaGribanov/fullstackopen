const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  let sum = 0

  blogs.forEach(el => {
    sum += el.likes
  })

  return sum
}

const favouriteBlog = blogs => {
  let max = 0

  blogs.forEach(el => {
    if (el.likes > max) max = el.likes
  })

  let favBlog

  blogs.forEach(b => {
    if (b.likes === max) favBlog = b
  })

  return favBlog
}

const mostBlogs = blogs => {
  const mostAuthor = _(blogs).countBy('author').entries().maxBy(_.last)
  return { author: mostAuthor[0], blogs: mostAuthor[1] }
}

const mostLikes = blogs => {
  let likes = []
  _.forEach(blogs, el => {
    if (likes.some(e => e.author === el.author)) {
      const index = likes.findIndex(obj => obj.author === el.author)
      likes[index].likes += el.likes
    }
    else
      likes.push({ author: el.author, likes: el.likes })
  })

  const orderedLikes = _.orderBy(likes, 'likes', 'desc')

  return {
    author: orderedLikes[0].author,
    likes: orderedLikes[0].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}