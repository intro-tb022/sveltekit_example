import { error } from '@sveltejs/kit';

export async function load({ params }) {
   let url = new URL(`http://localhost:8000/grupos/${params.id}`)
   const response = await fetch(url);
   if (!response.ok) {
       error(response.status, "No se pudo cargar el grupo")
   }

   let grupo = await response.json();

   return {
       grupo
   };
}

export const actions = {
    desinscribir: async ({ request }) => {
        const data = await request.formData();
 
        let url = new URL(`http://localhost:8000/grupos/${data.get('id')}/integrantes/${data.get('padron')}`)
 
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            error(response.status, 'No se pudo inscribir al alumno');
        }
    },
    poner_nota: async ({ request }) => {
        const data = await request.formData();
 
        let url = new URL(`http://localhost:8000/integrantes/${data.get('id')}/${data.get('padron')}/poner_nota`)
        let params = { nota: data.get('nota') }
        url.search = new URLSearchParams(params).toString();
 
        const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            error(response.status, "No se pudo poner la nota");
        }
    },
    inscribir: async ({ request }) => {
        const data = await request.formData();
 
        let url = new URL(`http://localhost:8000/grupos/${data.get('id')}/integrantes`)
 
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({padron: data.get("padron")})
        });
        if (!response.ok) {
            error(response.status, response);
        }

        return { success: true, message: "Inscripción exitosa"}
    },
 }
 