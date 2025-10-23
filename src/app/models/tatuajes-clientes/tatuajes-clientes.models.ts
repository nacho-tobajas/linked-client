import { TatuajeImagen } from "../tatuador/tatuador.model";
import { User } from "../user.model";

export class Cliente extends User {

}

export class FavoritosCliente {
    cliente?: Cliente;
    imagenTatuaje?: TatuajeImagen;
}

