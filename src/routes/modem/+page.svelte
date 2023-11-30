<script lang="ts">
	import { enhance } from "$app/forms"
	import Button from "$lib/button.svelte"
	import { getNotificationsContext } from "svelte-notifications"
	const { addNotification } = getNotificationsContext()

	export let form
	export let data

	$: {
		if (form) {
			if (form?.err) addNotification({ text: form.err, position: "top-center", type: "error" })
			else
				addNotification({
					text: "Modem created successfully",
					position: "top-center",
					type: "success"
				})
		}
	}

	let showCreate = false
	let showDelete = false
	let id = 0
</script>

<svelte:head>
	<title>Project | Modem</title>
</svelte:head>

<div class="p-8 container space-y-4">
	<div class="flex flex-col justify-center items-center">
		<!-- Toggle new modem -->
		<Button
			text={showCreate ? "Hide Create New Modem" : "Show Create New Modem"}
			onClick={() => (showCreate = !showCreate)}
		/>

		<!-- Create new modem -->
		<form
			method="post"
			action="?/create"
			class={"flex flex-col gap-4 mt-4 " + (showCreate ? "" : "hidden")}
		>
			<div class="flex justify-between gap-2">
				<div class="flex flex-col">
					<label for="brand" class="text-lg">brand</label>
					<input
						type="text"
						class="border-2 rounded-lg text-black px-2 py-1"
						name="brand"
						required
						value={form?.brand ?? ""}
					/>
				</div>

				<div class="flex flex-col">
					<label for="model" class="text-lg">model</label>
					<input
						type="text"
						class="border-2 rounded-lg text-black px-2 py-1"
						name="model"
						required
						value={form?.model ?? ""}
					/>
				</div>
			</div>
			<div class="flex justify-between gap-2">
				<div class="flex flex-col">
					<label for="speed" class="text-lg">Internet Speed</label>
					<input
						type="text"
						class="border-2 rounded-lg text-black px-2 py-1"
						name="speed"
						value={form?.speed ?? ""}
					/>
				</div>
				<div class="flex flex-col">
					<label for="isp" class="text-lg">ISP</label>
					<input
						type="text"
						required
						class="border-2 rounded-lg text-black px-2 py-1"
						name="isp"
						value={form?.isp ?? ""}
					/>
				</div>
			</div>
			<div class="flex flex-col">
				<label for="extra" class="text-lg">Extra</label>
				<textarea
					class="border-2 rounded-lg text-black px-2 py-1"
					name="extra"
					value={form?.extra ?? ""}
				/>
			</div>
			<Button type="submit" text="Create Modem" varient="success" />
		</form>
	</div>

	<!-- All modems -->
	{#if data}
		<div class="grid grid-cols-3 gap-4">
			{#each data.modems as item}
				<div class="bg-slate-600 rounded-lg w-full space-y-2 p-4">
					<h1 class="text-xl font-bold text-clip overflow-hidden">Brand: {item.brand}</h1>
					<h1 class="text-lg font-semibold">Model: {item.model}</h1>
					<p>Speed: {item.speed}</p>
					<p>ISP: {item.isp}</p>
					<p>Extra: {item.extra}</p>
					<div class="flex">
						<Button
							type="submit"
							onClick={() => {
								showDelete = true
								id = item.id
							}}
							text="Delete Modem"
							varient="danger"
						/>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<!-- Delete Modal -->
{#if showDelete}
	<dialog
		class="fixed inset-0 bg-slate-500 w-screen h-screen bg-opacity-50 flex justify-center items-center"
	>
		<div class="bg-slate-400 text-black rounded-lg p-4 space-y-4">
			<h1 class="text-xl font-bold">Are you sure you want to delete this modem?</h1>
			<div class="flex justify-end gap-4 w-full">
				<form
					action="?/delete"
					method="post"
					use:enhance={({ formData }) => {
						formData.append("id", id.toString())
					}}
					on:submit={() => (showDelete = false)}
				>
					<Button type="submit" text="Delete Modem" varient="danger" />
				</form>
				<Button type="submit" text="Cancel" onClick={() => (showDelete = false)} />
			</div>
		</div>
	</dialog>
{/if}
