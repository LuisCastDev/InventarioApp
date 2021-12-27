import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
 private URL_API: string = 'http://localhost/API/';
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  irA(url: string){
    this.router.navigateByUrl(url);
  }

    Producto_Listado(_texto:string =''){

    return this.http.post(this.URL_API + 'listar-producto',this.objectToFormData({
        texto: _texto
      }));

    }

    // Producto_Listado(texto){

    //   return this.http.post(this.URL_API + 'listar-producto',{texto});
  
    //   }
    // Producto_Eliminar(_id:number){

    //   return this.http.post(this.URL_API + 'eliminar-producto',{
    //       producto_id: _id 
    //     });
  
    //   }
    Producto_Eliminar(producto_id){

      return this.http.delete(this.URL_API + 'eliminar-producto/'+producto_id) 
        
  
      }



      objectToFormData(obj: any, form?: any, namespace?: any) {
        let fd: any = form || new FormData();
        let formKey: any;
        for (let property in obj) {
          if (obj.hasOwnProperty(property) && obj[property]) {
            if (namespace) {
              formKey = namespace + '[' + property + ']';
            } else {
              formKey = property;
            }
            if (obj[property] instanceof Date) {
              fd.append(formKey, obj[property].toISOString());
            }
            if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
              this.objectToFormData(obj[property], fd, formKey);
            } else {
              fd.append(formKey, obj[property]);
            }
    
          }
        }
        return fd;
      };
}

