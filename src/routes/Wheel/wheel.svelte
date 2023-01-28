<script lang="ts">
	const colors = ["19fa43", "ffb703", "fb8500", "fa3c16"];
	const color = colors[Math.floor(Math.random() * colors.length)];
</script>

<div class="division" style="--color:#{color}" />

<style>
	.division {
		background-color: var(--color);
		width: min(50vw, 50vh);
		height: min(50vw, 50vh);
		border-radius: 100%;
	}
</style>
