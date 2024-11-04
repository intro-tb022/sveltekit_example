import { error } from '@sveltejs/kit';

export async function load({ params }) {
    let materiaUrl = new URL(`http://localhost:8000/materias/${params.id}`)
    const materiaResp = await fetch(materiaUrl);
    if (!materiaResp.ok) {
        error(materiaResp.status)
    }

    let alumnosUrl = new URL(`http://localhost:8000/alumnos/`)
    const alumnosResp = await fetch(alumnosUrl);
    if (!alumnosResp.ok) {
        error(alumnosResp.status)
    }

    let materia = await materiaResp.json();
    let alumnos = await alumnosResp.json();

    return {
        materia,
        alumnos
    };
}

export const actions = {
    desinscribir: async ({ request }) => {
        const data = await request.formData();


        let url = new URL(`http://localhost:8000/materias/${data.get('id')}/desinscribir_alumno/`)
        let params = { padron: data.get('padron') }
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            error(response.status, 'Algo falló');
        }
    },
    inscribir: async ({ request }) => {
        const data = await request.formData();

        let url = new URL(`http://localhost:8000/materias/${data.get('id')}/inscribir_alumno/`)
        let params = { padron: data.get('padron') }
        url.search = new URLSearchParams(params).toString();

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            error(response.status, 'Algo falló');
        }
    },
}
