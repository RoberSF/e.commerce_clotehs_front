export const PRODUCTS_PAGES_INFO = {
    'products/niños': {
        title: 'Niños',
        description: `En esta página encontraremos ropa dedicada a niños`,
        categorias: ['kids'],
        topPrice: -1,
    },
    'products/casualVerano': {
        title: 'Casual Verano',
        description: `En esta página encontrarás ropa al estilo casual para verano`,
        categorias: ['camisetas manga corta', 'camisetas de tirantes', 'polos'],
        topPrice: -1,
        },
    'products/casualInvierno': {
        title: 'Casual Invierno',
        description: `En esta página encontraremos ropa al estilo casual para invierno`,
        categorias: [],
        topPrice: -1,
        },
    'products/deBlanco': {
        title: 'De blanco',
        description: `En esta página encontrarás ropa de color blanco para combinar como más te guste`,
        categorias: [],
        topPrice: -1,
        },
    'products/trabajo': {
        title: 'Trabajo',
        description: `En esta página encontrarás ropa para uniformarte para el trabajo`,
        categorias: [],
        topPrice: -1,
        },
    'products/sport': {
        title: 'Sport',
        description: `En esta página encontrarás ropa para uniformarte para hacer deporte`,
        categorias: [],
        topPrice: 45,
        },
    'products/headwear': {
        title: 'HeadWear',
        description: `En esta página encontrarás complementos tanto para cuello como para cabeza`,
        categorias: [],
        topPrice: 45,
        },
    'products/accesorios': {
        title: 'Accesorios',
        description: `En esta página encontrarás complementos de todo tipo`,
        categorias: [],
        topPrice: 45,
        },
};

export enum TYPE_OPERATION {
    PRODUCTS = 'products',
    PROMOTION = 'promotion'
}
