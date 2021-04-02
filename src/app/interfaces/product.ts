export class Product {
    id?: number;
    name?: string;
    name_concat?:string;
    slug?:string;
    price?: number;
    salePrice?: number;
    discount?: number;
    price_mayorista?: number;
    picture?: string;
    shortDetails?: string;
    description?: string;
    stock?: number;
    newPro?: boolean;
    brand?: Brand;
    sale?: boolean;
    category?: Category;
    brand_id?:number;
    category_id?:number;
    pictures?:string;
    visits?:number;
    pivot?: Pivot;
    status?: string;
}

export interface Category {
    id?:number;
    name:string;
    slug:string;
    description?:string;
    products?:any;
}

export interface Brand {
    id?:number;
    name:string;
    slug:string;
    destaca?:number;
    image_url:string;
    description?:string;
    products?:any;
}

export interface Pivot {
    order_id:number;
    price:number;
    product_id:number;
    quantity:number
}

export interface Paginate {
    current_page: number;
    data: any[];
    first_page_url: string;
    from?: any;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to?: any;
    total: number;
}