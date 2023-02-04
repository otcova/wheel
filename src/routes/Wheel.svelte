<script lang="ts">
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { items, type WheelItem } from "./WheelData";

	const colors = ["f4a261", "2a9d8f", "e76f51", "e9c46a"];
	let size = 600;
	if (browser) size = Math.min(600, innerWidth, innerHeight);
	function resize() {
		size = Math.min(600, innerWidth, innerHeight);
	}

	let divisions: WheelItem[];
	items.subscribe((value) => (divisions = value));

	let mouseDown: [number, number] | null = null;
	let mousePos: [number, number] = [0, 0];

	let angle = 0;
	let v = 0;
	let angleOnMouseDown = angle;

	let move = () => {
		if (mouseDown) {
			const pastAngle = Math.atan2(mouseDown[1], mouseDown[0]);
			const currentAngle = Math.atan2(mousePos[1], mousePos[0]);
			const angleTarget =
				angleOnMouseDown + ((currentAngle - pastAngle) * 180) / Math.PI;
			let angle_dif = ((angleTarget - angle + 540) % 360) - 180;
			// console.log(Math.sign(angle_dif) == Math.sign(v));
			if (Math.sign(angle_dif) == Math.sign(v) || v == 0)
				angle_dif *= 0.8;
			else angle_dif *= 0.1;
			v = angle_dif + v * 0.3;
		}
		angle += v;
		v *= 0.997;
		if (Math.abs(v) < 0.1) v *= 0.99;
		if (Math.abs(v) < 0.01) v = 0;

		requestAnimationFrame(move);
	};
	onMount(move);
	onMount(() => {
		addEventListener("mousemove", updateMousePos);
		addEventListener("touchmove", updateMousePos);
		addEventListener("mouseup", releaseMouse);
		addEventListener("touchend", releaseMouse);
		addEventListener("resize", resize);
		return () => {
			removeEventListener("mousemove", updateMousePos);
			removeEventListener("touchmove", updateMousePos);
			removeEventListener("mouseup", releaseMouse);
			removeEventListener("touchend", releaseMouse);
			removeEventListener("resize", resize);
		};
	});

	let svg: SVGElement;
	function getRelativePos(x: number, y: number): [number, number] {
		const rect = svg.getBoundingClientRect();
		return [x - rect.left - size / 2, y - rect.top - size / 2];
	}

	function onMouseDown(event: MouseEvent) {
		mouseDown = getRelativePos(event.clientX, event.clientY);
		mousePos = mouseDown;
		angleOnMouseDown = angle;
	}

	function releaseMouse() {
		mouseDown = null;
	}

	function updateMousePos(event: MouseEvent | TouchEvent) {
		let x, y;
		if (event instanceof TouchEvent) {
			x = event.touches[0].clientX;
			y = event.touches[0].clientY;
		} else {
			x = event.clientX;
			y = event.clientY;
		}
		mousePos = getRelativePos(x, y);

		if (mouseDown && event.cancelable) {
			event.preventDefault();
		}
	}

	function beep(volume: number) {
		var snd = new Audio(
			"data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU="
		);
		volume = Math.min(1, Math.max(0, volume));
		snd.volume = volume;
		snd.playbackRate = 0.9 + volume * 0.1;
		snd.preservesPitch = false;
		snd.play();
	}

	let triangle_angle = 0;
	let triangle_v = 0;
	let pastCollision: null | number = null;
	let pastAngle = angle;
	$: {
		angle = ((angle % 360) + 360) % 360;

		const offset = 135;

		const hitbox = 4;
		let target = 0;

		const scale = divisions.reduce((a, b) => a + b.weight, 0);
		let collision: null | number = null;

		let triangle_dir = Math.sign(triangle_angle);
		if (Math.abs(triangle_angle) < 10) triangle_dir = 0;

		let a = angle;
		for (let i = 0; i < divisions.length; ++i) {
			const division = divisions[i];
			if (offset - hitbox <= a && a <= offset) target = -1;
			else if (offset <= a && a <= offset + hitbox) target = 1;

			if (triangle_angle != 0) target *= Math.sign(target) * triangle_dir;

			const dir = triangle_dir || Math.sign(target);
			if (target != 0) {
				let d = dir * (offset - a);
				target = dir * 10 * Math.max(0, d + 3);
			}
			a = (a + (360 * division.weight) / scale) % 360;

			if (target != 0) {
				collision = i;
				break;
			}
		}

		// See if we have missed a dot between steps
		if (collision == null) {
			let a = angle;
			for (let i = 0; i < divisions.length; ++i) {
				const d1 = ((offset - a + 540) % 360) - 180;
				const d2 = ((offset + angle - pastAngle - a + 540) % 360) - 180;
				if (
					Math.sign(d1) != Math.sign(d2) &&
					Math.abs(d1) < 90 &&
					Math.abs(d2) < 90
				) {
					target = -Math.sign(v) * 60;
					if (pastCollision != i) collision = i;
				}
				a = (a + (360 * divisions[i].weight) / scale) % 360;
			}
		}

		if (
			(pastCollision != collision && collision != null) ||
			Math.abs(v) > 70
		) {
			beep(Math.log(1 + Math.abs(v)) / 5);
			v -= Math.sign(v) * Math.min(0.4, Math.abs(v - v * 0.97));
		}
		pastCollision = collision;

		triangle_v += (target - triangle_angle) * 0.6;

		triangle_angle += triangle_v;
		triangle_v *= 0.3;
		if (Math.abs(triangle_angle) < 0.1) triangle_angle = 0;
		if (Math.abs(triangle_v) < 0.1) triangle_v = 0;

		pastAngle = a;
	}
</script>

<svg
	bind:this={svg}
	width="{size}px"
	height="{size}px"
	style="min-height: {size}px"
>
	<circle
		cx={size / 2}
		cy={size / 2}
		r={size / 2}
		fill="#264653"
		on:pointerdown={onMouseDown}
	/>
	{#each divisions as { weight: arc_size, lable }, i}
		{@const r = size / 2}
		{@const scale = divisions.reduce((a, b) => a + b.weight, 0)}
		{@const start =
			divisions.slice(0, i).reduce((a, b) => a + b.weight, 0) / scale}
		<circle
			pointer-events="none"
			fill="none"
			stroke="#{colors[
				i == divisions.length - 1 && i % colors.length == 0
					? 1
					: i % colors.length
			]}"
			stroke-width={size / 2 - 40}
			stroke-dasharray={(size * Math.PI) / 2}
			stroke-dashoffset={(Math.max(0, 1 - arc_size / scale) *
				size *
				Math.PI) /
				2}
			transform="rotate({angle + start * 360} {r} {r})"
			cx={r}
			cy={r}
			r={size / 4}
		/>
		<text
			class="text"
			x={r * 1.95 - 20}
			y={r}
			pointer-events="none"
			font-size={(8 / (8 + lable.length)) *
				Math.min(60, (1.5 * size * arc_size) / scale) *
				(size / 600)}
			text-anchor="end"
			dominant-baseline="middle"
			transform="rotate({angle +
				start * 360 +
				(360 * arc_size) / scale / 2} {r} {r})">{lable}</text
		>
		<circle
			pointer-events="none"
			cx={size - 10}
			cy={r}
			r={Math.max(1, 6 - divisions.length / 40)}
			transform="rotate({angle + start * 360} {r} {r})"
			fill="#4F91AB"
		/>
	{/each}
	<circle
		pointer-events="none"
		cx={size / 2}
		cy={size / 2}
		r={size / 12}
		fill="#4F91AB"
		stroke="#264653"
		stroke-width="16"
	/>
	<polygon
		pointer-events="none"
		fill="#4F91AB"
		stroke="#151515"
		stroke-width="3"
		stroke-linejoin="round"
		points="30,-30 8,8 -8,-8"
		transform="translate({size / 2 - 0.268 * size * Math.sqrt(2)}
			{size / 2 + 0.268 * size * Math.sqrt(2)}) rotate({triangle_angle} 5 -5)"
	/>
</svg>

<style>
	.text {
		white-space: pre;
		font-family: "Space Mono";
		user-select: none;
	}
</style>
