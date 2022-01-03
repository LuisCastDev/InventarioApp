import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Button } from 'protractor';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {

  public productos: any[] = [];
  public total: number = 0;
  public texto: string ='';

  constructor(
    public servicio: ServiciosService,
    public loading: LoadingController,
    public alert: AlertController
    
    ) { }

  ngOnInit() {
   // this.getProductos();
  }

  ionViewWillEnter(){
    this.getProductos();


  }

  async getProductos(){
    let l = await this.loading.create();
    l.present();

    this.servicio.Producto_Listado(this.texto)
    .subscribe((res: any)=>{
      this.productos = res.info.items;
      this.total = res.info.total;
     l.dismiss();
      console.log(res)  
    },(er: any)=>{
      l.dismiss();
      console.log(er)
    })
    
  }





  updateProducto(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    this.servicio.irA('/producto/' + item.id)
    


  }


 async deleteProducto(item:any, ionItemSliding : IonItemSliding){
    ionItemSliding.close();
    let alert = await this.alert.create({
      header: 'Confirmación',
      message: 'Esta seguro que desea eliminar el producto ['+ item.nombre+']?',
      buttons:[{

        text: 'Si',
        handler: async () =>
        {
          let l = await this.loading.create({
            message: "borrando"
          });
          this.servicio.Producto_Eliminar(item.id) 
          .subscribe((data: any)=> {this.getProductos();
        
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
  //  this.servicio.irA('/producto/' + item.id)
  alert.present();    

  }

}

