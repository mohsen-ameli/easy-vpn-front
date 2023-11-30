import type { Actions } from "@sveltejs/kit"

export type Modem = {
	id: number
	brand: string
	model: string
	speed: string | null
	isp: string
	extra: string | null
}

type ModemItem = Modem & { err: string | null }

export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData()
		const brand = formData.get("brand") as string
		const model = formData.get("model") as string
		const speed = formData.get("speed") as string
		const isp = formData.get("isp") as string
		const extra = formData.get("extra") as string
		const url = `http://localhost:8000/api/modem/`
		const res = await fetch(url, {
			method: "POST",
			body: JSON.stringify({ brand, model, speed, isp, extra }),
			headers: { "Content-Type": "application/json" }
		})
		const data: ModemItem = await res.json()
		console.log(data)
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
		const url = `http://localhost:8000/api/modem/`
		const res = await fetch(url, {
			method: "DELETE",
			body: JSON.stringify({ id }),
			headers: { "Content-Type": "application/json" }
		})
		const data: ModemItem = await res.json()
		console.log(data)
		return {
			err: data.err,
			id
		}
	}
} satisfies Actions
