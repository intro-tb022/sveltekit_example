<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    let { query, placeholder } = $props();

    function buscar() {
        const url = new URL($page.url);
        url.searchParams.set("nombre", query);
        url.searchParams.set("page", 0);
        goto(url.toString());
    }

    function limpiar() {
        const url = new URL($page.url);
        url.searchParams.delete("nombre");
        url.searchParams.set("page", 0);
        goto(url.toString());
    }

    function handleKeydown(event) {
        if (event.key === "Escape") limpiar();
        if (event.key === "Enter") buscar();
    }
</script>

<div>
    <input
        type="text"
        bind:value={query}
        {placeholder}
        autocomplete="off"
        onkeydown={handleKeydown}
    />
    <button onclick={buscar}>Buscar</button>
    <button onclick={limpiar}>Limpiar Búsqueda</button>
</div>

<style>
    input {
        width: 100%;
        max-width: 200px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
    button {
        background-color: rgba(51, 51, 51, 0.05);
        border-radius: 8px;
        border-width: 0;
        color: #333333;
        cursor: pointer;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
        padding: 10px 12px;
        text-align: center;
    }
</style>
