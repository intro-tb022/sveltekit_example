<script>
    export let data;
</script>

<h1>Ésta es la página de materias</h1>

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
        {#each data.materias as materia}
            <tr>
                <td><a href="/materias/{materia.id}">{materia.id}</a></td>
                <td><a href="/materias/{materia.id}">{materia.nombre}</a></td>
            </tr>
        {/each}
    </tbody>
</table>

<h2> Nueva Materia </h2>

<form method="POST" action="?/create">
    <label>
        Nombre:
        <input
            name="nombre"
            autocomplete="off"
        />
    </label>
</form>

<style>
    tr {
        text-align: center;
    }
</style>