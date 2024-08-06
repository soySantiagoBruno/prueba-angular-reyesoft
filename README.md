# PruebaAngularReyesoft

<img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExODE5M2NyZjNoZHVsM3dnZW9kb2d0bGlkMnY2bXY1cmFtcmozeTQydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BGIqWh2R1fi6JDa/giphy.webp" width="250px" height="187.5px" />


## Development server
Clonar repositorio `git clone https://github.com/soySantiagoBruno/prueba-angular-reyesoft.git`

Instalar npm con `npm install`

Ejecutar `ng serve` para un levantar el servidor de desarrollo. Navegar a `http://localhost:4200/`.


## Demo

[Firebase deploy](https://prueba-angular-reyesoft.web.app)

## Postman

[Peticiones utilizadas para consumir la API](https://documenter.getpostman.com/view/28664859/2sA3rzJCbR)


## Historias de usuario

- Como usuario, al ingresar al sitio en la ruta `/login`, debo poder ingresar mis datos en un formulario: email y contraseña. Estos datos se corroboran haciendo `POST https://api.saldo.com.ar/bridge/login`.

    Los valores correctos a enviar por POST son `email=admin@saldo.com.ar` y `password=CoolSite`
        Dará error el front-end o ingresará según corresponda.
- Como usuario, si ingreso a la ruta `/login` y ya estoy logueado, debo ser redirigido a `/systems`
- Como usuario, al ingresar a la ruta `/systems` debo poder ver todos los activos que puedo intercambiar en la plataforma saldo.com.ar
- Como usuario, si ingreso a la ruta `/systems` (o cualquier otra distinta a `/login`) y no me encuentro logueado, debo ser redirigido a la página `/login`.
- Como usuario, si ingreso a la ruta `/systems` (o cualquier otra distinta a `/login`) siempre mostrará mi nombre en la parte superior, además de un link a “cerrar sesión”.
- Como usuario, al hacer click en uno de los activos que puedo intercambiar en la plataforma, desea ver sus precios en relación a los demás pares (en vivo, tal cual lo devuelve la API de Saldoar). Esto puede ser en la misma página (/systems) o en otra ruta (por ejemplo, `/systems/:system_id`, en donde system_id es el identificador del activo seleccionado).
- Como usuario, si estoy viendo los precios de un activo específico, deseo poder colapsar o volver a la lista de activos (dependiendo de la implementación por la que se haya optado, sea en la misma página o en una nueva)
- Como usuario, deseo poder desloguearme de la plataforma, siendo redirigido a la página de `/login`.
- Como usuario, al ingresar en cualquier ruta que no esté definida, deseo ser redirigido a `/systems` o `/login`, dependiendo de mi estado de autenticación.

## Tech Stack

**Client:** Angular 18, Bootstrap 5.3

