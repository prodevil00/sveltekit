<script>
import {load } from '$lib/load.js'
import Export from '$lib/component/Export.svelte'
 import { writable } from 'svelte/store';
export let data;
let offset = 1;

const posts = writable(data.props.result.data.posts.edges)
 const loadMore = async (e) => {
   e.target.classList.add('is-loading')
   const data = await load(offset)
    const { posts: newPosts } = data;
    posts.set([...$posts, ...newPosts])
    offset += 1;
   e.target.classList.remove('is-loading')
  };


  const Copy = (p,e) =>{
    navigator.clipboard.writeText(p).then(()=>{
      e.target.innerHTML = "Copied";
      setTimeout(()=>{
        e.target.innerHTML = "Copy";
      },1000);
    })
  }
</script>

<div class="container">
<div class='card'>
<table class='table'>
  <thead>
    <tr>
      <th>Title</th>
      <th>Featured Image</th>
      <th>Copy Url</th>
    </tr>
  </thead>
  <tbody>
    {#each $posts as post}
      <tr>
        <td class="TableTitle"><a href={`/post/${post.node.slug}`}>{post.node.title}</a></td>
        <td>
          {#if post.node.featuredImage}
            <img width=70 height=70 src={post.node.featuredImage.node.sourceUrl} alt={post.node.title} />
          {:else}
            No Image
          {/if}
        </td>
        <td><button class="button is-success is-light" on:click={(e)=>Copy(window.location.hostname+'/post/'+post.node.slug, e)}>Copy</button></td>
      </tr>
    {/each}
  </tbody>
</table>
 <div class="has-text-centered mb-5 p-5">
    <button on:click={loadMore} class="button is-primary">Load More</button>
</div>
<Export />
</div>
</div>