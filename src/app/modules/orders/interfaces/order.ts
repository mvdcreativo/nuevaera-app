import { Product } from 'src/app/interfaces/product';

export interface Order {
    id?:number;
    user_id?:number;
    name:string;
    lastname:string;
    ci?:string;
    company?: string;
    rut?: string;
    address?: string;
    city?: string;
    state?: string;
    email: string;
    phone?: string;
    productos: Product[];
    status_id?:number;
    status: Status;
    payment_method_id?:number;
    url_pdf?:string;
    talon_cobro?:string;
    total?:number;
    created_at?:string


}

export interface ProductOrder {
    quantity:number;
    product: Product
}

export interface Status{
    id:number;
    name?:string;
    code?:string;
}