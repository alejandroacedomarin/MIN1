import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Notificacion } from '../models/notificacion';
import { ObjectId } from 'mongoose';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  
  token: string | null = null;
  isloggedin: boolean | null = null;
  id: string | null = null;
  constructor(private http:HttpClient, private authService:AuthService) { }
  url: string = "http://127.0.0.1:3000";
  
  getToken() {
    this.token = this.authService.getToken();
  }
  isLoggedIn(){
    return this.isloggedin = this.authService.isLoggedIn();
  }
  getUser() {
    return this.id = this.authService.getUser();
  }
  
  getHeaders() {
    this.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('x-access-token', this.token || '');
    return headers;
  }

  getNotis(id: string|null) {
    console.log('dentro notis   '+id);
    
    return this.http.get<Notificacion[]>(this.url+'/notis');
  }
  getNoti(id: string) {
   
    return this.http.get<Notificacion>(this.url+'/noti/'+id);
  }
  deleteNoti(deleteId : string) {
    
            
            
            return this.http.delete(this.url+'/noti/'+ deleteId);
        
    
  }
}
