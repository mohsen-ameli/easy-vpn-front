<script lang="ts">
	export let form
	let cols = 4

	$: {
		if (form) {
			if (form.data.length < 6) {
				cols = form.data.length
			}
		}
	}

	function sort(
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement
		}
	) {
		const sort = e.currentTarget.value
		if (!form) return
		if (sort.includes("release")) {
			form.data = form.data.toSorted((a, b) => {
				if (a.supported_current_release < b.supported_current_release)
					return sort === "release-asc" ? -1 : 1
				if (a.supported_current_release > b.supported_current_release)
					return sort === "release-asc" ? 1 : -1
				return 0
			})
		} else if (sort === "brand") {
			form.data = form.data.toSorted((a, b) => {
				if (a.brand < b.brand) return -1
				if (a.brand > b.brand) return 1
				return 0
			})
		} else if (sort === "model") {
			form.data = form.data.toSorted((a, b) => {
				if (a.model < b.model) return -1
				if (a.model > b.model) return 1
				return 0
			})
		} else if (sort === "id") {
			form.data = form.data.toSorted((a, b) => {
				if (a.id < b.id) return -1
				if (a.id > b.id) return 1
				return 0
			})
		}
	}
</script>

<svelte:head>
	<title>Project | Search</title>
</svelte:head>

<div class="p-8 container">
	<div class="w-[75%] mx-auto">
		<h1 class="text-center py-4 text-2xl font-semibold">
			Search for hardware that support OpenWRT
		</h1>

		<form method="post" class="flex flex-col gap-4">
			<div class="flex flex-col">
				<label for="brand" class="text-lg">brand</label>
				<input
					type="text"
					class="border-2 rounded-lg px-2 py-1 text-black"
					value={form?.brand ?? ""}
					name="brand"
				/>
			</div>
			<div class="flex flex-col">
				<label for="model" class="text-lg">model</label>
				<input
					type="text"
					class="border-2 rounded-lg px-2 py-1 text-black"
					value={form?.model ?? ""}
					name="model"
				/>
			</div>
			<div class="flex flex-col">
				<label for="version" class="text-lg">version</label>
				<input
					type="text"
					class="border-2 rounded-lg px-2 py-1 text-black"
					value={form?.version ?? ""}
					name="version"
				/>
			</div>
			<button
				class="p-2 w-fit border-2 border-green-700 rounded-lg hover:bg-green-600 hover:text-white transition duration-75"
				type="submit">Search for hardware</button
			>
		</form>
	</div>

	{#if form}
		<div>
			<h1>Sort results by:</h1>
			<select name="sort" class="text-black" on:change={sort}>
				<option value="brand">Brand</option>
				<option value="model">Model</option>
				<option value="release-asc">Ascending Release</option>
				<option value="release-dsc">Descending Release</option>
				<option value="id">ID</option>
			</select>
		</div>

		<div class={`mt-8 grid grid-cols-${cols} gap-4`}>
			{#each form.data as item}
				<div class="bg-slate-600 rounded-lg w-full flex flex-col gap-2 p-4">
					<p>#{item.id}</p>
					<h1 class="text-xl font-bold">Brand: {item.brand}</h1>
					<h1 class="text-lg font-semibold">Model: {item.model}</h1>
					{#if item.version}
						<p>Version: {item.version}</p>
					{/if}
					{#if item.supported_current_release}
						<a
							href={"https://openwrt.org/releases/" + item.supported_current_release}
							class="underline text-cyan-500"
						>
							Supported Release: {item.supported_current_release}
						</a>
					{/if}
					<a href={"https://openwrt.org/" + item.device_page} class="underline text-cyan-500">
						Device Page
					</a>
				</div>
			{/each}
		</div>
	{/if}
</div>
