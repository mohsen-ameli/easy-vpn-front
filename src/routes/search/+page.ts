export async function load({ fetch }) {
	async function loadTodos() {
		const res = await fetch("https://jsonplaceholder.typicode.com/todos")
		const data: {
			userId: number
			id: number
			title: string
			completed: boolean
		}[] = await res.json()
		return data
	}

	return { todos: loadTodos() }
}
