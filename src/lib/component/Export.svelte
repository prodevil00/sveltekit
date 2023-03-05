<script>
  import { onMount } from 'svelte';
  
  const buttonstyles = {
    position: "fixed",
    right: 10,
    bottom: 20,
    cursor: "pointer",
    padding: 25,
    fontWeight: "bold",
    zIndex: 999,
  }

  const HandleExport = () => {
    const predata = "Title, Url \n";
    const titles = [...document.querySelectorAll(".TableTitle")].map((title) => ({
      title: title.innerText.replace(/,/g, ""),
      url: window.location.origin + title.innerHTML.split('"')[1].split('"')[0],
    }));
    const csvstring = "\uFEFF" + predata + titles.map((e) => `${e.title},${e.url}`).join("\n");
    const blob = new Blob([csvstring], { type: "data:text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "export.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  onMount(() => {
    // Add any necessary setup code here
  });
</script>

<button style="position: fixed; right: 10px; bottom: 20px; cursor: pointer; padding: 25px; font-weight: bold; z-index: 999;" class="button is-dark" on:click={HandleExport}>
  Export
</button>
