import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
  urlBase = '/api';

  constructor(private http: HttpClient) { }

  getAnimakai() {
    return this.http.get(this.urlBase + '/animakai');
  }

}
