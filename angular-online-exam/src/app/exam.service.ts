import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from './exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(public http:HttpClient) { }
  loadExam():Observable<Exam[]>{
    return this.http.get<Exam[]>("/assets/test.json");
  }
}
