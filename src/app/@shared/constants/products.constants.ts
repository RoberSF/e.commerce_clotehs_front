export const PRODUCTS_PAGES_INFO = {
    'products/niños': {
        title: 'Niños',
        description: `En esta página encontraremos ropa dedicada a niños`,
        categoriasId: ['1'],
        topPrice: -1,
    },
    'products/casualVerano': {
        title: 'Casual Verano',
        description: `En esta página encontrarás ropa al estilo casual para verano`,
        categoriasId: ['2','3','4'],
        topPrice: -1,
        },
    'products/casualInvierno': {
        title: 'Casual Invierno',
        description: `En esta página encontraremos ropa al estilo casual para invierno`,
        categoriasId: ['5','6','7','8','9'],
        topPrice: -1,
        },
    'products/deBlanco': {
        title: 'De blanco',
        description: `En esta página encontrarás ropa de color blanco para combinar como más te guste`,
        categoriasId: ['10','11'],
        topPrice: -1,
        },
    'products/trabajo': {
        title: 'Trabajo',
        description: `En esta página encontrarás ropa para uniformarte para el trabajo`,
        categoriasId: ['12','13','14','15','16','17'],
        topPrice: -1,
        },
    'products/sport': {
        title: 'Sport',
        description: `En esta página encontrarás ropa para uniformarte para hacer deporte`,
        categoriasId: ['18','19'],
        topPrice: 45,
        },
    'products/headwear': {
        title: 'HeadWear',
        description: `En esta página encontrarás complementos tanto para cuello como para cabeza`,
        categoriasId: ['20','21'],
        topPrice: 45,
        },
    'products/accesorios': {
        title: 'Accesorios',
        description: `En esta página encontrarás complementos de todo tipo`,
        categoriasId: ['22','23','24'],
        topPrice: 45,
        },
};

export enum TYPE_OPERATION {
    PRODUCTS = 'products',
    PROMOTION = 'promotion'
}

export const CATEGORIAS = [
    {
       name: 'Niños',
       value: '1'
    },
    {
       name: 'Camisetas manga corta',
       value: '2'
    },
    {
       name: 'Camisetas de tirantes',
       value: '3'
    },
    {
       name: 'Polos',
       value: '4'
    },
    {
       name: 'Camisetas y polos M/L',
       value: '5'
    },
    {
       name: 'Chaquetas y sudaderas',
       value: '6'
    },
    {
       name: 'Polares',
       value: '7'
    },
    {
       name: 'Ropa de abrigo',
       value: '8'
    },
    {
       name: 'Chubasqueros y cortavientos',
       value: '9'
    },
    {
       name: 'Camisetas interiores',
       value: '10'
    },
    {
       name: 'Calcetines',
       value: '11'
    },
    {
       name: 'Ropa técnica',
       value: '12'
    },
    {
       name: 'Fútbol',
       value: '13'
    },
    {
       name: 'Pantalones deportivos',
       value: '14'
    },
    {
       name: 'Hight tech',
       value: '15'
    },
    {
       name: 'Chandals',
       value: '16'
    },
    {
       name: 'Bañadores',
       value: '17'
    },
    {
       name: 'Alta visibilidad',
       value: '18'
    },
    {
       name: 'Uniformidad',
       value: '19'
    },
    {
       name: 'Accesorios para cuello',
       value: '20'
    },
    {
       name: 'Gorras',
       value: '21'
    },
    {
       name: 'Accesorios y complementos',
       value: '22'
    },
    {
       name: 'Bolsas',
       value: '23'
    },
    {
       name: 'Bolsas non women',
       value: '24'
    },
]
