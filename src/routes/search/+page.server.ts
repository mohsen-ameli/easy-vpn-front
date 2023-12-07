import type { Actions } from "@sveltejs/kit"
import { SERVER_URL } from "$env/static/private"

export type Hardware = {
	id: number
	brand: string
	model: string
	version: string | null
	supported_current_release: string
	device_page: string | null
}

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

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const brand = formData.get("brand") as string
		const model = formData.get("model") as string
		const version = formData.get("version") as string
		const url = `${SERVER_URL}/api/search-openwrt/?brand=${brand}&model=${model}&version=${version}`
		const res = await fetch(url)
		const data: Hardware[] = await res.json()
		return {
			success: true,
			data,
			brand,
			model,
			version
		}
	}
} satisfies Actions
