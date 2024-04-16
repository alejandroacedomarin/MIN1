import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Review } from '../models/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  
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

  getReviews(id: string|null) {
    console.log('dentro reviews   '+id);
    
    return this.http.get<Review[]>(this.url+'/review/'+id, { headers: this.getHeaders() });
  }
  getReviewsbyAuthor(id: string) {
    const h = this.getHeaders();
    const idd = {id};
    return this.http.get<Review[]>(this.url+'/review/byAuthor', {headers: this.getHeaders() });
  }
  getReviewsbyPlace(id: string|null) {
    return this.http.get<Review[]>(this.url+'/review/byPlace', { headers: this.getHeaders() });
  }
  getReviewsbyHousing(id: string|null) {
    return this.http.get<Review[]>(this.url+'/review/byHousing', {headers: this.getHeaders() });
  }
}
