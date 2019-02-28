const sample = require('./sample-posts')

sample.forEach(post => {
  console.log('id: ', post.id)
  console.log('title: ', post.title)
})