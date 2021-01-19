# El ../ es para subir un nivel. Cada vez que hago ../ subo un nivel

# El bootstrap está importado en el style.scss, pero valdría cualquier opción de instalación. Por npm no es solo instalar y ya, hay que añadir al angular.json

# Alt para multicursor sin ratón

# En tsconfig tenemos configuración para la utilización de paths absolutos

# En el mismo tsconfig tenemos configurado para utilizar json en la app

# apollo-link-ws para conectarnos la info a tiempo real con la Api

# Trabajmos desde el constructor en checkout.ts
    En este caso trabajamos en el constructor con propiedades que hacen uso de observables.

    Si te fijas, estas propiedades tienen al final un símbolo de dólar "$" que por convención se usa para hacer que los usuarios lo identifiquen como un observable.

    Estos observables, cuando se crea el componente, se suscriben y se quedan a la escucha de cualquier evento que se notifique relacionado a esa información que está esperando, que puede que llegue o puede que no llegue. Podrías ponerlo en el ngOnInit mismo, pero yo durante el curso lo he hecho en el constructor para seguir una misma metodología y no hacer cosas muy diferentes. Quizás en algún punto inconscientemente lo haya hecho.



    En el sendData, pregunta si ese cliente existe en Stripe, y si existe, notifica (con una llamada y con ello hace uso del observable para hacer el pago dentro del constructor) que ya tenemos el token de la tarjeta:

    this.stripePayment.takeCardToken(true);

    La librería funciona así, de esa manera. Si el cliente existe, notifica mediante esa función que ya tenemos el token de la tarjeta y la usa para hacer el pago con la información que ya tenemos almacenada en el carrito de la compra.

    El usar en ngOnInit o constructor, al final es al gusto del consumidor y siempre que veas una propiedad con $ al final, ten en cuenta que va a ser una propiedad que va a recibir información y que usarás para escuchar cambios. Esa es la "norma" que se establece.