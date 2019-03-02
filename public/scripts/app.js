
$(() => {

  function createPost(post) {
<<<<<<< HEAD

    
    return $(`<div class="post col" -data-id=$(post.id) >
=======
    return $(`<div class="post" -data-id=$(post.id) >
>>>>>>> a2dfa55173669293bc365f31a8342031ad54c936
      <p class="post-title">${post.title}</p>
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id} </p> 
      </div>
    `)
  }

  function renderPosts(posts, container) {
    $('#post-container').html('')
    $('#user-post-container').html('')


    posts.forEach(post => {
      $(container).prepend(createPost(post))
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
      renderPosts(posts, '#post-container')
    })
  }

  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })
<<<<<<< HEAD
=======

  $('#post-resource').on('click', () => {
    $('.upload-form').slideToggle('ease')
  })

  $('#my-resources').on('click', () => {
    $.get('/api/posts/mine', (posts) => {
      renderPosts(posts, '#user-post-container')
      $('#user-post-container').show()
    })
  })

>>>>>>> a2dfa55173669293bc365f31a8342031ad54c936
  loadPosts()

})


