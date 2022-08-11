# Proyecto Final Ecommerce_Coder


### Register / Login

Cualquier usuario puede crear un cuenta, los requisitos son los siguientes:
*name
*lastname
*email
*password
*phone
*url

Una vez el usuario registrado, para loguearse va a el mail y la contraseña
*email
*constraseña

Por defecto el Admin de esta app es:
** "email":"admin@admin.com", "password": "1234" **

Una vez logueada la cuenta, se devolvera un JSON con el token que dura 3 dias activo. El mismo debe cargarse en el header para poder hacer cualquier peticion mas adelante. Key = token / value = Bearer (copiar token obtenido)

### Api Products

.post(/api/products/upload)
Con esta ruta podremos cargar la foto y guardarla en nuestro disco. Solo se puede realizar esta accion si se esta logueado como admin

.post(/api/products)
Con esta ruta podemos crear un nuevo producto. Solo nos dejara crear si se esta logueado
con la cuenta de admin y con el Bearer Token por header.
El producto debe tener estas caracteristicas:
*name
*descripcion
*price
*image

.put(/api/products/:id)
Con esta ruta podremos actualizar un producto ya existente pasando por parametro el Id del producto que vamos a modificar

.get(/api/products)
Esta ruta nos obtiene todos los productos en la base de datos, cualquier usuario puede obtener todos los productos mientras este logueado.

.get(/api/products/:id)
Esta ruta obtiene un producto por id, es necesario ser admin.

.delete(/api/products/:id)
Esta ruta borra un producto por su id.

### Api Cart

.post(/api/shoppingcartproducts/)
Con esta ruta creamos el carrito mientras estemos logeados

.put(/api/shoppingcartproducts/:id)
Insertamos productos al carrito enviando el id del carrito creado y el producto

.detele(/api/shoppingcartproducts/:id)
Borra el carrito solo si es adm

.get(/api/shoppingcartproducts/find/:id)
Esta ruta encuentra un carrito segun el ID 




