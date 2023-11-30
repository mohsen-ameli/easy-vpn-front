<script>
	import "../app.css"
	import Notifications from "svelte-notifications"
</script>

<header>
	<nav class="flex bg-green-800 text-white justify-between p-8">
		<h1>Easy Vpn</h1>
		<ul class="flex gap-8">
			<li>
				<a href="/" class="hover:underline hover:text-cyan-600 transition duration-75 p-6">Home</a>
			</li>
			<li>
				<a href="/search" class="hover:underline hover:text-cyan-600 transition duration-75 p-6"
					>Search</a
				>
			</li>
			<li>
				<a href="/modem" class="hover:underline hover:text-cyan-600 transition duration-75 p-6"
					>Modem</a
				>
			</li>
		</ul>
	</nav>
</header>
<body class="bg-slate-800 text-white">
	<Notifications>
		<slot />
	</Notifications>
</body>
