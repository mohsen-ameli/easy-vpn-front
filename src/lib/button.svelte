<script lang="ts">
	export let text = "Click me"
	export let onClick: () => void = () => {}
	export let varient: "primary" | "success" | "danger" = "primary"
	export let type: "button" | "submit" | "reset" = "button"

	let className = "p-2 w-fit border-2 rounded-lg hover:text-white transition duration-75 "

	$: {
		if (varient === "primary") {
			className += "hover:bg-blue-500 border-blue-500"
		} else if (varient === "success") {
			className += "hover:bg-green-500 border-green-500"
		} else if (varient === "danger") {
			className += "hover:bg-red-500 border-red-500"
		}
	}
</script>

<button class={className} on:click={onClick} {type}>
	{text}
</button>
