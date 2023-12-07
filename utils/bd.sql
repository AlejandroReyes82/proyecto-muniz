-- Tabla Usuario
CREATE TABLE Usuario (
    IdUsuario SERIAL PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(16) NOT NULL,
    Tipo VARCHAR(20) CHECK (Tipo IN ('Administrador', 'Docente')),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL
);

-- Tabla Materia
CREATE TABLE Materia (
    IdCarrera INT,
    IdMateria INT,
    NombreMateria VARCHAR(100) NOT NULL,
    HorasSemana INT,
    Unidad INT,
    NombreUnidad VARCHAR(100),
    Tema INT,
    NombreTema VARCHAR(100),
    PRIMARY KEY (IdCarrera, IdMateria) -- Clave primaria compuesta
);

-- Tabla Propuesta de Dosificación
CREATE TABLE PropuestaDosificacion (
    IdUsuario INT,
    IdCarrera INT,
    IdMateria INT,
    Unidad INT,
    Tema INT,
    Tiempo INT,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdCarrera, IdMateria) REFERENCES Materia(IdCarrera, IdMateria)
);

