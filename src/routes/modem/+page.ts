import type { Modem } from "./+page.server.js"

export async function load({ fetch }) {
	async function loadModems() {
		const res = await fetch("http://localhost:8000/api/modem/")
		const data: Modem[] = await res.json()
		return data
	}

	return { modems: loadModems() }
}
