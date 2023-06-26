import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MotoristaInterface } from '../types/motorista.interface';

@Injectable()
export class MotoristaService {
  constructor(private httpClient: HttpClient) { }

  getMotorista(id: number): Observable<MotoristaInterface> {
    return this.httpClient.get<MotoristaInterface>(
      `${environment.apiUrl}/motoristas/${id}`
    )
  }

  getMotoristas(): Observable<MotoristaInterface[]> {
    return this.httpClient.get<MotoristaInterface[]>(
      `${environment.apiUrl}/motoristas`
    );
  }

  update(motorista: MotoristaInterface): Observable<MotoristaInterface> {
    return this.httpClient.put<MotoristaInterface>(
      `${environment.apiUrl}/motoristas/${motorista.id}`,
      motorista
    )
  }

  save(motorista: MotoristaInterface): Observable<MotoristaInterface> {
    return this.httpClient.post<MotoristaInterface>(
      `${environment.apiUrl}/motoristas`,
      motorista
    );
  }

  remove(motorista: MotoristaInterface): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}/motoristas/${motorista.id}`
    );
  }
}
