import type { Actions } from "@sveltejs/kit"
import { SERVER_URL } from "$env/static/private"

export type Modem = {
	id: number
	brand: string
	model: string
	speed: string | null
	isp: string
	extra: string | null
}

type ModemItem = Modem & { err: string | null }

export async function load({ fetch }) {
	async function loadModems() {
		const res = await fetch(SERVER_URL + "/api/modem/")
		const data: Modem[] = await res.json()
		return data
	}

	return { modems: loadModems() }
}

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		const brand = formData.get("brand") as string
		const model = formData.get("model") as string
		const speed = formData.get("speed") as string
		const isp = formData.get("isp") as string
		const extra = formData.get("extra") as string
		const url = `${SERVER_URL}/api/modem/`
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ brand, model, speed, isp, extra }),
			headers: { "Content-Type": "application/json" }
		})
		const data: ModemItem = await res.json()
		return {
			err: data.err,
			brand,
			model,
			speed,
			isp,
			extra
		}
	},
	delete: async ({ request }) => {
		const formData = await request.formData()
		const id = formData.get("id") as string
		const url = `${SERVER_URL}/api/modem/`
		const res = await fetch(url, {
			method: "DELETE",
			body: JSON.stringify({ id }),
			headers: { "Content-Type": "application/json" }
		})
		const data: ModemItem = await res.json()
		return {
			err: data.err,
			id
		}
	}
} satisfies Actions
