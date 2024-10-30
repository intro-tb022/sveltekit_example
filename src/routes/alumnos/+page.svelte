<script>
    export let data;
</script>

<h1>Ésta es la página de alumnos</h1>

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
            <tr class="{alumno.padron % 2 == 0 ? 'zero' : 'one'}">
                <td>{alumno.padron}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellido}</td>
                <td>{alumno.edad}</td>
            </tr>
        {/each}
    </tbody>
</table>

<h2>Dar de alta alumno</h2>
<form method="POST" action="?/create">
   <label>
       Nombre:
       <input
           name="nombre"
           autocomplete="off"
       />
   </label>
   <label>
       Apellido:
       <input
           name="apellido"
           autocomplete="off"
       />
   </label>
   <label>
       Edad:
       <input
           name="edad"
           autocomplete="off"
       />
   </label>

   <button>Crear</button>
</form>

<style>
    tr {
        text-align: center;
    }
    .zero {
        background-color: rgb(172, 169, 169);
    }
    .one {
        background-color: white;
    }
</style>