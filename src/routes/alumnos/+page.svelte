<script>
    import Pagination from "$lib/components/Pagination.svelte";
    import Search from "$lib/components/Search.svelte";

    import "../button-styles.css";
    import "../table-styles.css";

    let { data } = $props();
</script>

<h1>Ésta es la página de alumnos</h1>
<div class="row">
    <Search query={data.nombre} placeholder="Buscar por nombre..." />
    <Pagination
        currentPage={data.page}
        pageSize={data.pageSize}
        lastPage={data.lastPage}
    />
</div>
<table>
    <thead>
        <tr>
            <th>Padron</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
        </tr>
    </thead>
    <tbody>
        {#each data.alumnos as alumno}
            <tr>
                <td>{alumno.padron}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.edad}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .row {
        display: flex;
        justify-content: space-between;
        height: 50px;
        margin-bottom: 30px;
    }
</style>
