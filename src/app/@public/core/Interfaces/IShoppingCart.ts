import { IProduct } from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";

export interface IShoppingCart {
    total: number,
    subtotal: number,
    products: Array<IProduct>,
};