import { Component, OnInit } from '@angular/core';
import { Exam } from '../exam.model';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-mcq-exam',
  templateUrl: './mcq-exam.component.html',
  styleUrls: ['./mcq-exam.component.css']
})
export class McqExamComponent implements OnInit {
  exam:Array<Exam>=[];
  answers = new Array<any>(0);
  msges:Array<string>=[];
  score:number = 0; //number of correct answers
  resMsg:string = "";
  color:Array<string>=[];
  scoreColor:string = "";
  constructor(public exSer:ExamService) { }

  ngOnInit(): void {

  }

  startQuiz(){
    this.exSer.loadExam().subscribe(data=>
      {
        this.exam=data;
        this.answers.length = this.exam.length; //setting length of the selected answer array
      }
      );

    this.score = 0;
    this.msges =[];
    this.color = [];
    //console.log(this.exam.length);
    //this.answers.length = this.exam.length;
    //console.log(this.answers.length);
  }

  submitQuiz(){
    //console.log(this.exam[0].ans);
    //Once submit is clicked, run a loop of size answers and compare correct ans with selected ans
    for(let i = 0; i < this.answers.length; i++){
      if (this.answers[i] == this.exam[i].ans){
        this.score++;
        this.msges.push("Your Answer: "+this.answers[i]+": is CORRECT!");
        this.color.push("correct");
      }
      else{
        this.color.push("wrong");
        this.msges.push("Your Answer: "+this.answers[i]+
          ": is WRONG. Correct answer is: "+this.exam[i].ans);
        
      }
    }
    if (this.score >= 7){
      this.resMsg = "Result: "+this.score+"/10 : PASS :)";
      this.scoreColor = "correct";
    }else{
      this.resMsg = "Result: "+this.score+"/10 : FAIL :(";
      this.scoreColor = "wrong";
    }
    //console.log(this.score);

  }
  saveAnswer(choice:any, id:any){
    this.answers[id-1] = choice;

    // if (this.answers.length < id){
    //   this.answers.push(choice);
    // }
    // else{
    //   this.answers[id-1] = choice;
    // }
    
  }

}
