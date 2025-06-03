import { error } from '@sveltejs/kit';

import { PUBLIC_API_URL } from '$env/static/public';

export async function load({ url }) {
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 20;
    const offset = page * pageSize;

    let apiUrl = new URL(`${PUBLIC_API_URL}/alumnos/`)
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());
    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
 
    const alumnos = await response.json();
    
    const hasMore = alumnos.length === pageSize;
 
    return {
        alumnos: alumnos,
        currentPage: page,
        pageSize: pageSize,
        hasMore: hasMore
    };
}
