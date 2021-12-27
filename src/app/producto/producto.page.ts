import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public id: number = 0;
  public codigo: string = '';
  public nombre: string = '';
  public stock: number = 0;
  public precio: number = 0;
  public status: boolean = true;
  
  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute) {
      this.id = this.route.snapshot.params.productoId ? this.route.snapshot.params.productoId :0;
     }

  ngOnInit() {
  
  }
  ionViewWillEnter(){this.servicio.Producto_Consulta(this.id).subscribe((data:any)=>{
  if(data.info.item.id > 0){
    this.codigo = data.info.item.codigo;
    this.nombre = data.info.item.nombre;
    this.stock = data.info.item.stock;
    this.precio = data.info.item.precio;
    this.status = data.info.item.status;
    


  }
  else{ 
    this.servicio.Mensaje('el producto que intenta modificar no existe','danger');
    this.servicio.irA('/productos');
  }

},
    ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger');
 //   this.servicio.irA('/productos');
  })
  }

  Guardar(){
  
    if(this.codigo == '')
    {this.servicio.Mensaje('Debe ingresar el codigo','warning');
  } else if (this.nombre == '')
    {this.servicio.Mensaje('Debe ingresar el nombre','warning');}
    else if (this.stock == 0)
    {this.servicio.Mensaje('Debe ingresar el stock','warning');}
    else if (this.precio == 0)
    {this.servicio.Mensaje('Debe ingresar el precio','warning');}
    else{
      this.servicio.Producto_Guardar({
        id: this.id,
        codigo: this.codigo,
        nombre : this.nombre,
        stock : this.stock,
        precio : this.precio,
        status : this.status ? 1 : 0,
        
      }).subscribe((data:any)=>{
        if(data.mensaje == "el registro no se pudo modificar porque hay otro producto con el mismo nombre o codigo"){

          this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'warning');  

        
        }
        else{
        this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'success');
      }
      console.log(data.info.id)
        if(data.info.id > 0){
      this.servicio.irA('/productos')


    }},
      (err)=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger')})
    }
 
  }
 

}
