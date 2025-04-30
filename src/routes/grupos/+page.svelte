<script>
    import Typeahead from '$lib/components/Typeahead.svelte';

    import '../table-styles.css';
    import '../button-styles.css';

    let { data } = $props();

    let grupo = $state({
        nombre: '',
        integrantes: [],
    })

    function agregarIntegrante() {
        grupo.integrantes.push({ nombre: '', apellido: '', edad: '' });
    }

    function quitarIntegrante(index) {
        grupo.integrantes.splice(index, 1);
    }
</script>

<h1>Ésta es la página de grupos</h1>

<table>
    <thead>
        <tr>
            <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
        {#each data.grupos as grupo}
            <tr>
                <td><a href="/grupos/{grupo.id}"> {grupo.nombre} </a></td>
            </tr>
        {/each}
    </tbody>
</table>

<h2> Nuevo Grupo </h2>

<form class="grupo-form" method="POST" action="?/create">
    <label>
        Nombre:
        <input
            name="nombre"
            autocomplete="off"
        />
    </label>

    <div>
        <input type="hidden" name="integrantes" value={JSON.stringify(grupo.integrantes)} />
        <h3>Integrantes:</h3>
        {#each grupo.integrantes as integrante, index}
            <fieldset>
                <legend>Alumno {index + 1}</legend>
                <Typeahead
                    endpoint="http://localhost:8000/alumnos/"
                    placeholder="Elegir alumno..."
                    on:select={(event) => { grupo.integrantes[index] = event.detail.result}}
                />
                <div>
                    <label for="student-name-{index}">Nombre:</label>
                    <input
                        id="student-name-{index}"
                        type="text"
                        bind:value={grupo.integrantes[index].nombre}
                        required
                        readonly
                    />
                </div>
                <div>
                    <label for="student-surname-{index}">Apellido:</label>
                    <input
                        id="student-surname-{index}"
                        type="text"
                        bind:value={grupo.integrantes[index].apellido}
                        required
                        readonly
                    />
                </div>
                <div>
                    <label for="student-padron-{index}">Padrón:</label>
                    <input
                        id="student-padron-{index}"
                        type="text"
                        bind:value={grupo.integrantes[index].padron}
                        required
                        readonly
                    />
                </div>
                <div>
                    <label for="student-nota-{index}">Nota:</label>
                    <input
                        id="student-nota-{index}"
                        type="number"
                        bind:value={grupo.integrantes[index].nota}
                        min=1
                        max=10
                        required
                    />
                </div>
                <button type="button" onclick={() => quitarIntegrante(index)}>
                    Quitar Alumno
                </button>
            </fieldset>
        {/each}
    </div>

    <button type="button" onclick={agregarIntegrante}>
        Agregar Integrante
    </button>

    <button type="submit">Confirmar</button>
</form>

<style>
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
    .grupo-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
