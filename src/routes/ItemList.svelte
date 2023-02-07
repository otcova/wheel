<script lang="ts">
	import { items, type WheelItem } from "./WheelData";

	let itemsValue: WheelItem[];
	items.subscribe((value) => (itemsValue = value));

	function createNewItem() {
		items.update((items) => [
			...items,
			{
				lable: "",
				weight: 10,
			},
		]);
	}

	function deleteItem(index: number) {
		items.update((items) => {
			items.splice(index, 1);
			return items;
		});
	}
</script>

<div class="column">
	{#each itemsValue as _, i}
		<div class="row">
			<input class="input" bind:value={$items[i].lable} />
			<input
				class="slider"
				type="range"
				bind:value={$items[i].weight}
				min="2"
				max="18"
				step="0.1"
			/>
			<button class="button" on:click={() => deleteItem(i)} />
		</div>
	{/each}

	<button class="newItem" on:click={createNewItem}>+</button>
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 450px;
		flex-grow: 1;
		overflow-y: auto;
		max-height: 80vh;
		padding: 5px;
		border: 20px solid #0000;
		border-radius: 10px;
		background-color: #222a;
	}

	@media (max-width: 1000px) {
		.column {
			width: calc(100% - 40px);
			flex-grow: 0;
		}
	}

	.row,
	.newItem {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		height: 40px;
		width: 100%;
		background-color: #111;
		padding-left: 10px;
		padding-right: 10px;
		gap: 30px;
		border-radius: 3px;
	}
	.input {
		flex-grow: 1;
		width: 50px;
		width: none;
		outline: none;
		border: none;
		color: #fff;
		background-color: #333;
		border-radius: 3px;
		padding-left: 8px;
		padding-right: 8px;
		height: 20px;
		font: 16px "Space Mono";
	}
	.newItem {
		color: #eee;
		cursor: pointer;
		background-color: #1119;
		border: 3px solid #000;
		transition: all 0.1s;
		font: 23px "Space Mono";
	}
	.newItem:hover {
		background-color: #111c;
	}
	.slider {
		width: 100px;
		height: 6px;

		appearance: none;
		background-color: #333;
		border-radius: 3px;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 14px;
		height: 14px;
		border: none;
		outline: none;
		background: #2a9d8f;
		cursor: pointer;
		border-radius: 100%;
	}
	.slider::-moz-range-thumb {
		width: 14px;
		height: 14px;
		border: none;
		outline: none;
		background: #2a9d8f;
		cursor: pointer;
		border-radius: 100%;
	}

	.button {
		background: none;
		outline: none;
		border: none;
		cursor: pointer;
		padding: 0;
		margin: 0;
		opacity: 0.7;
		transition: all 0.1s;
		padding: 5px 5px 6px 5px;
	}
	.button::after {
		content: "❌";
	}
	.button:hover {
		opacity: 1;
		background-color: #f332;
		border-radius: 100%;
	}
</style>
