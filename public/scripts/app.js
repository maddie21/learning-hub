$(() => {
  const getPostFormHTML = () => {
    return `
    <form action="/api/posts" method="POST" class="upload-form">
      <input type="textarea" name="title" placeholder="Title">
      <input type="text" name="URL" placeholder="Url of your resource">
      <textarea name="description" placeholder="People should read it because..." cols="30" rows="10"></textarea>
      <input class="post-button" type="submit" value="Upload"> 
    </form>
  `}

  // Get sample user name
  const getUsername = userId => {
    switch(userId) {
      case 1: return 'alice12';
      case 2: return 'bob13';
      case 3: return 'mrCharlie14';
      default: return 'stranger';
    }
  }

  const createPostHTML = post => {
    return `
      <div class="post" data-id=${post.id}>
        <div class="post-content">
          <div class="post-header">
            <p class="post-title">${post.title}</p>
            <p class="post-author">@${getUsername(post.user_id)}</p>
          </div>
          <div class="post-description">
            <p>${post.description} 
              <a class="post-url" href="${post.URL}" target="_blank">
                read more
              </a>
            </p>
          </div>
          <div class="post-social">
            <div class="heart">
              <i class="fas fa-heart"></i>
              <span class ="likes">${post.like_count || 0}</span>
            </div>
            <div class="rating">
              <i class="fas fa-star-half-alt"></i>
              <span class ="ratings">${post.rating_average || '5'}</span>
            </div>
          </div>
        </div>
        <div class="open-comments">comments</div>
        <div class="post-comments"></div>
        <form class="post-comments-upload">
          <input class="comment-content" type="text" placeholder="what's your opinion?" name="comment_content">
          <button type="submit" class="btn btn-light button-comment">comment</button>
        </form>
      </div>
      `
  }

  // @params: array of posts to render, and a designated container
  function renderPosts(posts, eraseContainer = true) {
    if (eraseContainer) {
      $('#post-container').html('')
      posts.forEach(post => {
        $(createPostHTML(post)).hide().prependTo('#post-container').slideDown('easing');
      })
    } else {
      posts.forEach(post => {
        $(createPostHTML(post)).hide().appendTo('#post-container').slideDown('easing')
      })
    }
  }

  // Load all posts and render it
  function loadPosts() {
    $.ajax({
      method: "GET",
      url: "/api/posts"
    }).done((response) => {
      if(response.status === 'success') {
        const posts = response.data
        renderPosts(posts)
        $(".post-comments-upload").hide()
      } else {
        console.log(response.errors)
      }
    })
    .catch(error => console.log(error))
  }

  const getPlural = (n, word) => n === 1 ? word : word + 's'

  // Reload a given post
  function refreshPost($post) {
    const post_id = $post.data('id')

    $.get(`/api/posts/${post_id}`, ({data}) => {
      // $post.html('')
      $post.replaceWith(createPostHTML(data))
      $post.children('.post-comments-upload').hide()
    })
  }

  const renderSidebarContent = (htmlBlock, eraseContent = true) => {
    if (eraseContent) {
      $('.sidebar-content').html('')
    }
    $(htmlBlock).hide().appendTo('.sidebar-content').slideDown('easing')
  }

  const createUserProfileHTML = user => {
    return `
    <div class="user">
      <p class="user-username">logged in as @${user.username}</p>
      <p class="user-full-name">${user.first_name} ${user.last_name}</p>
    </div>
    `
  }

  async function getComments(postId, cb) {
    const response = await $.get(`api/posts/${postId}/comments`)
    return response.data
  }
  
  const getCommentHTML = comment => {
    return `
      <div class="comment-single">
        <div class="comment-single-content">
        <spanclass="comment-author">@${getUsername(comment.user_id)}:</span>  
          ${comment.content}
        </div>
        
      </div>
    `
  }

  const renderCommentsByPost = (comments, $post, eraseComments = true) => {
    const commentArea = $post.children('.post-comments')
    if (eraseComments) {
      $(commentArea).html('')
    }
    comments.forEach(comment => {
      $(getCommentHTML(comment)).hide().appendTo($(commentArea)).slideDown('easing')
    })

  }

  // Event listeners
  $('.sidebar-content').on('submit', '.upload-form', function (event) {
    event.preventDefault()
    
    const inputSerial = $(this).serialize()
    $.post('/api/posts', inputSerial, () => {
      loadPosts()
    })  
  })

  // Toggle post form on click
  $('#post-resource').on('click', () => {
    renderSidebarContent(getPostFormHTML())
  })

  // Load current user profile and posts
  $('#my-resources').on('click', () => {
    // Render profile in the sidebar
    $.get('/api/users/mine', ({data}) => {
      renderSidebarContent(createUserProfileHTML(data))
    })

    // posts created by current user
    $.get('/api/posts/mine', (response) => {
      if (response.status === 'success') {
        $('#post-container').html('<h1>My resources</h1>')
        const createdPosts = response.data
        renderPosts(createdPosts, false)
      } else {
        console.log(response.errors)
      }
    })

    // posts liked by current user
    $.get('/api/posts/mine/like', (response) => {
      if (response.status === 'success') {
        $('#post-container').append('<h1>My Favourites</h1>')
        const posts = response.data
        renderPosts(posts, false)
      } else {
        console.log(response.errors)
      }
    })

  })

  // Loads all posts when click site title
  $('.page-title').on('click', () => loadPosts())

  $('#post-container').on('click', '.fa-heart', function() {
    const $post = $(this).closest('.post')
    const postId = $post.data('id')
    
    $.post(`/api/posts/${postId}/like`, () => {
      refreshPost($post)
    })
  })

  $('#post-container').on('click', '.open-comments', function() {
    const $post = $(this).closest('.post')
    const postId = $post.data('id')
    
    $.get(`/api/posts/${postId}/comments`, ({data}) => {
      renderCommentsByPost(data, $post)
    })
    $post.find(".post-comments-upload").show()
  })

  // Submit search form with keyword
  $('.search-form').on('submit', function(event) {
    event.preventDefault()

    const inputSerial = $(this).serialize()
    $.post('/api/posts/search', inputSerial, ({data}) => {
      $('#post-container').html(`
        <h1 class="search-result">
          <span class="search-result-normal">
            Found ${data.length} ${getPlural(data.length, 'result')} matching the keyword
          </span>
          <span class="search-result-highlight">"${this.keyword.value}" </span>
        </h1>
      `)
      renderPosts(data, false)
    })  
  })

  // Handle comment submission
  $('#post-container').on('submit', '.post-comments-upload', function(event) {
    event.preventDefault()
    
    const $post = $(this).closest('.post')
    const postId = $post.data('id')
    const inputSerial = $(this).serialize()

    $.post(`/api/posts/${postId}/comments`, inputSerial, ({data}) => {
      renderCommentsByPost(data, $post, false)
    })
    $('.comment-content').val('')
  })

  $('#sidebar-content').on('click', '.button-profile-update', function(event) {
    renderSidebarContent(createProfileUpdateForm())
  })

  // Initial load of the page
  $('.upload-form').hide()
  loadPosts()
})


