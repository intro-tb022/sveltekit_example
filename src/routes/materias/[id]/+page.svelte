<script>
	import Typeahead from "svelte-typeahead";

	let { data } = $props();

	let estado = $state({alumno: null});
</script>

<h1>Materia {data.materia.nombre}</h1>

<Typeahead
	label="Preseleccionar alumno"
  	placeholder={`Buscar alumno por nombre`}
  	data={data.alumnos}
  	extract={(alumno) => `${alumno.nombre} ${alumno.apellido}`}
	on:select={({ detail }) => estado.alumno = detail.original}
	inputAfterSelect='clear'
/>

{#if estado.alumno}
	<form method="POST" action="?/inscribir">
		<input type="hidden" name="padron" value={alumnoPre.padron} />
		<input type="hidden" name="id" value={data.materia.id} />
		<span>{alumnoPre.nombre} {alumnoPre.apellido}</span>
		<button>Inscribir</button>
	</form>
{/if}

<h2>Alumnos Inscriptos</h2>
<table>
    <tbody>
		{#each data.materia.alumnos as alumno (alumno.padron)}
			<tr>
				<td>
					{alumno.padron}
				</td>
				<td>
					<form method="POST" action="?/desinscribir">
						<input type="hidden" name="padron" value={alumno.padron} />
						<input type="hidden" name="id" value={data.materia.id} />
						<span>{alumno.nombre} {alumno.apellido}</span>
						<button>Desinscribir</button>
					</form>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
