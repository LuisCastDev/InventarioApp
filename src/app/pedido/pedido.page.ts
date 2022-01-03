import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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


  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute,
    public loading: LoadingController
    ) {
      this.id = this.route.snapshot.params.pedidoId ? this.route.snapshot.params.pedidoId :0;
     }

  ngOnInit() {
  
  }

  


async  ionViewWillEnter(){

  this.servicio.Cliente_Listado().subscribe((data:any)=>{
    this.clientes = data.info.items;
    console.log('clientes===',data);
  },((er)=>{console.log(er)}));
  this.servicio.Usuario_Listado().subscribe((data:any)=>{
    this.usuarios = data.info.items;
    console.log('clientes===',data);
  },((er)=>{console.log(er)}))





    if (this.id > 0) {   
    let l = await this.loading.create();
    l.present();

    
    
    this.servicio.Pedido_Consulta(this.id).subscribe((data:any)=>{
  if(data.info.item.id > 0){
    this.cliente_id = data.info.item.cliente_id;
    this.usuario_id = data.info.item.usuario_id;
    this.fecha = data.info.item.fecha;
    this.status = data.info.item.status;
    
    

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
        if(data.mensaje == "el registro no se pudo modificar porque hay otro pedido con el mismo nombre o codigo"){

          this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'warning');  

        
        }
        else{
        this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'success');
      }
      console.log(data.info.id)
        if(data.info.id > 0){
      this.servicio.irA('/pedido/' + data.info.id)


    }},
      ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger')})
    }
 
  }
 

}
