<script lang="ts">
    import { browser } from "$app/environment";
    import ItemList from "./ItemList.svelte";
    import Wheel from "./Wheel.svelte";

    if (browser) {
        addEventListener("contextmenu", (event) => event.preventDefault());
    }
    
</script>

<div class="wheel_layout">
    <ItemList />
    <Wheel />
</div>

<style>
    :global(html),
    :global(body) {
        width: 100%;
        height: 100%;
        background-color: #625a75;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
		overscroll-behavior: contain;
    }

    .wheel_layout {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        gap: min(5vw, 100px);
        padding: 10px;
    }

    @media (max-width: 1000px) {
        .wheel_layout {
            flex-direction: column !important;
            gap: min(5vh, 100px);
        }
    }
    /* width */
    :global(::-webkit-scrollbar) {
        width: 5px;
    }

    /* Track */
    :global(::-webkit-scrollbar-track) {
        background: none;
        border-radius: 1px;
    }

    /* Handle */
    :global(::-webkit-scrollbar-thumb) {
        background: rgb(48, 48, 48);
        border-radius: 1px;
    }

    /* Handle on hover */
    :global(::-webkit-scrollbar-thumb:hover) {
        background: rgb(34, 34, 34);
    }
</style>
