<script>
    import '../table-styles.css';
    import Pagination from '$lib/components/Pagination.svelte';

    let { data } = $props();
</script>

<h1>Ésta es la página de alumnos</h1>
<Pagination 
    currentPage={data.currentPage}
    pageSize={data.pageSize}
    hasMore={data.hasMore}
/>
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
