import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Review } from '../../models/review';
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {

  token: string | null = null;
  id: string|null= null;
  loggedIn: boolean = false;
  user: User | null = null;
  selectedOption: string = 'author';
  searchBar: string='';
  reviews: Review[] = [];//users retrieved from the server
  reviewsFilter: Review[] = [];
 review: Review | null = null;
selectedReview: Review | null = null;
reviewSelected: boolean = false;
createMode:boolean=false;
searchReviewMode:boolean=false;
editMode:boolean=false;
searchedReviews: Review[] =[];
deactivateReviewId:string='';
username: string | null=null;
reviewToBeEdited: Review | null = null;
  constructor( public reviewService: ReviewService,public userService: UserService,public authService: AuthService)
  {
    
  }
  
  ngOnInit(): void {
  this.loggedIn = this.reviewService.isLoggedIn();
  this.id = this.reviewService.getUser();
  this.username = this.authService.getUserName();
  console.log('akiii'+this.id);
  this.reviewService.getReviews(this.id).subscribe(reviews => {
    
    this.reviews=reviews;
    
  })
  }
  onSelectReview(review:Review): void{
    this.reviewSelected = true;
    this.selectedReview = review;
  }
  
  backToReviewList(): void{
    this.reviewSelected = false;
    this.selectedReview = null;
    this.createMode = false;
    this.searchReviewMode = false;
    this.searchedReviews = [];
    this.editMode = false;
  }
  createReviewBtn(): void{
    this.createMode = true;
    }
  searchForReview(): void {
    this.searchReviewMode = true;

    if(this.searchBar != ''){
      if(this.selectedOption=='author'){
        this.reviewService.getReviewsbyAuthor(this.searchBar).subscribe(review => {
          this.searchedReviews = review;
        });
      }
      else if(this.selectedOption=='place'){
        this.reviewService.getReviewsbyPlace(this.searchBar).subscribe(review => {
          this.searchedReviews = review;
        });
      }
      else if(this.selectedOption=='housing'){
        this.reviewService.getReviewsbyHousing(this.searchBar).subscribe(review => {
          this.searchedReviews = review;
        });
      }
    }else{
      //this.searchedReview = [];
    }
  }
}
