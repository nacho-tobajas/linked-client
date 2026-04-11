import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient) {}

  getTattooNews(): Observable<{ articles: NewsArticle[] }> {
    return this.http
      .get<{ articles: NewsArticle[] }>(`${environment.urlApi}news`)
      .pipe(catchError(() => of({ articles: [] })));
  }
}
