export interface Carousel {
    id?: number;
    name:string;
    images: ImagesSlide[]
    platform:string,
    status: boolean;
}
export interface ImagesSlide {
    id?:number;
    title:string;
    subtitle: string;
    url:string
    status:string;
    position?:number
}
