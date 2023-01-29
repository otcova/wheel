<script lang="ts">
    import { onMount } from "svelte";


	const colors = ["f4a261", "2a9d8f", "e76f51", "e9c46a"];

	const color = colors[Math.floor(Math.random() * colors.length)];

	const size = 600;
	let ratio = 0.3;

	const divisions: { size: number; lable: string }[] = [];
	for (let i = 0; i < 3; ++i)
		divisions.push({ size: 1, lable: "Hello " + i });
	divisions[0].size = 0.5;

	let angle = 0;
	let rotate = () => {
		angle += 2;
		requestAnimationFrame(rotate);
	}
	onMount(rotate);
</script>

<svg width="{size}px" height="{size}px">
	{#each divisions as { size: arc_size, lable }, i}
		{@const r = size / 2}
		{@const scale = divisions.reduce((a, b) => a + b.size, 0)}
		{@const start =
			divisions.slice(0, i).reduce((a, b) => a + b.size, 0) / scale}
		<circle
			fill="none"
			stroke="#{colors[
				i == divisions.length - 1 && i % colors.length == 0
					? 1
					: i % colors.length
			]}"
			stroke-width={size / 3}
			stroke-dasharray={(size * Math.PI) / 2}
			stroke-dashoffset={(Math.max(0, 0.999 - arc_size / scale) * size * Math.PI) /
				2}
			transform="rotate({angle + start * 360} {r} {r})"
			cx={r}
			cy={r}
			r={size / 4}
		/>
		<text
			x={r * 1.75}
			y={r}
			font-size={(8 / (8 + lable.length)) *
				Math.min(60, (1.5 * size * arc_size) / scale)}
			text-anchor="end"
			dominant-baseline="middle"
			transform="rotate({angle +
				start * 360 +
				(360 * arc_size) / scale / 2} {r} {r})"
			font-family="Arial">{lable}</text
		>
	{/each}
</svg>

<style>
</style>
