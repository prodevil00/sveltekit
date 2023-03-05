<script>
  export let data;
  const {postBy:post} = data.props.result.data
</script>

<svelte:head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width"/>
  <title>{post.title}</title>
  <meta name="description" content={post.seo.opengraphDescription} />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
  <link rel="canonical" href={post?.seo?.canonical} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={post?.seo?.title} />
  <meta property="og:description" content={post?.seo?.opengraphDescription || ""} />
  <meta property="og:url" content={post?.seo?.canonical} />
  <meta property="og:site_name" content={post?.seo?.opengraphSiteName} />
  <meta property="og:image" content={post?.seo?.opengraphImage?.mediaItemUrl || ""} />
  <meta property="og:image:width" content="960" />
  <meta property="og:image:height" content="536" />
  <meta property="og:image:type" content="image/jpeg" />
</svelte:head>

<div class="container card mt-5">
  <main class="main">
    <nav class="navbar is-dark m-4 p-2" style="width:100%; border-radius:10px;" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="#home" class="navbar-item">Home</a>
          <a href='#news' class="navbar-item">News</a>
          <a href="#contact" class="navbar-item">Contact</a>
        </div>
      </div>
  
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a href='#about' class="button is-primary">
              <strong>About</strong>
            </a>
          </div>
        </div>
      </div>
  
    </nav>
    <h1 class="title">{post.title}</h1>
    <div class="grid">
      <div class="content">
       {@html post.content}
      </div>
    </div>
    <p class="backToHome"><a>&lt; Back to home</a></p>
  </main>
</div>
