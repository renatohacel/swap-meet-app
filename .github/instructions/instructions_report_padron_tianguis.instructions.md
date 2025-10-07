---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

Quiero generar un reporte similar al que ya vienes creando anteriormente.

Con la fecha que se generó, el día que es el tianguis que viene en el JSON y los campos del siguiente JSON:

```
[
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-1.00-1.00",
    "titular": ". . ROL",
    "giro": "ROL",
    "dimension": 4
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-2.00-1.00",
    "titular": ". . ROL",
    "giro": "ROL",
    "dimension": 3
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-3.00-1.00",
    "titular": "GARCIA PEÑA RIGOBERTO",
    "giro": "TACOS DE BIRRIA",
    "dimension": 9
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-6.00-1.00",
    "titular": ". . ROL",
    "giro": "ROL",
    "dimension": 3.7
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-7.00-1.00",
    "titular": "CONCHAS MERCADO JUAN CARLOS",
    "giro": "BISUTERIA",
    "dimension": 3
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-8.00-1.00",
    "titular": "BALLESTEROS SANTIAGO ROSA MARIA",
    "giro": "ROPA",
    "dimension": 6
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-9.00-1.00",
    "titular": "CASTELLANOS FLORES SERGIO",
    "giro": "ROPA",
    "dimension": 5
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-12.00-1.00",
    "titular": ". . ROL",
    "giro": "ROL",
    "dimension": 3
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-13.00-1.00",
    "titular": "BLAS  OCHOA AMELIA",
    "giro": "JUGUETES, ROPA",
    "dimension": 2
  },
  {
    "nombre_tianguis": "BALCONES DE LA CANTERA",
    "dia_labora": "Lunes",
    "puesto": "A-13.10-1.00",
    "titular": "ANDRADE JIMENEZ YOLANDA",
    "giro": "CDS. ORIGINALES",
    "dimension": 2
  }
]
```

Entonces, en la parte superior, debe ir la fecha en que se generó y el día en que labora "dia_labora", el "nombre_tianguis" seguido de columnas con los nombres alusivos a la key del objeto, excepto "dia_labora" y "nombre_tianguis".

Hazlo cómo los demás reportes que hemos venido creando, manteniendo el estilo y orden.

