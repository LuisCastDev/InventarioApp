import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  
  public id: number = 0;
  public identificacion: string = '';
  public nombre: string = '';
  public email: string = '';
  public direccion: string = '';
  public pais: string = '';
  public ciudad: string = '';
  public telefono: string='';

  
  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute,
    public loading: LoadingController
    ) {
      this.id = this.route.snapshot.params.clienteId ? this.route.snapshot.params.clienteId :0;
     }

  ngOnInit() {
  
  }

  


async  ionViewWillEnter(){
    if (this.id > 0) {   
    let l = await this.loading.create();
    l.present();

    
    
    this.servicio.Cliente_Consulta(this.id).subscribe((data:any)=>{
  if(data.info.item.id > 0){
    this.identificacion = data.info.item.identificacion;
    this.nombre = data.info.item.nombre;
    this.email = data.info.item.correo;
    this.direccion = data.info.item.direccion;
    this.pais = data.info.item.pais;
    this.ciudad = data.info.item.ciudad;
    this.telefono = data.info.item.telefono;
    
    
    console.log('cliente',data);
  }
  else{ 
   this.servicio.Mensaje('el Cliente que intenta modificar no existe','danger');
    this.servicio.irA('/Clientes');
  }
 l.dismiss();
},
    ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger');
    this.servicio.irA('/Clientes');
    l.dismiss();
  })
  }
}
  Guardar(){
  
    if(this.identificacion == '')
    {this.servicio.Mensaje('Debe ingresar el identificacion','warning');
  } else if (this.nombre == '')
    {this.servicio.Mensaje('Debe ingresar el nombre','warning');}
    else if (this.email == "")
    {this.servicio.Mensaje('Debe ingresar el email','warning');}
    else if (this.direccion == "")
    {this.servicio.Mensaje('Debe ingresar el direccion','warning');}
    else if (this.pais == "")
    {this.servicio.Mensaje('Debe ingresar el direccion','warning');}
    else if (this.ciudad == "")
    {this.servicio.Mensaje('Debe ingresar el direccion','warning');}
    else{
      this.servicio.Cliente_Guardar({
        id: this.id,
        identificacion: this.identificacion,
        nombre : this.nombre,
        correo : this.email,
        direccion : this.direccion,
        pais: this.pais,
        ciudad: this.ciudad,
        telefono: this.telefono
      
      }).subscribe((data:any)=>{
        if(data.mensaje == "registro no se pudo modificar debido a que el correo se encuentra en uso por otro cliente"){

          this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'warning');  

        
        }
        else{
        this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'success');
      }
      console.log(data.info.id)
        if(data.info.id > 0){
      this.servicio.irA('/clientes')


    }},
      ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger')})
    }
 
  }
 

}
