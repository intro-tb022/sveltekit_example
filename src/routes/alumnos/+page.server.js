import { error } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';

export async function load() {
    let url = new URL(`${PUBLIC_API_URL}/alumnos/`)
    const response = await fetch(url);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
 
    let alumnos = await response.json();
 
    return {
        alumnos: alumnos
    };
 }
 