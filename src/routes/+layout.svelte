<script>
	import favicon from "$lib/assets/favicon.svg";

	import Header from "./Header.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<Header />

	<main>
		{@render children()}
	</main>
</div>
