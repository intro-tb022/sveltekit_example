<script>
    import { onDestroy, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let { data, placeholder, endpoint, minQueryLength = 2, debounceTime = 300 } = $props();

    let query = $state('');
    let results = $state([]);
    let showDropdown = $state(false);
    let timeout;

    function onInput() {
        clearTimeout(timeout);
        if (query.length < minQueryLength) {
            results = [];
            showDropdown = false;
            return;
        }
        timeout = setTimeout(fetchResults, debounceTime);
    }

    async function fetchResults() {
        let url = new URL(endpoint)
        let params = { nombre: query }
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            error(response.status, response);
        }

        results = await response.json()
        showDropdown = results.length > 0;
    }

    function selectResult(result) {
        query = '';
        showDropdown = false;
        dispatch('select', { result });
    }

    function handleBlur() {
        setTimeout(() => showDropdown = false, 150);
    }

    onDestroy(() => clearTimeout(timeout));
</script>

<div class="typeahead-container">
    <input
        class="typeahead-input"
        type="text"
        bind:value={query}
        oninput={onInput}
        onblur={handleBlur}
        placeholder={placeholder}
        autocomplete="off"
    />
    
    {#if showDropdown}
        <div class="dropdown">
            {#each results as result}
                <div class="dropdown-item" role="button" tabindex="0" onmousedown={() => selectResult(result)}>
                    {result.nombre}, {result.apellido}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .typeahead-container {
        position: relative;
        width: 300px;
    }
  
    .typeahead-input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
  
    .dropdown {
        position: absolute;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 4px 4px;
        background: white;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  
    .dropdown-item {
        padding: 8px;
        cursor: pointer;
        transition: background 0.2s;
    }
  
    .dropdown-item:hover {
         background: #f5f5f5;
    }
  
    .dropdown-item:active {
        background: #eee;
    }
  </style>
