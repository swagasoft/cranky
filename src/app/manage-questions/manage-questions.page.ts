import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MenuController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.page.html',
  styleUrls: ['./manage-questions.page.scss'],
})
export class ManageQuestionsPage implements OnInit {
  questionsOutPut: any;
  catType: any;
  loading: boolean;
  showForm: boolean;
  showContent: boolean;
  questionToEdit: any;

  constructor(private userService: UserService,
              public menu: MenuController,
              public alertController: AlertController,
              private router: Router) { }

              questionModel = {
                question: '',
                option1: '',
                category: '',
                option2: '',
                option3: '',
                option4: '',
                  tip  : '',
                answer: ''
              }

              
  model = {
    filterOptions : [
    ]
  }
  ngOnInit() {
    this.loading = false;
    this.showContent = true;
    this.showForm = false;
    this.questionsOutPut = 0;
    this.getAllQuestions();
  }

  selectChange( $event) {
    this.findByCategory($event);
        }

        getAllQuestions(){
          this.loading = true;
          this.userService.getAllQuestions().subscribe(
            res => {
              this.loading = false;
              console.log(res);
              this.questionsOutPut = res['quesions'];
            },
            err => {
              this.loading = false;
              console.log(err);
            }
          );
        }

        deleteQestion(id, category) {
          this.presentAlertConfirm(id, category);
          }

          async presentAlertConfirm(id, category) {
            const alert = await this.alertController.create({
              header: 'DELETE QUESTION ?',
              message: ' <strong class="text-danger"> Deleted question cannot be recovered</strong>!!!',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: (blah) => {
                    console.log('cancle delete');
                  }
                }, {
                  text: 'Yes',
                  cssClass: 'danger',
                  handler: () => {
                    this.loading = true;
                    this.userService.deleteQuestion(id).subscribe(
                      res => {
                        this.loading = false;
                        console.log('response .. success delete');
                        this.findByCategory(category);
                      },
                      err => {
                        this.loading = false;
                        this.findByCategory(category);
                      }
                    );
                  }
                }
              ]
            });
        
            await alert.present();
          }

          findByCategory(category){
            this.loading = true;
            console.log(category);
            // console.log(this.catType);
            this.userService.findByCategory(category).subscribe(
              res => {
                this.loading = false;
                this.questionsOutPut = res['questions'];
                console.log(this.questionsOutPut);
        
              },
              err => {
                this.loading = false;
                console.log(err);
              }
            );
        
          }
          addQuestion(){
            this.router.navigate(['/admin-upload']);
          }

          changeStatusTrue(id, category){
            console.log('I CLICK TRUE', category);
            this.userService.changeQuestionStatusToTrue(id).subscribe(
              res => { this.findByCategory(category); 
              } );
          }
        
          changeStatusFalse(id, category){
            console.log('I CLICK false');
            this.userService.changeQuestionStatusToFalse(id).subscribe(
              res => {
                this.findByCategory(category) });
          }

          editQuestion(id){
            this.showContent = false;
            this.showForm = true;
            this.loading = true;
            console.log('edit question', id);
            this.userService.getSingleQuestion(id).subscribe(
              res => {
                this.loading = false;
                this.questionToEdit = res['doc'];
                console.log(this.questionToEdit);
        
              },
              err => {
                this.loading = false;
                console.log(err);
              }
            );
          }

          
  updateQuestion(form: NgForm, id){
    this.showForm = false;
    this.showContent = true;
  }


}
