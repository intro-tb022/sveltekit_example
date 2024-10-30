import { error } from '@sveltejs/kit';

export async function load({ params }) {
    let url = new URL(`http://localhost:8000/materias/${params.id}`)
    const response = await fetch(url);
    if (!response.ok) {
        error(response.status)
    }

    let materia = await response.json();

    return {
        materia
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
}
