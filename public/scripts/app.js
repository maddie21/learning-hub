
$(() => {

  function createPost(post) {

    
    return $(`<div class="post col" -data-id=$(post.id) >
      <p class="post-title">${post.title}</p>
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id} </p> 
    
    `)
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

  function loadPosts () {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((posts) => {
      renderPosts(posts)
    })
  }

  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })
  loadPosts()

})


