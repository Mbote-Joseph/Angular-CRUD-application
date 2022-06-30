import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) {}

  // Add Employee Details to the API functionality
  postEmployee(data: any) {
    return this.http.post<any>(`${this.url}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Get Employee Details from the API functionality
  getEmployee() {
    return this.http.get<any>(`${this.url}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Update Employee Details from the API functionality
  updateEmployee(data: any, id: number) {
    return this.http.put<any>(`${this.url}/` + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Delete Employee Details by ID from the API functionality
  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.url}/` + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
