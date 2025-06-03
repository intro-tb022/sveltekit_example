import { error } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';

export async function load() {
    let url = new URL(`${PUBLIC_API_URL}/grupos/`)
    const response = await fetch(url);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
 
    let grupos = await response.json();
 
    return {
        grupos: grupos
    };
 }
 

export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const nombre = data.get('nombre');
        const integrantes = JSON.parse(data.get('integrantes') || '[]');

        const payload = { nombre, integrantes };

        let url = new URL(`${PUBLIC_API_URL}/grupos/`)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            error(`Response status: ${response.status}`);
        }
    },
}
