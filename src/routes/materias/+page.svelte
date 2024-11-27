<script>
	import Typeahead from "svelte-typeahead";
    import { writable } from 'svelte/store';

    export let data;

    let materia = writable({
        nombre: '',
        alumnos: []
    });

    function agregarAlumno() {
        materia.update(s => {
            s.alumnos.push({ nombre: '', apellido: '', edad: '' });
            return s;
        });
    }

    function quitarAlumno(index) {
        materia.update(s => {
            s.alumnos.splice(index, 1);
            return s;
        });
    }

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

<form class="materia-form" method="POST" action="?/create"> 
    <label>
        Nombre:
        <input
            name="nombre"
            type="text"
            bind:value={$materia.nombre}
            autocomplete="off"
        />
    </label>
    
    <div>
        <input type="hidden" name="alumnos" value={JSON.stringify($materia.alumnos)} />
        <h3>Estudiantes:</h3>
        {#each $materia.alumnos as alumno, index}
            <fieldset>
                <legend>Alumno {index + 1}</legend>
                <Typeahead
                    label="Seleccionar alumno"
                    placeholder={`Buscar alumno por nombre`}
                    data={data.alumnos}
                    extract={(alumno) => `${alumno.nombre} ${alumno.apellido}`}
                    on:select={({ detail }) => alumno = detail.original}
                    inputAfterSelect='clear'
                />
                <div>
                    <label for="student-name-{index}">Nombre:</label>
                    <input
                        id="student-name-{index}"
                        type="text"
                        bind:value={alumno.nombre}
                        required
                        readonly
                    />
                </div>
                <div>
                    <label for="student-surname-{index}">Apellido:</label>
                    <input
                        id="student-surname-{index}"
                        type="text"
                        bind:value={alumno.apellido}
                        required
                        readonly
                    />
                </div>
                <div>
                    <label for="student-edad-{index}">Edad:</label>
                    <input
                        id="student-edad-{index}"
                        type="number"
                        bind:value={alumno.edad}
                        required
                    />
                </div>
                <button type="button" on:click={() => quitarAlumno(index)}>
                    Quitar Alumno
                </button>
            </fieldset>
        {/each}
    </div>

    <button type="button" on:click={agregarAlumno}>
        Agregar Alumno
    </button>

    <button type="submit">Confirmar</button>
</form>

<style>
    tr {
        text-align: center;
    }
    form {
        max-width: 500px;
        margin: auto;
    }
    fieldset {
        border: 1px solid #ccc;
        padding: 1em;
        margin-bottom: 1em;
    }
    button {
        margin-top: 1em;
        width: 100px;
    }
    .materia-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>