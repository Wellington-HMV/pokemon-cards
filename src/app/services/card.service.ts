import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IApiResponseCards } from '../models/card.model';
import { IStringArray } from '../models/string-array.model';

const url = `${environment.API_PATCH}`;

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  get = (page: number = 1, pageSize: number = 6) => {
    return this.http.get<IApiResponseCards>(
      `${url}cards/?page=${page + 1}&pageSize=${pageSize}`
    );
  };

  getTypes = () => {
    return this.http.get<IStringArray>(`${url}types`);
  };
}
