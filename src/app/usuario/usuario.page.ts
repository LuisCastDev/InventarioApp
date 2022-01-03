import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ServiciosService } from '../servicios.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  public id: number = 0;
  public usuario: string = '';
  public nombre: string = '';
  public password: string = '';
  public telefono: string = '';
  public correo: string = '';
  public status: boolean = true;
  
  constructor(public servicio: ServiciosService,
    public route: ActivatedRoute,
    public loading: LoadingController
    ) {
      this.id = this.route.snapshot.params.usuarioId ? this.route.snapshot.params.usuarioId :0;
     }

  ngOnInit() {
  
  }

  


async  ionViewWillEnter(){
    if (this.id > 0) {   
    let l = await this.loading.create();
    l.present();

    
    
    this.servicio.Usuario_Consulta(this.id).subscribe((data:any)=>{
  if(data.info.item.id > 0){
    this.usuario = data.info.item.usuario;
    this.nombre = data.info.item.nombre;
    this.password = data.info.item.password;
    this.telefono = data.info.item.telefono;
    this.correo = data.info.item.correo;
    this.status = data.info.item.status;
    
    

  }
  else{ 
   this.servicio.Mensaje('el usuario que intenta modificar no existe','danger');
    this.servicio.irA('/usuarios');
  }
 l.dismiss();
},
    ()=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger');
    this.servicio.irA('/usuarios');
    l.dismiss();
  })
  }
}
  Guardar(){
  
    if(this.usuario == '')
    {this.servicio.Mensaje('Debe ingresar el usuario','warning');
  } else if (this.nombre == '')
    {this.servicio.Mensaje('Debe ingresar el nombre','warning');}
    else if (this.password == '')
    {this.servicio.Mensaje('Debe ingresar el password','warning');}
    else if (this.correo == '')
    {this.servicio.Mensaje('Debe ingresar el password','warning');}
    else if (this.telefono == '')
    {this.servicio.Mensaje('Debe ingresar el telefono','warning');}
    else{
      this.servicio.Usuario_Guardar({
        id: this.id,
        usuario: this.usuario,
        nombre : this.nombre,
        password : this.password,
        telefono : this.telefono,
        correo : this.correo,
        
        status : this.status ? 1 : 0,
        
      }).subscribe((data:any)=>{
        if(data.mensaje == "registro no se pudo modificar debido a que este nickname se encuentra en uso por otro usuario"){

          this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'warning');  

        
        }
        else{
        this.servicio.Mensaje(data.mensaje , data.info.id == 0 ?'danger' : 'success');
      }
      console.log(data.info.id)
        if(data.info.id > 0){
      this.servicio.irA('/usuarios')


    }},
      (err)=>{this.servicio.Mensaje('no se pudo realizar la peticion','danger');
      console.log("Error===",err)
    })
    }
 
  }
 

}
