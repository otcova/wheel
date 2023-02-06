import { browser } from "$app/environment";
import { writable } from "svelte/store";

export interface WheelItem {
	lable: string,
	weight: number,
}

let initialItems = [
	{ lable: "Example 1", weight: 10 },
	{ lable: "Example 2", weight: 10 },
	{ lable: "Example 3", weight: 10 },
];

if (browser) {
	try {
		initialItems = JSON.parse("" + localStorage.getItem("items")) ?? initialItems;
	} catch (_) {
		localStorage.removeItem("items");
	}
}

export const items = writable<WheelItem[]>(initialItems);

items.subscribe(value => {
	if (browser) localStorage.setItem("items", JSON.stringify(value));
});

