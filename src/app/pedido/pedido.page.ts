import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { timeStamp } from 'console';
import { ServiciosService } from '../servicios.service';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public id: number = 0;
  public cliente_id: number = 0;
  public usuario_id: number = 0;
  public fecha: any = null;
  public status: string = "0";
  public clientes: any [] =[];
  public usuarios: any [] =[];
  
  public productos: any [] =[];
  public productos_listado: any [] =[];
  
  public _producto: any = null;

  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute,
    public loading: LoadingController,
    public alert: AlertController
    ) {
      this.id = this.route.snapshot.params.pedidoId ? this.route.snapshot.params.pedidoId :0;
     }

  ngOnInit() {
  
  }
 async Cargar_Informacion(){
    let l = await this.loading.create();
    l.present();

    
    
    this.servicio.Pedido_Consulta(this.id).subscribe((data:any)=>{
  if(data.info.item.id > 0){
    this.cliente_id = data.info.item.cliente_id;
    this.usuario_id = data.info.item.usuario_id;
    this.fecha = data.info.item.fecha;
    this.status = data.info.item.status;
    this.productos_listado = data.info.item.items;
    console.log("carga",data)

  }
  else{ 
   this.servicio.Mensaje('el pedido que intenta modificar no existe','danger');
    this.servicio.irA('/pedidos');
  }
 l.dismiss();
},
    ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger');
    this.servicio.irA('/pedidos');
    l.dismiss();
  })
  }

async prodSelect(){
  let l = await this.loading.create();
  l.present();
this._producto.cantidad = 1;
  this.servicio.Pedido_Producto_Guardar({
    pedido_id: this.id,
    producto_id: this._producto.id,
    cantidad: this._producto.cantidad,
    precio: this._producto.precio
  }).subscribe(()=>{
    l.dismiss();
    this.Cargar_Informacion();

  },()=>{
    l.dismiss();
  })
//   this.productos_listado.push(this._producto);
//   this._producto = null;
//   console.log(this.productos_listado)
 }

CalcularTotal(): number{
let total : number = 0 ;
for(let prod of this.productos_listado){
  total += prod.cantidad * prod.precio;
}
return total;
}

async modProd(producto : any){
  let l = await this.loading.create();
  l.present();
 
  this.servicio.Pedido_Producto_Guardar({
    pedido_id: this.id,
    producto_id: producto.producto_id,
    cantidad: producto.cantidad,
    precio: producto.precio
  }).subscribe(()=>{
    l.dismiss();
  //  this.Cargar_Informacion();

  },()=>{
    l.dismiss();
  })

}

async delProd(producto:any, ionItemSliding : IonItemSliding)
{

  ionItemSliding.close();
    let alert = await this.alert.create({
      header: 'Confirmacion',
      message: 'Esta seguro que desea eliminar?',
       buttons:[
        {
          text: 'Si',
         handler: async () => {
            let l = await this.loading.create();
            l.present();
           
            this.servicio.Pedido_Producto_borrar({
              pedido_id: this.id,
              item_id: producto.id,
             
            }).subscribe(()=>{
              l.dismiss();
              this.Cargar_Informacion();
            //  this.Cargar_Informacion();
          
            },()=>{
              l.dismiss();
            })
          }

        },

        {
          text: 'No',
          handler: () => {}

        }


      ]



    });
    alert.present();

 

}


async  ionViewWillEnter(){

  this.servicio.Cliente_Listado().subscribe((data:any)=>{
    this.clientes = data.info.items;
    console.log('clientes===',data);
  },((er)=>{console.log(er)}));
  this.servicio.Usuario_Listado().subscribe((data:any)=>{
    this.usuarios = data.info.items;
    console.log('Vendedores===',data);
  },((er)=>{console.log(er)}))

  this.servicio.Producto_Listado().subscribe((data:any)=>{
    this.productos = data.info.items;
  })




    if (this.id > 0) {
      this.Cargar_Informacion();
     }
    
}

  changeStatus(){

    // if (this.status == 0) {
    //   this.status = 1;
      
    // }

    // else if (this.status ==1) {
    //   this.status = 0;

    // } 
    
    console.log(this.status)

  }

  Guardar(){
  
    if(this.cliente_id == 0)
    {this.servicio.Mensaje('Debe ingresar el cliente','warning');
  } else if (this.usuario_id == 0)
    {this.servicio.Mensaje('Debe ingresar el vendedor','warning');}
    else if (this.fecha == null)
    {this.servicio.Mensaje('Debe ingresar la fecha','warning');}
   
    else{
      this.servicio.Pedido_Guardar({
        id: this.id,
        cliente_id: this.cliente_id,
        usuario_id : this.usuario_id,
        fecha : this.fecha,
        status : this.status     
      }).subscribe((data:any)=>{
       
        this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'success');
      
      console.log(data.info.id)
        if(data.info.id > 0){
      this.servicio.irA('/pedido/' + data.info.id)


    }},
      ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger')})
    }
 
  }
 

}
