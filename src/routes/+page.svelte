<script lang="ts">
	import Button from "$lib/button.svelte"
</script>

<svelte:head>
	<title>Project | Home</title>
</svelte:head>

<div class="container p-8">
	<h1 class="pb-4 text-4xl text-center">Welcome</h1>
	<div class="flex gap-4 items-center justify-center">
		<a href="/search">
			<Button text="Search Page" />
		</a>
		<a href="/modem">
			<Button text="Create new modem" />
		</a>
	</div>
</div>
