import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TipoManifestoInterface } from "../types/tipoManifesto.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TipoManifestoService {

  constructor(private httpClient: HttpClient) {}

  getTipoManifesto(): Observable<TipoManifestoInterface[]> {
    return this.httpClient.get<TipoManifestoInterface[]>(
      `${environment.apiUrl}/tipoManifesto`
    )
  }

}