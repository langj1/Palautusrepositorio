const dummy = (blogs) => {
    let numero = 1
    return numero
}

const totalLikes = (blogs) => {
    return blogs.reduce(function (a,b) {
        return a + b.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce(function (a,b){
        return (a.likes > b.likes) ? a : b
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }