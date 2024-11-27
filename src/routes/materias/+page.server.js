export async function load() {
    let url = new URL('http://localhost:8000/materias/')
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    let alumnosUrl = new URL(`http://localhost:8000/alumnos/`)
    const alumnosResp = await fetch(alumnosUrl);
    if (!alumnosResp.ok) {
        error(alumnosResp.status)
    }

    let materias = await response.json();
    let alumnos = await alumnosResp.json();

    return {
        materias: materias,
        alumnos: alumnos,
    };
}

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();

        const nombre = data.get('nombre');
        const alumnos = JSON.parse(data.get('alumnos') || '[]');

        const payload = { nombre, alumnos };


        let url = new URL('http://localhost:8000/materias/')
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    },
}