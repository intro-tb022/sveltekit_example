import { error } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ url }) {
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    const nombre = url.searchParams.get('nombre') || '';
    const offset = page * pageSize;

    let apiUrl = new URL(`${PUBLIC_API_URL}/alumnos/`)
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());
    if (nombre != '') {
        apiUrl.searchParams.set('nombre', nombre);
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }

    const alumnos = await response.json();

    const lastPage = alumnos.length != pageSize;

    return {
        alumnos,
        page,
        pageSize,
        lastPage,
        nombre,
    };
}
