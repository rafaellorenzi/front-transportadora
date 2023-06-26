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
      `${environment.apiUrl}/manifestos/${id}`
    )
  }

  getManifestos(): Observable<ManifestoInterface[]> {
    return this.httpClient.get<ManifestoInterface[]>(
      `${environment.apiUrl}/manifestos`
    );
  }

  update(manifesto: ManifestoInterface): Observable<ManifestoInterface> {
    return this.httpClient.put<ManifestoInterface>(
      `${environment.apiUrl}/manifestos/${manifesto.id}`,
      manifesto
    )
  }

  save(manifesto: ManifestoInterface): Observable<ManifestoInterface> {
    return this.httpClient.post<ManifestoInterface>(
      `${environment.apiUrl}/manifestos`,
      manifesto
    );
  }

  remove(manifesto: ManifestoInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/manifestos/${manifesto.id}`
    );
  }
}
