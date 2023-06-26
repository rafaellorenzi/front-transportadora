import { CidadeInterface } from "./cidade.interface"
export interface MotoristaInterface {
    id: number
    nome: string
    dataNascimento?: string
    endereco: string
    tipoHabilitacao?: string
    dataVencimento?: string
    cidade?: CidadeInterface
}