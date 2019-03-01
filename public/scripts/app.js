
$(() => {
  function createPost(post) {
    return $(`<div class="post" >
      <p>${post.title}</p>
      <p>${post.description}</p>
      <p>${post.URL}</p>
    </div>`)
  }

  function renderPosts(posts) {
    $('#post-container').html('')

    posts.forEach(post => {
      $('#post-container').prepend(createPost(post))
    })
  }

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  $.ajax({
    method: "GET",
    url: "/api/posts"
  }).done((posts) => {
    console.log(posts)
    renderPosts(posts)
  })

})
