import gql from 'graphql-tag';

export const COLLECTION_TOTALS = gql`

    {

        colors: totalElements(collection: "colors")
        posts: totalElements(collection: "posts")
        products: totalElements(collection: "products")
        tags: totalElements(collection: "tags")
        tallas: totalElements(collection: "tallas")
        users:totalElements(collection: "users")
          
    }
    `;





