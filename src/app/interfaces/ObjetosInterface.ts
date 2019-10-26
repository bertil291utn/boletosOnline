
//interface usuarios
export interface Usuarios {
    username: string;
    email: string;
    password?: string;
    name: string;
    tipo_user: string;
    session: string;
}

export interface Drivers {
    cedula: string;
    nombres: string;
    apellidos: string;
    email: string;
    direccion: string;
    telefono: string;
}