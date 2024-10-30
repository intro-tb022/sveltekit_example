<script>
	let { data } = $props();
</script>

<h1>Materia {data.materia.nombre}</h1>


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