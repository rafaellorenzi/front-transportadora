import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CidadeInterface } from "../types/cidade.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class CidadeService {

  constructor(private httpClient: HttpClient) {}

  getCidade(): Observable<CidadeInterface[]> {
    return this.httpClient.get<CidadeInterface[]>(
      `${environment.apiUrl}/cidade`
    )
  }

}
