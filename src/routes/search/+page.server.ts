import type { Actions } from "@sveltejs/kit"

export type Hardware = {
	id: number
	brand: string
	model: string
	version: string | null
	supported_current_release: string
	device_page: string | null
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const brand = formData.get("brand") as string
		const model = formData.get("model") as string
		const version = formData.get("version") as string
		const url = `http://localhost:8000/api/search-openwrt/?brand=${brand}&model=${model}&version=${version}`
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
