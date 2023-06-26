import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ManifestoInterface } from '../types/manifesto.interface';

@Injectable()
export class ManifestoService {
  constructor(private httpClient: HttpClient) { }

  getManifesto(id: number): Observable<ManifestoInterface> {
    return this.httpClient.get<ManifestoInterface>(
      `${environment.apiUrl}/manifesto/${id}`
    )
  }

  getManifestos(): Observable<ManifestoInterface[]> {
    return this.httpClient.get<ManifestoInterface[]>(
      `${environment.apiUrl}/manifesto`
    );
  }

  update(manifesto: ManifestoInterface): Observable<ManifestoInterface> {
    return this.httpClient.put<ManifestoInterface>(
      `${environment.apiUrl}/manifesto/${manifesto.id}`,
      manifesto
    )
  }

  save(manifesto: ManifestoInterface): Observable<ManifestoInterface> {
    return this.httpClient.post<ManifestoInterface>(
      `${environment.apiUrl}/manifesto`,
      manifesto
    );
  }

  remove(manifesto: ManifestoInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/manifesto/${manifesto.id}`
    );
  }
}
