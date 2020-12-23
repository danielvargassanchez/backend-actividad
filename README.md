##base de datos postgres y hay un archivo sql dentro de la carpeta database para crear la estructura e insertar algunos datos

##iniciar con npm run dev

## end points

## (listado de todos los productos)

##localhost:4000/products - (metodo get)

## mostrar un solo producto

##localhost:4000/products/showproduct/:product_id (metodo get espera entero)

## filtrar productos con un valor maximo

##localhost:4000/filterbymaxprice/:maxprice (get - espera entero)

## filtrar productos con un valor minimo

##localhost:4000/filterbyminprice/:minprice (get - espera entero)

## filtrar productos por nombre, que contengan la cadena insertada clausula iLike

##localhost:4000/filterbyname/:name (get -espera string)

## agregar al carrito un producto

##localhost:4000/addtocart (post- - espera body { product_id: entero, quantity : entero})

## eliminar un producto del carrito

##localhost:4000/deleteitemcar/:product_id (delete- espera entero)

## obtener listado de todos los productos de mi carrito

##localhost:4000/getmycart (get)

## pagar los productos del carrito

##localhost:4000/payproducts/:product_id (put)
