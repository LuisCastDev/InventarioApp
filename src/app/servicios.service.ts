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
//apis producto
    Producto_Listado(_texto:string =''){

    return this.http.post(this.URL_API + 'listar-producto',this.objectToFormData({
        texto: _texto
      }));

    }
    Producto_Guardar(data:any){

      return this.http.post(this.URL_API + (data.id == 0 ?'crear-producto' : 'actualizar-producto/'+data.id),this.objectToFormData({
        id: data.id,
        codigo: data.codigo,
        nombre: data.nombre,
        stock: data.stock,
        precio: data.precio,
        status: data.status
        }));
  
      }
    Producto_Consulta(_id:number){

      return this.http.get(this.URL_API + 'consultar-producto/'+_id);
    }
    Producto_Eliminar(producto_id){

      return this.http.delete(this.URL_API + 'eliminar-producto/'+producto_id) 
        
  
      }

  // apis pedidos

  Pedido_Listado(_texto:string =''){

    return this.http.post(this.URL_API + 'listar-pedido',this.objectToFormData({
        texto: _texto
      }));

    }
    Pedido_Guardar(data:any){

      return this.http.post(this.URL_API + (data.id == 0 ?'crear-pedido' : 'actualizar-pedido/'+data.id),this.objectToFormData({
        id: data.id,
        cliente_id: data.cliente_id,
        fecha: data.fecha,
        usuario_id: data.usuario_id,
        status: data.status
        }));
  
      }
    Pedido_Consulta(_id:number){

      return this.http.get(this.URL_API + 'consultar-pedido/'+_id);
    }
    Pedido_Eliminar(producto_id){

      return this.http.delete(this.URL_API + 'eliminar-pedido/'+producto_id) 
        
  
      }
//apis clientes
    Cliente_Listado(_texto:string =''){

      return this.http.post(this.URL_API + 'listar-cliente',this.objectToFormData({
          texto: _texto
        }));
  
      }
   
    Cliente_Consulta(_id:number){

      return this.http.get(this.URL_API + 'consultar-cliente/'+_id);
    }
   
      Cliente_Guardar(data:any){

        return this.http.post(this.URL_API + (data.id == 0 ?'crear-cliente' : 'actualizar-cliente/'+data.id),this.objectToFormData({
          id: data.id,
          identificacion: data.identificacion,
          nombre: data.nombre,
          correo: data.correo,
          direccion: data.direccion,
          pais: data.pais,
          ciudad: data.ciudad,
          telefono: data.telefono
          }));
    
        }
   
    
      Cliente_Eliminar(cliente_id){

        return this.http.delete(this.URL_API + 'eliminar-cliente/'+cliente_id) 
          
    
        }
    
        Usuario_Listado(_texto:string =''){

          return this.http.post(this.URL_API + 'listar-usuario',this.objectToFormData({
              texto: _texto
            }));
      
          }
       
        Usuario_Consulta(_id:number){
    
          return this.http.get(this.URL_API + 'consultar-usuario/'+_id);
        }
       
          Usuario_Guardar(data:any){
    
            return this.http.post(this.URL_API + (data.id == 0 ?'crear-usuario' : 'actualizar-usuario/'+data.id),this.objectToFormData({
              id: data.id,
              usuario: data.usuario,
              nombre: data.nombre,
              correo: data.correo,
              password: data.password,
              status: data.status,
              telefono: data.telefono
              }));
        
            }
       
        
          Usuario_Eliminar(usuario_id){
    
            return this.http.delete(this.URL_API + 'eliminar-cliente/'+usuario_id) 
              
        
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

