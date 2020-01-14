
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

export interface Buses {
    numero_bus: string;
    id_cond: string;
    asientos_bus: number;
    dos_pisos: string;
}

export interface Rutas {
    id_ruta: number;
    nombre_empresa: string;
    ruta: number;
    nombre_chofer: string;
    numero_bus: string;
    hora_salida: string;
    costo: string;
}