import { Injectable } from '@angular/core';
import { Carousel, ImagesSlide } from '../interfaces/carousel';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  public carouselSubject$: BehaviorSubject<Carousel> = new BehaviorSubject<Carousel>(null);
  public carousel: Observable<Carousel>;
  public progressSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public progress: Observable<number>;

  constructor(
    private _http : HttpClient
  ) { 
    this.carousel = this.carouselSubject$.asObservable();
  }

  setCarousel(value){
    this.carouselSubject$.next(value)
  }

  getCarousels(): Observable<Carousel[]>{
    return this._http.get<Carousel[]>(`${environment.API}carousel`).pipe(
      take(1)
    )
  }

  addCarousel(data) {
    return this._http.post<Carousel>(`${environment.API}carousel`, data).pipe(
      take(1)
    ).subscribe(
      res=> {
        console.log(res);
        this.carouselSubject$.next(res);
        this.getCarousels()
      }
    )
  }

  deleteCarousel(id) {
    return this._http.delete<Carousel>(`${environment.API}carousel/${id}`).pipe(
      take(1)
    )
  }
  updateCarousel(id, data){
    return this._http.put<Carousel>(`${environment.API}carousel/${id}`, data).pipe(
      take(1)
    )
  }

  updateImage(data){
    data.map(
      d => this._http.put(`${environment.API}image/${d.id}`, d).pipe(take(1)).subscribe()
    )
  }

  uploadImage(id: number, files: FileList, index?: number) {

    const formData = new FormData();
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i])
      // formData.append("_method", "PUT")
    }

    formData.append("_method", "PUT")

    return this._http.post(`${environment.API}carousel/${id}`, formData, {
      observe: 'events',
      reportProgress: true
    }).subscribe( 
      (event: HttpEvent<Object>) => {

        // console.log(event);
        if (event.type === HttpEventType.Response) {
          console.log('Upload Concluído');
          console.log(event.body);
          const carousel: any = event.body
          this.carouselSubject$.next(carousel);
          
        } else if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((event.loaded * 100) / event.total);
          console.log('Progresso', percentDone);
          this.progressSubject$.next(percentDone)
        }
      }
    )
    }  

    removeImageId(imageID, id) {
      let httpParams = new HttpParams().set('image_id', imageID);
      let options = { params: httpParams };
      return this._http.delete<Carousel>(`${environment.API}carousel/${id}`,options).pipe(
        take(1)
      ).subscribe(
        res=> this.carouselSubject$.next(res)
        
      )
    }

    carouselActive(){
      const option = "APP"
      return this._http.get<Carousel>(`${environment.API}active-carousel?platform=${option}`).pipe(
        take(1)
      )
    }
}

