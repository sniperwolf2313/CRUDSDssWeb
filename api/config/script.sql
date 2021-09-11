CREATE TABLE public.usuarios
(
    id_usuario varchar NOT NULL,
    nombre_completo varchar NOT NULL,
    cargo varchar NOT NULL,
    clave varchar NOT NULL,
    usuario varchar NOT NULL,
    telefono varchar NOT NULL,
    correo varchar NOT NULL,
    PRIMARY KEY (id_usuario)
)

CREATE TABLE public.tipo_reto
(
    id_tipo_reto varchar NOT NULL,
    nombre varchar NOT NULL,
    descripcion varchar NOT NULL,
    PRIMARY KEY (id_tipo_reto)
)

CREATE TABLE public.retos
(
    id_reto varchar NOT NULL,
    id_usuario varchar NOT NULL,
    id_tipo_reto varchar NOT NULL,
    dependencia varchar NOT NULL,
    problema varchar NOT NULL,
    antecedentes varchar NOT NULL,
    interesados varchar NOT NULL,
    impacto_esperado varchar NOT NULL,
    PRIMARY KEY (id_reto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_tipo_reto) REFERENCES tipo_reto(id_tipo_reto)
)

CREATE TABLE public.postulacines
(
    id_postulacion varchar NOT NULL,
    id_usuario varchar NOT NULL,
    id_reto varchar NOT NULL,
    descripcion varchar NOT NULL,
    PRIMARY KEY (id_postulacion),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_reto) REFERENCES retos(id_reto)
)

CREATE TABLE public.documentos
(
    id_documento varchar NOT NULL,
    id_usuario varchar NOT NULL,
    id_reto varchar NOT NULL,
    informacion varchar NOT NULL,
    PRIMARY KEY (id_documento),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_reto) REFERENCES retos(id_reto)
)

CREATE TABLE public.avances
(
    id_avance varchar NOT NULL,
    id_usuario varchar NOT NULL,
    id_reto varchar NOT NULL,
    descripcion varchar NOT NULL,
    fecha date NOT NULL,
    PRIMARY KEY (id_avance),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_reto) REFERENCES retos(id_reto)
)