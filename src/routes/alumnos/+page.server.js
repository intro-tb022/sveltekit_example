import { error } from '@sveltejs/kit';

export async function load() {
    let url = new URL('http://localhost:8000/alumnos/')
    const response = await fetch(url);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
 
    let alumnos = await response.json();
 
    return {
        alumnos: alumnos
    };
 }
 