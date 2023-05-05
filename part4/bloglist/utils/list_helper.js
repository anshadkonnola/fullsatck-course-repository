const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (fav, item) => {
        return item.likes >= fav.likes ? item : fav
    }

    return blogs.length
        ? blogs.reduce(reducer, {likes: 0})
        : null
}

const mostBlogs = (blogs) => {
    const groupedPosts = _.groupBy(blogs, 'author') // { author1: [post1, post2], author2: [post3]}
    const authorBlogs = _.map(groupedPosts, (authorPosts, author) => {
        return { author, blogs: authorPosts.length }
    }) // { author1: no.blogs, author2: no.blogs} 
    return _.maxBy(authorBlogs, 'blogs') 
}

const mostLikes = (blogs) => {
    const groupedPosts = _.groupBy(blogs, 'author') // { author1: [post1, post2], author2: [post3]}
    const authorLikes = _.map(groupedPosts, (authorPosts, author) => {
        const likes = _.sumBy(authorPosts, 'likes')
        return { author, likes }
    }) // { author1: totalLikes, author2: totalLikes}
    return _.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
