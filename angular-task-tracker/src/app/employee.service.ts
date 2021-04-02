import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

  storeEmployee(emp:any){
    this.http.post("http://localhost:3000/employees", emp).
    subscribe(result=>console.log(result), error=>console.log(error));
  }
  
  loadEmp():Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:3000/employees");
  }
}
