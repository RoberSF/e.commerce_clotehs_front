
export interface IPayment {
    amount: string | number;
    description: string;
    customer: string;
    token?: string;
    currency: string
};
export interface ItemPaypal {
    name: string,
    quantity: string,
    description: string,
    unit_amount: Array<string> 
};