
# INFO STORE 3.0
Tienda Informatica

## Descripcion
Proyecto realizado en React + Vite, que es una herramienta de compilación que proporciona una experiencia de desarrollo más rápida y ágil. PArtiendo de un template vacio (Blank).
El proyecto se desarrollo para obtener datos de productos desde FireStore, hacer persistir la compra en el LocalStore y guardar la orden tambien en FireStore. 

## Estructura General
El sitio cuenta con 4 paginas principales:
- Home (Inicio)
- Productos
- Contactos
- Carrito


## Documentacion
Se utilizo React Vite para la confeccion del proyecto

Se agregaron las siguientes dependencias:
- firebase 10.12.5
- react 18.3.1
- react-router-dom 6.25.1
- sweetalert2 11.12.4
- validator ^13.12.0
        
En la ultima version se dejo de utilizar 
- sweetalert 2.1.2
           

## Versiones
- 1.0 Landing Page
- 2.0 Proyecto de carrito de compra con uso de LocalStore, manejo de props, modales
- 3.0 Proyecto Funcional con uso de context, validacion de datos de formulario, persistencia de datos por LocalStore, actualizacion de modales y uso de FireStore


## Uso
Se debe seleccionar la cantidad de productos que se quiere comprar, en caso de ser mayor a uno, sino solamente se selecciona agregar al carrito y suma un producto del elegido, si se quiere obtener mayor información se puede hacer clic en ver detalles y nos lleva a una página con mayor descripción del producto, desde ahí también se puede agregar un producto al carrito. Una vez seleccionados todos los ítems que se desea comprar, se hace clic en el icono del carrito en la parte superior derecha, que tiene el numero toda de los productos agregados y nos lleva a la página de compra. Ahí se puede ajustar la cantidad de algún producto apretando en el ítem -1, si llega a 0 desaparece del carrito. Cuando tenemos la cantidad deseada solo resta hacer clic en finalizar compra para que una vez completados los datos de nombre mail y teléfono, genera la orden y muestra el aviso de que salió todo bien. 


## Screenshots
- https://landing-albarracin.vercel.app/screen/1.png
- https://landing-albarracin.vercel.app/screen/2.png
- https://landing-albarracin.vercel.app/screen/3.png
- https://landing-albarracin.vercel.app/screen/4.png
- https://landing-albarracin.vercel.app/screen/5.png
- https://landing-albarracin.vercel.app/screen/6.png


## Instalacion
Para poder ejecutar el proyecto de forma local primero se debe obtener el repositorio con 
```bash
git clone https://github.com/CristianAlbarracinCurso/LandingAlbarracin.git
```
depues instalar npm y ejecutar
```bash
  npm install
  npm run dev
```
## Agradecimientos
A los profes y tutores de Coder
- [Profesor] Lucas Gabriel Ruiz
- [Tutor] Federico Currao