# Proyecto Final Ecommerce_Coder

### Info 
.post(/info)
Esta ruta me trae un JSON con toda la informacion del servidor

### Images SOLO SI ES ADMIN
.post(/api/images)
Con esta ruta enviamos por body, {key = miFoto , Value= select file}. Las fotos se descargaran en la carpeta upload. 


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
En el campo imagen cargar el nombre de la foto que se subio anteriormente. 


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
Con esta ruta creamos un carrito al usuario y le cargamos un producto. 

.detele(/api/shoppingcartproducts/:id)
Con esta ruta se pasa por :id = el id del carrito y por body se pasa el producto a eliminar.

.get(/api/shoppingcartproducts/:id)
Esta ruta encuentra un carrito segun el ID 

.get(/api/shoppingcartproducts/) SOLO SI ES ADMIN
Esta ruta encuentra todos los carritos de la base de datos.

### Api Orders

.post(/api/orders/:id)
Con esta ruta cerramos la order y vaciamos el carrito

.get(/api/orders)
Con esta ruta obtenemos la ultima orden del usuario. 




