import { TipoManifestoInterface } from "./tipoManifesto.interface";
import { MotoristaInterface } from "src/app/motorista/types/motorista.interface";
import { CidadeInterface } from "src/app/motorista/types/cidade.interface";
export interface ManifestoInterface {
    id: number
    motorista: MotoristaInterface
    cidadeOrigem: CidadeInterface
    cidadeDestino: CidadeInterface
    dataSaida?: string
    dataChegada?: string
    valorFrete?: string
    valorPedagio?: string
    tipoManifesto?: TipoManifestoInterface
}