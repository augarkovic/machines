## Adonis Project Setup

Run 'npm install' to install project dependencies.

This project requires PostgreSQL in order to work properly. Install PostgreSQL together with pgAdmin and then setup your PostgreSQL server. Afterwards, create .env file in the project's root folder. Copy the content of .env.example file and update it with your connection details.

Run 'node ace migration:run' to create all the necessary tables.

Run 'node ace serve --watch'. Adonis server should now be running on localhost:3333.


## Nuxt Project Setup

Run 'npm install' to install project dependencies.

Run 'npm run dev'. Nuxt app should now be running on localhost:3000. Open the application in your browser.

In the project folder, locate default.vue file (.nuxt/layouts/default.vue). Change the content of the file to:
```bash
<template>
  <div>
    <Nav/>
    <Nuxt />
  </div>
</template>
```
This will add the navigation bar to the template.