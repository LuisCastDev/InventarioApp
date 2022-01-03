import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  public pedidos: any[] = [];
  public total: number = 0;
  public texto: string ='';

  constructor(
    public servicio: ServiciosService,
    public loading: LoadingController,
    public alert: AlertController
    
    ) { }

  ngOnInit() {
   // this.getPedidos();
  }

  ionViewWillEnter(){
    this.getPedidos();


  }

  async getPedidos(){
    let l = await this.loading.create();
    l.present();

    this.servicio.Pedido_Listado(this.texto)
    .subscribe((res: any)=>{
      this.pedidos = res.info.items;
      this.total = res.info.total;
     l.dismiss();
      console.log(res)  
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    
  }





  updatePedido(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    this.servicio.irA('/pedido/' + item.id)
    


  }


 async deletePedido(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    let alert = await this.alert.create({
      header: 'Confirmación',
      message: 'Esta seguro que desea eliminar el pedido ['+ item.nombre+']?',
      buttons:[{

        text: 'Si',
        handler: async () =>
        {
          let l = await this.loading.create({
            message: "borrando"
          });
          this.servicio.Pedido_Eliminar(item.id) 
          .subscribe((data: any)=> {this.getPedidos();
        
            l.dismiss();
            console.log(data);
          },
           (error : any)=>
           {
             console.log(error);
            l.dismiss();
          
          })



        }


       },
      {

        text: 'No',
        handler: () =>
        {}


      }
    ]




    });
  //  this.servicio.irA('/pedido/' + item.id)
  alert.present();    

  }

}

