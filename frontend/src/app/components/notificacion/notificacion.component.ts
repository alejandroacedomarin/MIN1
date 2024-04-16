import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificacionService } from '../../services/notificacion.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Notificacion } from '../../models/notificacion';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
  token: string | null = null;
  id: string|null= null;
  loggedIn: boolean = false;
  user: User | null = null;
  selectedOption: string = 'author';
  searchBar: string='';
  notificaciones: Notificacion[] = [];//users retrieved from the server
  reviewsFilter: Notificacion[] = [];
 notificacion: Notificacion | null = null;
selectedNoti: Notificacion| null = null;
notiSelected: boolean = false;
createMode:boolean=false;
searchNotiMode:boolean=false;
editMode:boolean=false;
searchedNoti: Notificacion | null=null;
deactivateNotiId:string='';
username: string | null=null;

  constructor( public notiService: NotificacionService,public userService: UserService,public authService: AuthService)
  {
    
  }
  
  ngOnInit(): void {
  this.loggedIn = this.notiService.isLoggedIn();
  this.id = this.notiService.getUser();
  this.username = this.authService.getUserName();
  console.log('dentro noti'+this.id);
  this.notiService.getNotis(this.id).subscribe(notificaciones => {
    
    this.notificaciones=notificaciones;
    
  })
  }
  onSelectNoti(notificacion:Notificacion): void{
    this.notiSelected = true;
    this.selectedNoti = notificacion;
  }
  
  backToNotiList(): void{
    this.notiSelected = false;
    this.selectedNoti = null;
    this.createMode = false;
    this.searchNotiMode = false;
    this.searchedNoti = null;
    this.editMode = false;
  }
  createReviewBtn(): void{
    this.createMode = true;
    }
  searchForNoti(): void {
    this.searchNotiMode = true;
    console.log('dentro search'+this.searchBar);
    this.notiService.getNoti(this.searchBar).subscribe(noti => {
      this.searchedNoti = noti;
    });
  }
  deleteNoti(): void {
    
    /* const edit: Notificacion = {
        _id: this.searchedNoti?._id,
        content: this.searchedNoti?.content||'',
        importancia:5|| '',
        user:this.searchedNoti?
    } */
    /* const id = this.searchedNoti?._id;
    
      
        this.notiService.deleteNoti(id).subscribe(mensage => {
          console.log(mensage);
          this.notiSelected = false;
    this.selectedNoti = null;
    this.createMode = false;
    this.searchNotiMode = false;
    this.searchedNoti = null;
    this.editMode = false;
        }); */
      
    
  }
  deleteNoti2(): void {
    
    /* const edit: Notificacion = {
        _id: this.searchedNoti?._id,
        content: this.searchedNoti?.content||'',
        importancia:5|| '',
        user:this.searchedNoti?
    } */
    /* const id = this.selectedNoti?._id?.toString;
    
      
        this.notiService.deleteNoti(id).subscribe(mensage => {
          console.log(mensage);
          this.notiSelected = false;
    this.selectedNoti = null;
    this.createMode = false;
    this.searchNotiMode = false;
    this.searchedNoti = null;
    this.editMode = false;
        });
      
    */
  } 
}
