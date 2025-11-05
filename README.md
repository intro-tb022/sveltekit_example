# SvelteKit example

Este repositorio es simplemente un ejemplo del uso de SvelteKit para Introducción al Desarrollo de Software TB022 curso Esteban.

Acá tenemos un Frontend que se integra al Backend de nuestro FastAPI example branch `sql-model-with-relations`.
Por lo que deberían tener ese BE corriendo localmente para que este FE pueda consumirlo.

Luego de obtener la URL en la que está hosteado el BE, correr el FE de la siguiente manera:
```
PUBLIC_API_URL=<url del backend> npm run dev

    (donde <url del backend> seguramente sea http://127.0.0.1:8000)
```

--------------------------

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
