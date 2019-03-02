$(() => {
  function createPost(post) {
    return $(`<div class="post" data-id=${post.id}>
      <p class="post-title">${post.title}</p>
      <p class="post-url"><a href=${post.URL}>${post.URL}</a></p>
      <p class="post-description">${post.description}</p>
      <p class="post-author">user ${post.user_id}</p>
      
      <div class="social-icon-wrapper">
        <i class="fas fa-heart"></i>
        <i class="far fa-comment"></i>
        <i class="fas fa-star-half-alt"></i>
      </div>

    </div>`);
  }

  // @params: array of posts to render, and a designated container
  function renderPosts(posts, container) {
    $('#post-container').html('')
    $('#user-post-container').html('')

    posts.forEach(post => {
      $(container).prepend(createPost(post))
    })
  }

  // Load all posts and render it
  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((posts) => {
      renderPosts(posts, '#post-container')
    })
  }

  // Creating a post upload form
  $('.upload-form').on('submit', function (event) {
    event.preventDefault()
    const inputSerial = $(this).serialize()

    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  // Toggle post form on click
  $('#post-resource').on('click', () => {
    $('.upload-form').slideToggle('ease')
  })

  // Load current user posts
  $('#my-resources').on('click', () => {
    $.get('/api/posts/mine', (posts) => {
      renderPosts(posts, '#user-post-container')
    })
  })

  // Loads all posts when click site title
  $('.page-title').on('click', () => {
    loadPosts()
  })

  // logs user1 in
  $('#login-li').on('click', () => {
    $.get('/login/1')
  })

  $('#post-container').on('click', '.fa-heart', function() {
    const post_id = $(this).closest('.post').data('id')
    $.post(`/api/posts/${post_id}/like`, () => {
      // renderPost(post_id)
    })
  })

  // Initial load of the page
  loadPosts()
  $('.upload-form').toggle()
})

