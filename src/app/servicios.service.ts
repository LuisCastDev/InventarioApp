import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
 private URL_API: string = 'http://localhost/API/';
  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: ToastController
  ) { }

  irA(url: string){
    this.router.navigateByUrl(url);
  }

    Producto_Listado(_texto:string =''){

    return this.http.post(this.URL_API + 'listar-producto',this.objectToFormData({
        texto: _texto
      }));

    }
    Producto_Consulta(_id:number){

      return this.http.get(this.URL_API + 'consultar-producto/'+_id);
    }
    Producto_Guardar(data:any){

      return this.http.post(this.URL_API + (data.id == 0 ?'crear-producto' : 'actualizar-producto/'+data.id),this.objectToFormData({
        id: data.id,
        codigo: data.codigo,
        nombre: data.nombre,
        stock: data.stock,
        precio: data.precio,
        activo: data.activo
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
    
    async Mensaje(texto: string,tipo: string = "success"){
      let t = await this.toast.create({
        message : texto,
        color: tipo,
        duration: 3000



      });
      t.present(); 
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

