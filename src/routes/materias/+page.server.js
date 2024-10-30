export async function load() {
    let url = new URL('http://localhost:8000/materias/')
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    let materias = await response.json();

    return {
        materias: materias
    };
}

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();


        let url = new URL('http://localhost:8000/materias/')
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({nombre: data.get("nombre")})
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    },
}