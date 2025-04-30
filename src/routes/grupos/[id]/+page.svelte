<script>
    import Typeahead from '$lib/components/Typeahead.svelte';

    import '../../table-styles.css';
    import '../../button-styles.css';

    let { data, form } = $props();

    let padron = $state(0)

    function handleSelect(event) {
        padron = event.detail.result.padron;
    }
</script>
 
<h1>{data.grupo.nombre}</h1>
<h2>Integrantes</h2>
<table>
    <tbody>
        {#each data.grupo.integrantes as integrante}
            <tr>
                <td width=20%>
                    {integrante.alumno.padron}
                </td>
                <td width=40%>
                    <span>{integrante.alumno.nombre} {integrante.alumno.apellido}</span>
                </td>
                <td width=20%>
                    <form method="POST" action="?/poner_nota">
                        <input type="hidden" name="padron" value={integrante.alumno.padron} />
                        <input type="hidden" name="id" value={data.grupo.id} />
                        <input type="number" name="nota" value={integrante.nota} min="1" max="10" required />
                        <button type="submit"> {integrante.nota ? "Cambiar Nota" : "Poner Nota"}</button>
                    </form>
                </td>
                <td width=20%>
                    <form method="POST" action="?/desinscribir">
                        <input type="hidden" name="padron" value={integrante.alumno.padron} />
                        <input type="hidden" name="id" value={data.grupo.id} />
                        <button>Desinscribir</button>
                    </form>
                </td>
            </tr>
        {/each}
    </tbody>
</table>

{#if data.grupo.integrantes.length < 4}
    <h2>Inscribir Alumno</h2>
    <form method="POST" action="?/inscribir">
        <input type="hidden" name="id" value={data.grupo.id} />
        <Typeahead
            endpoint="http://localhost:8000/alumnos/"
            placeholder="Elegir alumno..."
            on:select={handleSelect}
        />
        <input hidden=true type="number" id="padron" name="padron" min="1" bind:value={padron} />
        <button type="submit">Inscribir</button>
    </form>

    {#if form?.message}
        <div class="success">{form.message}</div>
    {/if}
{/if}
