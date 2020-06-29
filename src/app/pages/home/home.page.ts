import { Component, OnInit } from '@angular/core';
import { Slides } from 'src/app/components/ofers-slides/Interface/slides';
import { MenuService } from 'src/app/components/menu/services/menu.service';
import { take } from 'rxjs/operators';
import { AvatarSlides } from 'src/app/components/avatar-slides/Interface/avatar-slides';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { Product, Brand } from 'src/app/interfaces/product';
import { BrandsService } from 'src/app/modules/brands/services/brands.service';
import { CarouselService } from 'src/app/components/banner-slides/services/carousel.service';
import { ImagesSlide } from 'src/app/components/banner-slides/interfaces/carousel';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  itemAvatarSlides: AvatarSlides[];
  productsPopular: Product[];
  brands: Brand[];
  productsPromocion: Product[];
  banner_slides: ImagesSlide[];

  constructor(
    private menuServices : MenuService,
    private _productService: ProductService,
    private _brandService: BrandsService,
    private carouselService: CarouselService
  ) { }




  ngOnInit() {
    this.getBannerImages()
    this.itemsSlideCategories()
    this.getProducts()
    this.itemsSlideBrands()
  }

  getBannerImages(){

    this.carouselService.carouselActive().subscribe(
      res=> this.banner_slides = res.images
    )
  }


  itemsSlideCategories(){
    this.menuServices.categories().pipe(take(1)).subscribe(res=>{ 
      const avatar_slides = res
      this.itemAvatarSlides = avatar_slides.map( v => {
        return {id:v.id, title:v.name, src_image: `${environment.urlFiles}images/icons-app/${v.slug}.svg`}
      })

      
      // console.log(this.itemAvatarSlides);
      
    })
  }


  ////Products
  getProducts(){
    this._productService.getProducts()
    .subscribe(
      (product: Product[]) => {
   
        this.productsPromocion = product.filter(
          x => x.category.id === 13
        )
        // this.productsPopular = product.sort((a, b)=>{ return a.visits - b.visits})
        this.productsPopular = product.splice(0,10);

        // console.log(this.productsPromocion);
        
      }
    )
  }
  configSlide = {
    slidesPerView: 1.2,
    spaceBetween: 5,
    // centeredSlides: false,
    pagination: false
  }



  /////Slide Brands
  itemsSlideBrands(){
    this._brandService.getBrands()
    .pipe(take(1))
    .subscribe(
      (res:any) => {
        this.brands = res.filter(x => x.destaca === 1)
      }
    )
     
  }
  
  configSlideBrand = {
    slidesPerView: 3.5,
    spaceBetween: 10,
    // centeredSlides: false,
    pagination: false
  }
}
