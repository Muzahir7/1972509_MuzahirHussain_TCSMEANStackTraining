import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:Array<Employee>=[];
  constructor(public empSer:EmployeeService) { }

  ngOnInit(): void {
    this.retrieveEmp();
  }

  storeEmp(empRef:any){
    //console.log(empRef);
    this.empSer.storeEmployee(empRef);  //dont forget to uncomment
    
  }

  retrieveEmp(){
    this.empSer.loadEmp().subscribe(data=>
      {
        this.employees = data;
        //console.log(this.employees[0].name);
        
      }
      );
  }

}
