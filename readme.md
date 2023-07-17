# CliniShare

El sistema distribuido de gestión de historias clínicas y colaboración médica.

    Con el sistema se puede:
*   Gestionar historias clínicas de manera segura sin uso de internet.

*   Registrar a tus pacientes y eventos que les vayan ocurriendo.

*   Resguardar los datos de tus pacientes bajo contraseña, en tu computadora, sin servidores de por medio.

*   Compartir los datos de pacientes que tengas en común con otros profesionales de la salud.

*   Y muchas otras cosas más.

## Arrancando con el sistema

Con estas simples instrucciones vas poder gestionar historias clínicas y tener tu copia de Clinishare andando lo antes posible.


### Prerequisitos

```
Sistema operativo Ubuntu Linux o WSL con Ubuntu Linux versión 2 o superior.

Una versión de node mayor a la 16.

Git

PostgreSQL
```

### Instalación

Como arrancar paso a paso:

Node:

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\

sudo apt-get install -y nodejs
```

Clonando el repositorio:

```
git clone https://github.com/jonathanc0101/CliniShare.git
```

Instalando las dependencias:

```
cd ./CliniShare

sh ./install.sh
```

Corriendo el sistema:
```
sh ./run.sh
```




# CliniShare

El sistema distribuido de gestión de historias clínicas y colaboración médica.

    Con el sistema se puede:
*   Gestionar historias clínicas de manera segura sin uso de internet.

*   Registrar a tus pacientes y eventos que les vayan ocurriendo.

*   Resguardar los datos de tus pacientes bajo contraseña, en tu computadora, sin servidores de por medio.

*   Compartir los datos de pacientes que tengas en común con otros profesionales de la salud.

*   Y muchas otras cosas más.

## Arrancando con el sistema

Con estas simples instrucciones vas poder gestionar historias clínicas y tener tu copia de Clinishare andando lo antes posible.


### Prerequisitos

```
Sistema operativo Ubuntu Linux o WSL con Ubuntu Linux versión 2 o superior. @^20.04

sh @5.1.16

Node @^16

Git @2.34.1 

PostgreSQL @15.1

Se requiere el uso de internet por única vez al instalar el sistema, su uso no requiere internet.
```

### Instalación

Como arrancar paso a paso:

Node:

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\

sudo apt-get install -y nodejs
```

Clonando el repositorio:

```
git clone https://github.com/jonathanc0101/CliniShare.git
```

Instalando las dependencias (especificadas en package.json de cada módulo):

```
cd ./CliniShare

sh ./install.sh
```

Corriendo el sistema:
```
sh ./run.sh
```

### Errores comunes durante la instalación:

*   Could not resolve dependency (en alguna de las librerias durante la instalación)
    Solución: verifique que haya conexión a internet.

*   Permission denied
    Solución: Asegurese de tener acceso root al instalar el sistema.

### Errores comunes en stdout durante el uso del sistema:

*   ECONNREFUSED: Durante la conexión con otro peer.
    Explicación: El otro peer se desconectó de la red.

*   ECONNREJECTED: Durante el uso del sistema, cuando otro peer entra a la red.
    Explicación: Otra aplicación respondió el handshake inicial pero no siguió con con la conexión HTTPS.


Suerte y que te diviertas usando el sistema!
Que te diviertas usando el sistema!