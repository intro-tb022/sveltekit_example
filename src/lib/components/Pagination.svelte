<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    let { currentPage = 0, pageSize = 20, hasMore = true } = $props();

    function goToPage(newPage) {
        const url = new URL($page.url);
        url.searchParams.set('page', newPage.toString());
        goto(url.toString());
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }

    function prevPage() {
        goToPage(currentPage - 1);
    }
</script>

<div class="pagination">
    {#if currentPage > 0}
        <button onclick={prevPage} class="pagination-btn">
            ← Anterior
        </button>
    {/if}
    
    <span class="page-info">
        Página {currentPage + 1}
    </span>
    
    {#if hasMore}
        <button onclick={nextPage} class="pagination-btn">
            Siguiente →
        </button>
    {/if}
</div>

<style>
    .pagination {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        justify-content: center;
    }

    .pagination-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        background: white;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .pagination-btn:hover {
        background-color: #f5f5f5;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-info {
        font-weight: 500;
        padding: 0 0.5rem;
    }
</style>
