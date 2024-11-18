import { KanbamAction } from '../enum/actions.enum';

export interface CardDTO {
    id?: string,
    titulo: string,
    conteudo: any,
    lista: KanbamAction
}
