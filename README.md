## Adonis Project Setup

Run 'npm install' to install project dependencies.

This project requires PostgreSQL in order to work properly. Install PostgreSQL together with pgAdmin and then setup your PostgreSQL server. Afterwards, update .env file with your connection details.

Run 'node ace migration:run' to create all the necessary tables.

Run 'node ace serve --watch'. Adonis server should now be running on localhost:3333.


## Nuxt Project Setup

Run 'npm install' to install project dependencies.

In the project folder, locate default.vue file (.nuxt/layouts/default.vue). Change the content of the file to:
```bash
<template>
  <div>
    <Nav/>
    <Nuxt />
  </div>
</template>
```

Run 'npm run dev'. Nuxt app should now be running on localhost:3000.