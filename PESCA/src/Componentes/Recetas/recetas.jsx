import './recetas.css';
import React, { useState } from 'react';

const productos = [
  "Filet de Merluza",
  "Filet de Gatuzo",
  "Filet de Lenguado",
  "Filet de Salmón Rosado",
  "Filet de Abadejo",
  "Filet de Pez Angel (pollo de mar)",
  "Filet de Pez Gallo",
  "Filet de Trucha",
  "Filet de Merluza ( Rebozado )",
  "Filet de Merluza ( Rebozado sin Sal )",
  "Filet de Brotola ( Rebozado )",
  "Lomos de Brótola ( Rebozado )",
  "Cornalitos",
  "Rabas",
  "Molido De Merluza",
  "Corvina",
  "Mero",
  "Lisa",
  "Salmon Blanco",
  "Abadejo",
  "Chernia",
  "Palometa",
  "Anchoa",
  "Pescadilla",
  "Gatuzo ( Lomo De Atun )",
  "Pez Pavo",
  "Merluza",
  "Trucha ( Despinada )",
  "Sabalo",
  "Filet de Brotola",
  "Boga",
  "Pati",
  "Dorado",
  "Surubi",
  "Pacu",
  "Calamares",
  "Salmon Blanco ( Rodajas )",
  "Atun Nacional ( Rodajas )",
  "Pati ( Rodajas )",
  "Surubi ( Rodajas )",
  "Abadejo ( Rodajas )",
  "Camarones Pelados Cocidos",
  "Langostinos Pelados Cocidos",
  "Mejillones Pelados Cocidos",
  "Berberechos Pelados Cocidos",
  "Vieyras Peladas Cocidas",
  "Langostinos Enteros Cocidos",
  "Mejillones Con Cascara Cocido",
  "Cazuelas Cocidas",
  "Calamaretis",
  "Kanikama",
  "Kanikama Ahumado",
  "Kanikama Familiar",
  "Salmon Rosado Ahumado",
  "Tinta Calamar",
  "Pulpo Español",
  "Trillas Limpias",
  "Hamburguesas Sin Sal Naturales",
  "Hamburguesas Rebozadas De Merluza",
  "Hamburguesas Rebozadas De Merluza Con Espinaca",
  "Hamburguesas De Merluza Crocantes",
  "Langostinos Rebozados",
  "Rabas Rebozadas",
  "Merluza"
];

const recetasPorProducto = {
  "Filet de Merluza": [
    {
      nombre: "Milanesa de Merluza",
      descripcion: "Filetes empanados y fritos, acompañados de papas fritas.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de merluza", cantidad: "800 g" },
        { nombre: "Huevos", cantidad: "2" },
        { nombre: "Pan rallado", cantidad: "200 g" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Secar los filetes y salpimentar por ambos lados.", tiempo: "2 min" },
        { texto: "Batir los huevos con el ajo y el perejil.", tiempo: "2 min" },
        { texto: "Pasar los filetes por huevo y luego por pan rallado, presionando bien.", tiempo: "5 min" },
        { texto: "Freír en abundante aceite caliente hasta dorar (aprox. 3 minutos por lado).", tiempo: "6 min" },
        { texto: "Escurrir sobre papel absorbente.", tiempo: "1 min" },
        { texto: "Servir con rodajas de limón y papas fritas.", tiempo: "—" }
      ],
      aderezo: "Se recomienda acompañar con mayonesa casera o salsa tártara."
    },
    {
      nombre: "Merluza al Horno con Verduras",
      descripcion: "Filetes horneados con vegetales frescos.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de merluza", cantidad: "800 g" },
        { nombre: "Papas", cantidad: "2 medianas" },
        { nombre: "Zanahoria", cantidad: "1" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Morrón rojo", cantidad: "1/2" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Vino blanco", cantidad: "50 ml" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Perejil fresco", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Pelar y cortar las papas y zanahoria en rodajas finas.", tiempo: "5 min" },
        { texto: "Cortar la cebolla y el morrón en tiras.", tiempo: "3 min" },
        { texto: "En una fuente para horno, colocar las verduras, rociar con aceite de oliva, salpimentar y hornear a 180°C por 15 minutos.", tiempo: "15 min" },
        { texto: "Colocar los filetes sobre las verduras, rociar con vino blanco y hornear 15 minutos más.", tiempo: "15 min" },
        { texto: "Espolvorear con perejil fresco antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Ideal acompañar con un chorrito de jugo de limón."
    },
    {
      nombre: "Merluza a la Provenzal",
      descripcion: "Filetes salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de merluza", cantidad: "400 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Salpimentar los filetes.", tiempo: "1 min" },
        { texto: "En una sartén, calentar el aceite y dorar el ajo.", tiempo: "2 min" },
        { texto: "Agregar los filetes y cocinar 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Espolvorear con perejil y rociar con jugo de limón antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Se puede acompañar con arroz blanco o puré de papas."
    },
    {
      nombre: "Cazuela de Merluza",
      descripcion: "Guiso de merluza con papas y verduras.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de merluza", cantidad: "800 g" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Morrón", cantidad: "1" },
        { nombre: "Tomate", cantidad: "2" },
        { nombre: "Ajo", cantidad: "2 dientes" },
        { nombre: "Caldo de pescado", cantidad: "500 ml" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas en cubos y hervir hasta que estén tiernas.", tiempo: "10 min" },
        { texto: "Saltear la cebolla, morrón y ajo en aceite.", tiempo: "5 min" },
        { texto: "Agregar el tomate picado y cocinar 5 minutos.", tiempo: "5 min" },
        { texto: "Incorporar las papas, el caldo y la merluza en trozos.", tiempo: "2 min" },
        { texto: "Cocinar a fuego bajo 10 minutos.", tiempo: "10 min" }
      ],
      aderezo: "Espolvorear con perejil fresco antes de servir."
    }
  ],
  "Filet de Gatuzo": [
    {
      nombre: "Gatuzo al Horno con Papas",
      descripcion: "Filetes de gatuzo horneados con papas, cebolla y morrón.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de gatuzo", cantidad: "800 g" },
        { nombre: "Papas", cantidad: "3 medianas" },
        { nombre: "Cebolla", cantidad: "1 grande" },
        { nombre: "Morrón rojo", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Vino blanco", cantidad: "50 ml" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Perejil fresco", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Pelar y cortar las papas en rodajas finas.", tiempo: "5 min" },
        { texto: "Cortar la cebolla y el morrón en tiras.", tiempo: "3 min" },
        { texto: "En una fuente para horno, colocar las papas, cebolla y morrón. Rociar con aceite, salpimentar y hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar los filetes de gatuzo, rociar con vino blanco y hornear 15 minutos más.", tiempo: "15 min" },
        { texto: "Espolvorear con perejil fresco antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con rodajas de limón y ensalada fresca."
    },
    {
      nombre: "Gatuzo a la Provenzal",
      descripcion: "Filetes de gatuzo salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de gatuzo", cantidad: "400 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Salpimentar los filetes.", tiempo: "1 min" },
        { texto: "Calentar el aceite y dorar el ajo.", tiempo: "2 min" },
        { texto: "Agregar los filetes y cocinar 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Espolvorear con perejil y rociar con jugo de limón antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con arroz blanco o papas al vapor."
    },
    {
      nombre: "Gatuzo en Salsa de Tomate",
      descripcion: "Filetes de gatuzo en salsa de tomate casera.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de gatuzo", cantidad: "800 g" },
        { nombre: "Tomate triturado", cantidad: "400 g" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Ajo", cantidad: "2 dientes" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Orégano", cantidad: "1 cda" }
      ],
      pasos: [
        { texto: "Picar la cebolla y el ajo. Saltear en aceite hasta dorar.", tiempo: "5 min" },
        { texto: "Agregar el tomate triturado, salpimentar y cocinar 10 minutos.", tiempo: "10 min" },
        { texto: "Incorporar los filetes y cocinar 8 minutos, girando a mitad de cocción.", tiempo: "8 min" },
        { texto: "Espolvorear con orégano antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Servir con arroz blanco o puré de papas."
    }
  ],
  "Filet de Lenguado": [
    {
      nombre: "Lenguado a la Manteca Negra",
      descripcion: "Filetes con manteca, limón y alcaparras.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de lenguado", cantidad: "400 g" },
        { nombre: "Manteca", cantidad: "50 g" },
        { nombre: "Jugo de limón", cantidad: "2 cdas" },
        { nombre: "Alcaparras", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Perejil picado", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Secar los filetes y salpimentar.", tiempo: "2 min" },
        { texto: "Derretir la manteca en sartén y dorar los filetes 2 minutos por lado.", tiempo: "4 min" },
        { texto: "Agregar jugo de limón y alcaparras, cocinar 1 minuto más.", tiempo: "1 min" },
        { texto: "Espolvorear con perejil antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor."
    },
    {
      nombre: "Lenguado al Horno con Verduras",
      descripcion: "Filetes horneados con vegetales frescos.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de lenguado", cantidad: "800 g" },
        { nombre: "Zucchini", cantidad: "1" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Morrón amarillo", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las verduras en rodajas y colocar en fuente para horno.", tiempo: "5 min" },
        { texto: "Rociar con aceite, salpimentar y hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar los filetes y hornear 10 minutos más.", tiempo: "10 min" }
      ],
      aderezo: "Servir con jugo de limón y perejil fresco."
    },
    {
      nombre: "Lenguado a la Provenzal",
      descripcion: "Filetes con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de lenguado", cantidad: "400 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite.", tiempo: "2 min" },
        { texto: "Agregar los filetes y cocinar 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Espolvorear con perejil antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con arroz blanco."
    }
  ],
  "Filet de Salmón Rosado": [
    {
      nombre: "Salmón Rosado a la Parrilla",
      descripcion: "Filetes grillados con limón y hierbas.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de salmón rosado", cantidad: "500 g" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Eneldo fresco", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Pincelar los filetes con aceite de oliva y salpimentar.", tiempo: "2 min" },
        { texto: "Colocar los filetes en la parrilla caliente, cocinar 4 minutos por lado.", tiempo: "8 min" },
        { texto: "Rociar con jugo de limón y espolvorear eneldo antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada fresca y rodajas de limón."
    },
    {
      nombre: "Salmón Rosado al Horno",
      descripcion: "Filetes horneados con vegetales y vino blanco.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de salmón rosado", cantidad: "800 g" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Zucchini", cantidad: "1" },
        { nombre: "Morrón rojo", cantidad: "1" },
        { nombre: "Vino blanco", cantidad: "50 ml" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar los vegetales en rodajas y colocar en una fuente para horno.", tiempo: "5 min" },
        { texto: "Rociar con aceite, salpimentar y hornear 10 minutos a 180°C.", tiempo: "10 min" },
        { texto: "Agregar los filetes, rociar con vino blanco y hornear 12 minutos más.", tiempo: "12 min" }
      ],
      aderezo: "Servir con perejil fresco picado."
    },
    {
      nombre: "Salmón Rosado en Salsa de Mostaza",
      descripcion: "Filetes de salmón en salsa cremosa de mostaza.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de salmón rosado", cantidad: "400 g" },
        { nombre: "Crema de leche", cantidad: "100 ml" },
        { nombre: "Mostaza", cantidad: "1 cda" },
        { nombre: "Jugo de limón", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Salpimentar los filetes y dorar en sartén con un poco de aceite.", tiempo: "6 min" },
        { texto: "Mezclar la crema con la mostaza y el jugo de limón.", tiempo: "2 min" },
        { texto: "Agregar la salsa a la sartén y cocinar 2 minutos más.", tiempo: "2 min" }
      ],
      aderezo: "Ideal con arroz blanco o papas al vapor."
    }
  ],
  "Filet de Abadejo": [
    {
      nombre: "Abadejo al Horno con Papas",
      descripcion: "Filetes horneados con papas y cebolla.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de abadejo", cantidad: "800 g" },
        { nombre: "Papas", cantidad: "3 medianas" },
        { nombre: "Cebolla", cantidad: "1 grande" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Perejil fresco", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Pelar y cortar las papas en rodajas finas y la cebolla en pluma.", tiempo: "5 min" },
        { texto: "Colocar en fuente para horno, rociar con aceite y salpimentar. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar los filetes, hornear 12 minutos más y espolvorear con perejil.", tiempo: "12 min" }
      ],
      aderezo: "Servir con rodajas de limón."
    },
    {
      nombre: "Abadejo a la Provenzal",
      descripcion: "Filetes de abadejo salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de abadejo", cantidad: "400 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite de oliva.", tiempo: "2 min" },
        { texto: "Agregar los filetes y cocinar 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Espolvorear con perejil antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con arroz blanco."
    },
    {
      nombre: "Abadejo en Salsa de Tomate",
      descripcion: "Filetes de abadejo en salsa de tomate casera.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de abadejo", cantidad: "800 g" },
        { nombre: "Tomate triturado", cantidad: "400 g" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Ajo", cantidad: "2 dientes" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Orégano", cantidad: "1 cda" }
      ],
      pasos: [
        { texto: "Picar la cebolla y el ajo. Saltear en aceite hasta dorar.", tiempo: "5 min" },
        { texto: "Agregar el tomate triturado, salpimentar y cocinar 10 minutos.", tiempo: "10 min" },
        { texto: "Incorporar los filetes y cocinar 8 minutos, girando a mitad de cocción.", tiempo: "8 min" },
        { texto: "Espolvorear con orégano antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Servir con puré de papas o arroz."
    }
  ],
  "Filet de Trucha": [
    {
      nombre: "Trucha a la Manteca y Almendras",
      descripcion: "Filetes con manteca y almendras tostadas.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de trucha", cantidad: "400 g" },
        { nombre: "Manteca", cantidad: "40 g" },
        { nombre: "Almendras fileteadas", cantidad: "30 g" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Jugo de limón", cantidad: "1 cda" }
      ],
      pasos: [
        { texto: "Salpimentar los filetes y dorar en manteca 2 minutos por lado.", tiempo: "4 min" },
        { texto: "Agregar las almendras y cocinar 1 minuto más.", tiempo: "1 min" },
        { texto: "Rociar con jugo de limón antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con puré de papas."
    },
    {
      nombre: "Trucha al Horno con Hierbas",
      descripcion: "Filetes horneados con hierbas frescas.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de trucha", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Hierbas frescas (tomillo, perejil)", cantidad: "a gusto" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Colocar los filetes en fuente para horno, salpimentar y rociar con aceite.", tiempo: "2 min" },
        { texto: "Espolvorear con hierbas y hornear 12 minutos a 180°C.", tiempo: "12 min" },
        { texto: "Servir con rodajas de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    },
    {
      nombre: "Trucha a la Plancha",
      descripcion: "Filetes de trucha cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de trucha", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor."
    }
  ],
  "Rabas": [
    {
      nombre: "Rabas a la Romana",
      descripcion: "Anillas de calamar rebozadas y fritas.",
      personas: 4,
      ingredientes: [
        { nombre: "Tubo de calamar", cantidad: "500 g" },
        { nombre: "Harina", cantidad: "100 g" },
        { nombre: "Huevos", cantidad: "2" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Sal", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Cortar el calamar en anillas y salar.", tiempo: "3 min" },
        { texto: "Pasar por harina y luego por huevo batido.", tiempo: "4 min" },
        { texto: "Freír en aceite caliente hasta dorar.", tiempo: "4 min" },
        { texto: "Escurrir sobre papel y servir con limón.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con mayonesa o salsa tártara."
    },
    {
      nombre: "Rabas al Ajillo",
      descripcion: "Anillas de calamar salteadas con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Tubo de calamar", cantidad: "300 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite de oliva.", tiempo: "2 min" },
        { texto: "Agregar las rabas y cocinar 3 minutos.", tiempo: "3 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Ideal como entrada."
    },
    {
      nombre: "Rabas a la Provenzal",
      descripcion: "Anillas de calamar con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Tubo de calamar", cantidad: "300 g" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite.", tiempo: "2 min" },
        { texto: "Agregar las rabas y cocinar 2 minutos.", tiempo: "2 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con limón."
    }
  ],
  "Camarones Pelados Cocidos": [
    {
      nombre: "Camarones al Ajillo",
      descripcion: "Camarones salteados con ajo y perejil.",
      pasos: [
        "Saltear ajo en aceite de oliva.",
        "Agregar los camarones y cocinar 2 minutos.",
        "Espolvorear con perejil picado."
      ]
    }
  ],
  "Hamburguesas De Merluza Crocantes": [
    {
      nombre: "Hamburguesa de Merluza Crocante",
      descripcion: "Hamburguesa de merluza rebozada y frita.",
      pasos: [
        "Pasar la hamburguesa por huevo y pan rallado.",
        "Freír en aceite caliente hasta dorar.",
        "Servir en pan con lechuga y tomate."
      ]
    }
  ],
  // Más recetas
  "Filet de Brotola": [
    {
      nombre: "Brótola al Horno con Limón",
      descripcion: "Filetes de brótola horneados con limón y hierbas.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de brótola", cantidad: "800 g" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Perejil fresco", cantidad: "a gusto" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Colocar los filetes en una fuente, salpimentar y rociar con aceite y jugo de limón.", tiempo: "3 min" },
        { texto: "Hornear durante 18 minutos.", tiempo: "18 min" },
        { texto: "Espolvorear con perejil fresco antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor o ensalada fresca."
    },
    {
      nombre: "Brótola a la Provenzal",
      descripcion: "Filetes de brótola salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de brótola", cantidad: "400 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite de oliva.", tiempo: "2 min" },
        { texto: "Agregar los filetes y cocinar 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Espolvorear con perejil antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con arroz blanco."
    }
  ],
  "Corvina": [
    {
      nombre: "Corvina al Horno con Papas",
      descripcion: "Corvina entera horneada con papas y cebolla.",
      personas: 4,
      ingredientes: [
        { nombre: "Corvina entera limpia", cantidad: "1.2 kg" },
        { nombre: "Papas", cantidad: "3 medianas" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "3 cdas" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Cortar las papas y la cebolla en rodajas y colocar en una fuente.", tiempo: "5 min" },
        { texto: "Salpimentar y rociar con aceite. Hornear 15 minutos.", tiempo: "15 min" },
        { texto: "Colocar la corvina sobre las papas, rociar con jugo de limón y hornear 25 minutos más.", tiempo: "25 min" }
      ],
      aderezo: "Servir con perejil fresco y rodajas de limón."
    }
  ],
  "Pacu": [
    {
      nombre: "Pacú a la Parrilla",
      descripcion: "Rodajas de pacú asadas a la parrilla.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de pacú", cantidad: "1 kg" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar las rodajas con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 8 minutos por lado.", tiempo: "16 min" },
        { texto: "Servir con jugo de limón y ensalada fresca.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada de hojas verdes."
    }
  ],
  "Surubi": [
    {
      nombre: "Surubí en Salsa de Verdeo",
      descripcion: "Filetes de surubí con salsa de cebolla de verdeo y crema.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de surubí", cantidad: "800 g" },
        { nombre: "Cebolla de verdeo", cantidad: "2" },
        { nombre: "Crema de leche", cantidad: "100 ml" },
        { nombre: "Manteca", cantidad: "30 g" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear la cebolla de verdeo en manteca.", tiempo: "3 min" },
        { texto: "Agregar la crema y cocinar 2 minutos.", tiempo: "2 min" },
        { texto: "Incorporar los filetes y cocinar 5 minutos.", tiempo: "5 min" }
      ],
      aderezo: "Servir con arroz blanco."
    }
  ],
  "Vieyras Peladas Cocidas": [
    {
      nombre: "Vieyras Gratinadas",
      descripcion: "Vieyras gratinadas al horno con queso.",
      personas: 2,
      ingredientes: [
        { nombre: "Vieyras peladas", cantidad: "300 g" },
        { nombre: "Queso rallado", cantidad: "50 g" },
        { nombre: "Manteca", cantidad: "20 g" },
        { nombre: "Perejil picado", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Colocar las vieyras en una fuente para horno.", tiempo: "2 min" },
        { texto: "Cubrir con queso rallado y trocitos de manteca.", tiempo: "2 min" },
        { texto: "Gratinar en horno fuerte 5 minutos.", tiempo: "5 min" }
      ],
      aderezo: "Espolvorear con perejil fresco antes de servir."
    }
  ],
  "Calamares": [
    {
      nombre: "Calamares a la Plancha",
      descripcion: "Calamares frescos cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Calamares limpios", cantidad: "500 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar los calamares en anillas.", tiempo: "2 min" },
        { texto: "Calentar la plancha, agregar aceite y ajo.", tiempo: "2 min" },
        { texto: "Cocinar los calamares 2 minutos por lado.", tiempo: "4 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con rodajas de limón."
    }
  ],"Mero": [
    {
      nombre: "Mero al Horno con Limón",
      descripcion: "Filetes de mero horneados con limón y hierbas.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de mero", cantidad: "800 g" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Perejil fresco", cantidad: "a gusto" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Colocar los filetes en una fuente, salpimentar y rociar con aceite y jugo de limón.", tiempo: "3 min" },
        { texto: "Hornear durante 18 minutos.", tiempo: "18 min" },
        { texto: "Espolvorear con perejil fresco antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor o ensalada fresca."
    }
  ],
  "Lisa": [
    {
      nombre: "Lisa a la Parrilla",
      descripcion: "Filetes de lisa asados a la parrilla con limón.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de lisa", cantidad: "800 g" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar los filetes con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 5 minutos por lado.", tiempo: "10 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Salmon Blanco": [
    {
      nombre: "Salmón Blanco al Vapor",
      descripcion: "Filetes de salmón blanco cocidos al vapor con verduras.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de salmón blanco", cantidad: "400 g" },
        { nombre: "Zanahoria", cantidad: "1" },
        { nombre: "Brócoli", cantidad: "100 g" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Cortar las verduras en trozos y colocar en la vaporera.", tiempo: "3 min" },
        { texto: "Agregar los filetes, salpimentar y cocinar 10 minutos.", tiempo: "10 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con arroz blanco."
    }
  ],
  "Chernia": [
    {
      nombre: "Chernia al Horno",
      descripcion: "Filetes de chernia horneados con papas y cebolla.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de chernia", cantidad: "800 g" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas y la cebolla en rodajas.", tiempo: "3 min" },
        { texto: "Colocar en fuente para horno, rociar con aceite y salpimentar. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar los filetes y hornear 12 minutos más.", tiempo: "12 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],
  "Palometa": [
    {
      nombre: "Palometa a la Plancha",
      descripcion: "Filetes de palometa cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de palometa", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con papas al vapor."
    }
  ],
  "Anchoa": [
    {
      nombre: "Anchoas en Aceite",
      descripcion: "Anchoas marinadas en aceite de oliva.",
      personas: 2,
      ingredientes: [
        { nombre: "Anchoas frescas", cantidad: "200 g" },
        { nombre: "Aceite de oliva", cantidad: "100 ml" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" }
      ],
      pasos: [
        { texto: "Limpiar las anchoas y filetear.", tiempo: "5 min" },
        { texto: "Colocar en un frasco con ajo, perejil y cubrir con aceite.", tiempo: "2 min" },
        { texto: "Dejar reposar en heladera al menos 2 horas.", tiempo: "2 h" }
      ],
      aderezo: "Servir como entrada o sobre tostadas."
    }
  ],
  "Pescadilla": [
    {
      nombre: "Pescadilla al Horno",
      descripcion: "Pescadilla entera horneada con limón.",
      personas: 4,
      ingredientes: [
        { nombre: "Pescadilla entera limpia", cantidad: "1 kg" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Colocar la pescadilla en fuente, salpimentar y rociar con aceite y jugo de limón.", tiempo: "3 min" },
        { texto: "Hornear durante 25 minutos.", tiempo: "25 min" }
      ],
      aderezo: "Acompañar con ensalada fresca."
    }],"Langostinos Pelados Cocidos": [
    {
      nombre: "Langostinos al Ajillo",
      descripcion: "Langostinos salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Langostinos pelados cocidos", cantidad: "300 g" },
        { nombre: "Ajo picado", cantidad: "2 dientes" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Perejil picado", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite de oliva.", tiempo: "2 min" },
        { texto: "Agregar los langostinos y cocinar 2 minutos.", tiempo: "2 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con arroz blanco o pan tostado."
    }
  ],
  "Mejillones Pelados Cocidos": [
    {
      nombre: "Mejillones a la Provenzal",
      descripcion: "Mejillones salteados con ajo y perejil.",
      personas: 2,
      ingredientes: [
        { nombre: "Mejillones pelados cocidos", cantidad: "300 g" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Saltear el ajo en aceite de oliva.", tiempo: "2 min" },
        { texto: "Agregar los mejillones y cocinar 2 minutos.", tiempo: "2 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Servir como entrada o sobre tostadas."
    }
  ],
  "Berberechos Pelados Cocidos": [
    {
      nombre: "Berberechos al Limón",
      descripcion: "Berberechos cocidos con jugo de limón.",
      personas: 2,
      ingredientes: [
        { nombre: "Berberechos pelados cocidos", cantidad: "200 g" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Colocar los berberechos en un bol.", tiempo: "1 min" },
        { texto: "Agregar jugo de limón, aceite, sal y pimienta.", tiempo: "2 min" },
        { texto: "Mezclar y servir frío.", tiempo: "1 min" }
      ],
      aderezo: "Ideal como entrada fresca."
    }
  ],
  "Langostinos Enteros Cocidos": [
    {
      nombre: "Langostinos Enteros Hervidos",
      descripcion: "Langostinos hervidos y servidos con salsa golf.",
      personas: 2,
      ingredientes: [
        { nombre: "Langostinos enteros cocidos", cantidad: "400 g" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Salsa golf", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Servir los langostinos fríos acompañados de limón y salsa golf.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con hojas verdes."
    }
  ],
  "Mejillones Con Cascara Cocido": [
    {
      nombre: "Mejillones al Vapor",
      descripcion: "Mejillones cocidos al vapor con vino blanco.",
      personas: 2,
      ingredientes: [
        { nombre: "Mejillones con cáscara cocidos", cantidad: "500 g" },
        { nombre: "Vino blanco", cantidad: "50 ml" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" }
      ],
      pasos: [
        { texto: "Colocar los mejillones en una olla con vino y ajo.", tiempo: "2 min" },
        { texto: "Tapar y cocinar a fuego medio hasta que se abran.", tiempo: "5 min" },
        { texto: "Espolvorear con perejil y servir.", tiempo: "1 min" }
      ],
      aderezo: "Servir con pan tostado."
    }
  ],
  "Cazuelas Cocidas": [
    {
      nombre: "Cazuela de Mariscos",
      descripcion: "Cazuela de mariscos lista para calentar y servir.",
      personas: 2,
      ingredientes: [
        { nombre: "Cazuela de mariscos cocida", cantidad: "500 g" }
      ],
      pasos: [
        { texto: "Calentar la cazuela en olla a fuego bajo hasta que hierva.", tiempo: "8 min" },
        { texto: "Servir caliente.", tiempo: "—" }
      ],
      aderezo: "Acompañar con pan."
    }
  ],
  "Calamaretis": [
    {
      nombre: "Calamaretis Fritos",
      descripcion: "Calamaretis rebozados y fritos.",
      personas: 2,
      ingredientes: [
        { nombre: "Calamaretis limpios", cantidad: "300 g" },
        { nombre: "Harina", cantidad: "50 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Sal", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Secar los calamaretis y salar.", tiempo: "2 min" },
        { texto: "Pasar por harina y freír en aceite caliente.", tiempo: "4 min" },
        { texto: "Escurrir y servir con limón.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con mayonesa."
    }
  ],
  "Kanikama": [
    {
      nombre: "Kanikama en Ensalada",
      descripcion: "Bastones de kanikama en ensalada fresca.",
      personas: 2,
      ingredientes: [
        { nombre: "Kanikama", cantidad: "8 bastones" },
        { nombre: "Lechuga", cantidad: "1 planta" },
        { nombre: "Tomate", cantidad: "1" },
        { nombre: "Zanahoria rallada", cantidad: "1/2" },
        { nombre: "Aceite y vinagre", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar el kanikama en trozos.", tiempo: "2 min" },
        { texto: "Mezclar con las verduras y aliñar.", tiempo: "3 min" }
      ],
      aderezo: "Servir fría."
    }
  ],
  "Kanikama Ahumado": [
    {
      nombre: "Kanikama Ahumado en Canapés",
      descripcion: "Canapés frescos con kanikama ahumado y queso crema.",
      personas: 4,
      ingredientes: [
        { nombre: "Kanikama ahumado", cantidad: "8 bastones" },
        { nombre: "Queso crema", cantidad: "100 g" },
        { nombre: "Pan de molde", cantidad: "8 rebanadas" },
        { nombre: "Eneldo fresco", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Untar el pan con queso crema.", tiempo: "2 min" },
        { texto: "Colocar kanikama ahumado y espolvorear eneldo.", tiempo: "2 min" },
        { texto: "Cortar en triángulos y servir.", tiempo: "2 min" }
      ],
      aderezo: "Ideal como entrada fría."
    }
  ],
  "Kanikama Familiar": [
    {
      nombre: "Ensalada Familiar de Kanikama",
      descripcion: "Ensalada fresca con kanikama, arroz y vegetales.",
      personas: 4,
      ingredientes: [
        { nombre: "Kanikama", cantidad: "16 bastones" },
        { nombre: "Arroz blanco cocido", cantidad: "2 tazas" },
        { nombre: "Zanahoria rallada", cantidad: "1" },
        { nombre: "Choclo", cantidad: "1 taza" },
        { nombre: "Mayonesa", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar el kanikama en trozos.", tiempo: "2 min" },
        { texto: "Mezclar con arroz, zanahoria y choclo.", tiempo: "3 min" },
        { texto: "Agregar mayonesa y servir frío.", tiempo: "2 min" }
      ],
      aderezo: "Perfecta para compartir en reuniones."
    }
  ],
  "Salmon Rosado Ahumado": [
    {
      nombre: "Tostadas con Salmón Ahumado",
      descripcion: "Tostadas con salmón rosado ahumado y palta.",
      personas: 2,
      ingredientes: [
        { nombre: "Salmón rosado ahumado", cantidad: "100 g" },
        { nombre: "Pan integral", cantidad: "4 rebanadas" },
        { nombre: "Palta", cantidad: "1" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Tostar el pan y untar con palta pisada.", tiempo: "3 min" },
        { texto: "Colocar el salmón ahumado encima.", tiempo: "1 min" },
        { texto: "Rociar con jugo de limón y servir.", tiempo: "1 min" }
      ],
      aderezo: "Decorar con eneldo o ciboulette."
    }
  ],
  "Tinta Calamar": [
    {
      nombre: "Arroz Negro con Tinta de Calamar",
      descripcion: "Arroz cremoso cocido con tinta de calamar.",
      personas: 4,
      ingredientes: [
        { nombre: "Arroz", cantidad: "300 g" },
        { nombre: "Tinta de calamar", cantidad: "2 sobres" },
        { nombre: "Calamares", cantidad: "300 g" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Ajo", cantidad: "2 dientes" },
        { nombre: "Caldo de pescado", cantidad: "700 ml" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" }
      ],
      pasos: [
        { texto: "Saltear cebolla y ajo en aceite.", tiempo: "3 min" },
        { texto: "Agregar calamares y arroz, rehogar.", tiempo: "3 min" },
        { texto: "Añadir la tinta y el caldo poco a poco, cocinar hasta que el arroz esté tierno.", tiempo: "18 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],
  "Pulpo Español": [
    {
      nombre: "Pulpo a la Gallega",
      descripcion: "Pulpo cocido servido con papas, pimentón y aceite de oliva.",
      personas: 4,
      ingredientes: [
        { nombre: "Pulpo cocido", cantidad: "500 g" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Pimentón dulce", cantidad: "1 cda" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal gruesa", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Hervir las papas y cortarlas en rodajas.", tiempo: "10 min" },
        { texto: "Cortar el pulpo en rodajas y colocar sobre las papas.", tiempo: "2 min" },
        { texto: "Espolvorear con pimentón, sal y rociar con aceite.", tiempo: "2 min" }
      ],
      aderezo: "Servir tibio como entrada."
    }
  ],
  "Trillas Limpias": [
    {
      nombre: "Trillas Fritas",
      descripcion: "Trillas limpias rebozadas y fritas.",
      personas: 2,
      ingredientes: [
        { nombre: "Trillas limpias", cantidad: "400 g" },
        { nombre: "Harina", cantidad: "50 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Secar las trillas, salar y pasar por harina.", tiempo: "3 min" },
        { texto: "Freír en aceite caliente hasta dorar.", tiempo: "5 min" },
        { texto: "Escurrir y servir.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con rodajas de limón."
    }
  ],
  "Hamburguesas Sin Sal Naturales": [
    {
      nombre: "Hamburguesas Naturales de Merluza",
      descripcion: "Hamburguesas de merluza sin sal, ideales para dietas.",
      personas: 2,
      ingredientes: [
        { nombre: "Hamburguesas de merluza sin sal", cantidad: "2" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Lechuga y tomate", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cocinar las hamburguesas en sartén con aceite.", tiempo: "6 min" },
        { texto: "Servir en pan con lechuga y tomate.", tiempo: "2 min" }
      ],
      aderezo: "Ideal para una comida saludable."
    }
  ],
  "Hamburguesas Rebozadas De Merluza": [
    {
      nombre: "Hamburguesas Rebozadas",
      descripcion: "Hamburguesas de merluza rebozadas y fritas.",
      personas: 2,
      ingredientes: [
        { nombre: "Hamburguesas rebozadas de merluza", cantidad: "2" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Pan de hamburguesa", cantidad: "2" }
      ],
      pasos: [
        { texto: "Freír las hamburguesas hasta dorar.", tiempo: "6 min" },
        { texto: "Servir en pan con acompañamientos a gusto.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con papas fritas."
    }
  ],
  "Hamburguesas Rebozadas De Merluza Con Espinaca": [
    {
      nombre: "Hamburguesas de Merluza y Espinaca",
      descripcion: "Hamburguesas rebozadas con espinaca.",
      personas: 2,
      ingredientes: [
        { nombre: "Hamburguesas de merluza con espinaca", cantidad: "2" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" }
      ],
      pasos: [
        { texto: "Freír las hamburguesas hasta dorar.", tiempo: "6 min" }
      ],
      aderezo: "Servir con ensalada fresca."
    }
  ],
  "Langostinos Rebozados": [
    {
      nombre: "Langostinos Rebozados",
      descripcion: "Langostinos empanados y fritos.",
      personas: 2,
      ingredientes: [
        { nombre: "Langostinos rebozados", cantidad: "300 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Freír los langostinos en aceite caliente hasta dorar.", tiempo: "4 min" },
        { texto: "Escurrir y servir con limón.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con salsa tártara."
    }
  ],
  "Rabas Rebozadas": [
    {
      nombre: "Rabas Rebozadas",
      descripcion: "Aros de calamar rebozados y fritos.",
      personas: 2,
      ingredientes: [
        { nombre: "Rabas rebozadas", cantidad: "300 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Freír las rabas en aceite caliente hasta dorar.", tiempo: "4 min" },
        { texto: "Escurrir y servir con limón.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con mayonesa o salsa tártara."
    }
  ],
  // Recetas genéricas para productos sin receta específica
  "Filet de Pez Angel (pollo de mar)": [
    {
      nombre: "Pez Angel al Horno",
      descripcion: "Filetes de pez angel horneados con limón y hierbas.",
      personas: 4,
      ingredientes: [
        { nombre: "Filetes de pez angel", cantidad: "800 g" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Perejil fresco", cantidad: "a gusto" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Colocar los filetes en una fuente, salpimentar y rociar con aceite y jugo de limón.", tiempo: "3 min" },
        { texto: "Hornear durante 18 minutos.", tiempo: "18 min" },
        { texto: "Espolvorear con perejil fresco antes de servir.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor o ensalada fresca."
    }
  ],
  "Filet de Pez Gallo": [
    {
      nombre: "Pez Gallo a la Plancha",
      descripcion: "Filetes de pez gallo cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de pez gallo", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Cornalitos": [
    {
      nombre: "Cornalitos Fritos",
      descripcion: "Cornalitos rebozados y fritos.",
      personas: 2,
      ingredientes: [
        { nombre: "Cornalitos", cantidad: "400 g" },
        { nombre: "Harina", cantidad: "50 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Secar los cornalitos y salar.", tiempo: "2 min" },
        { texto: "Pasar por harina y freír en aceite caliente.", tiempo: "4 min" },
        { texto: "Escurrir y servir con limón.", tiempo: "2 min" }
      ],
      aderezo: "Acompañar con mayonesa."
    }
  ],
  "Molido De Merluza": [
    {
      nombre: "Albóndigas de Merluza",
      descripcion: "Albóndigas de merluza con salsa de tomate.",
      personas: 4,
      ingredientes: [
        { nombre: "Molido de merluza", cantidad: "500 g" },
        { nombre: "Huevo", cantidad: "1" },
        { nombre: "Pan rallado", cantidad: "3 cdas" },
        { nombre: "Ajo picado", cantidad: "1 diente" },
        { nombre: "Perejil picado", cantidad: "1 cda" },
        { nombre: "Salsa de tomate", cantidad: "300 ml" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Mezclar el molido con huevo, pan rallado, ajo y perejil.", tiempo: "3 min" },
        { texto: "Formar albóndigas y dorar en sartén.", tiempo: "5 min" },
        { texto: "Agregar la salsa de tomate y cocinar 10 minutos.", tiempo: "10 min" }
      ],
      aderezo: "Servir con arroz o puré."
    }
  ],
  "Gatuzo ( Lomo De Atun )": [
    {
      nombre: "Gatuzo a la Plancha",
      descripcion: "Filetes de gatuzo cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de gatuzo", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Pez Pavo": [
    {
      nombre: "Pez Pavo al Horno",
      descripcion: "Pez pavo horneado con papas y cebolla.",
      personas: 4,
      ingredientes: [
        { nombre: "Pez pavo", cantidad: "1 kg" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas y cebolla en rodajas y colocar en fuente.", tiempo: "3 min" },
        { texto: "Salpimentar y rociar con aceite. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar el pez pavo y hornear 20 minutos más.", tiempo: "20 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],
  "Merluza": [
    {
      nombre: "Merluza a la Plancha",
      descripcion: "Filetes de merluza cocidos a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de merluza", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Trucha ( Despinada )": [
    {
      nombre: "Trucha Despinada al Horno",
      descripcion: "Trucha despinada horneada con hierbas.",
      personas: 2,
      ingredientes: [
        { nombre: "Trucha despinada", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Hierbas frescas", cantidad: "a gusto" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Colocar la trucha en fuente, salpimentar y rociar con aceite.", tiempo: "2 min" },
        { texto: "Espolvorear con hierbas y hornear 12 minutos a 180°C.", tiempo: "12 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con papas al vapor."
    }
  ],
  "Sabalo": [
    {
      nombre: "Sábalo a la Parrilla",
      descripcion: "Rodajas de sábalo asadas a la parrilla.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de sábalo", cantidad: "1 kg" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar las rodajas con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 8 minutos por lado.", tiempo: "16 min" },
        { texto: "Servir con jugo de limón y ensalada fresca.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada de hojas verdes."
    }
  ],
  "Boga": [
    {
      nombre: "Boga al Horno",
      descripcion: "Boga entera horneada con verduras.",
      personas: 4,
      ingredientes: [
        { nombre: "Boga entera limpia", cantidad: "1 kg" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas y cebolla en rodajas y colocar en fuente.", tiempo: "3 min" },
        { texto: "Salpimentar y rociar con aceite. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar la boga y hornear 25 minutos más.", tiempo: "25 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],
  "Pati": [
    {
      nombre: "Pati al Horno",
      descripcion: "Pati entero horneado con limón.",
      personas: 4,
      ingredientes: [
        { nombre: "Pati entero limpio", cantidad: "1 kg" },
        { nombre: "Limón", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Precalentar el horno a 180°C.", tiempo: "—" },
        { texto: "Colocar el pati en fuente, salpimentar y rociar con aceite y jugo de limón.", tiempo: "3 min" },
        { texto: "Hornear durante 25 minutos.", tiempo: "25 min" }
      ],
      aderezo: "Acompañar con ensalada fresca."
    }
  ],
  "Dorado": [
    {
      nombre: "Dorado a la Parrilla",
      descripcion: "Dorado entero asado a la parrilla.",
      personas: 4,
      ingredientes: [
        { nombre: "Dorado entero limpio", cantidad: "1.2 kg" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar el dorado con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 10 minutos por lado.", tiempo: "20 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada fresca."
    }
  ],
  "Surubi ( Rodajas )": [
    {
      nombre: "Surubí a la Parrilla",
      descripcion: "Rodajas de surubí asadas a la parrilla.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de surubí", cantidad: "1 kg" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar las rodajas con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 8 minutos por lado.", tiempo: "16 min" },
        { texto: "Servir con jugo de limón y ensalada fresca.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada de hojas verdes."
    }
  ],
  "Pati ( Rodajas )": [
    {
      nombre: "Rodajas de Pati a la Plancha",
      descripcion: "Rodajas de pati cocidas a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Rodajas de pati", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar las rodajas 4 minutos por lado.", tiempo: "8 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Salmon Blanco ( Rodajas )": [
    {
      nombre: "Rodajas de Salmón Blanco al Horno",
      descripcion: "Rodajas de salmón blanco horneadas con verduras.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de salmón blanco", cantidad: "1 kg" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas y cebolla en rodajas y colocar en fuente.", tiempo: "3 min" },
        { texto: "Salpimentar y rociar con aceite. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar las rodajas de salmón blanco y hornear 15 minutos más.", tiempo: "15 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],
  "Atun Nacional ( Rodajas )": [
    {
      nombre: "Atún Nacional a la Plancha",
      descripcion: "Rodajas de atún nacional cocidas a la plancha.",
      personas: 2,
      ingredientes: [
        { nombre: "Rodajas de atún nacional", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar las rodajas 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Abadejo ( Rodajas )": [
    {
      nombre: "Rodajas de Abadejo al Horno",
      descripcion: "Rodajas de abadejo horneadas con verduras.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de abadejo", cantidad: "1 kg" },
        { nombre: "Papas", cantidad: "2" },
        { nombre: "Cebolla", cantidad: "1" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" }
      ],
      pasos: [
        { texto: "Cortar las papas y cebolla en rodajas y colocar en fuente.", tiempo: "3 min" },
        { texto: "Salpimentar y rociar con aceite. Hornear 15 minutos a 180°C.", tiempo: "15 min" },
        { texto: "Agregar las rodajas de abadejo y hornear 15 minutos más.", tiempo: "15 min" }
      ],
      aderezo: "Servir con perejil fresco."
    }
  ],"Filet de Merluza ( Rebozado )": [
    {
      nombre: "Filet de Merluza Rebozado Frito",
      descripcion: "Filetes de merluza rebozados y fritos, crocantes por fuera y tiernos por dentro.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de merluza rebozados", cantidad: "400 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Freír los filetes en aceite caliente hasta dorar.", tiempo: "6 min" },
        { texto: "Escurrir sobre papel absorbente.", tiempo: "1 min" },
        { texto: "Servir con rodajas de limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada fresca o papas fritas."
    }
  ],
  "Filet de Merluza ( Rebozado sin Sal )": [
    {
      nombre: "Filet de Merluza Rebozado sin Sal al Horno",
      descripcion: "Filetes de merluza rebozados sin sal, horneados para una opción más saludable.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de merluza rebozados sin sal", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Colocar los filetes en una bandeja con un poco de aceite.", tiempo: "2 min" },
        { texto: "Hornear a 200°C durante 15 minutos, girando a mitad de cocción.", tiempo: "15 min" },
        { texto: "Servir con rodajas de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal para dietas bajas en sodio."
    }
  ],
  "Filet de Brotola ( Rebozado )": [
    {
      nombre: "Filet de Brótola Rebozado Frito",
      descripcion: "Filetes de brótola rebozados y fritos, perfectos para los más chicos.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de brótola rebozados", cantidad: "400 g" },
        { nombre: "Aceite para freír", cantidad: "cantidad necesaria" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Freír los filetes en aceite caliente hasta dorar.", tiempo: "6 min" },
        { texto: "Escurrir sobre papel absorbente.", tiempo: "1 min" },
        { texto: "Servir con limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con puré o ensalada."
    }
  ],
  "Lomos de Brótola ( Rebozado )": [
    {
      nombre: "Lomos de Brótola Rebozados al Horno",
      descripcion: "Lomos de brótola rebozados, horneados para una opción más liviana.",
      personas: 2,
      ingredientes: [
        { nombre: "Lomos de brótola rebozados", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Colocar los lomos en una bandeja con un poco de aceite.", tiempo: "2 min" },
        { texto: "Hornear a 200°C durante 15 minutos, girando a mitad de cocción.", tiempo: "15 min" },
        { texto: "Servir con limón.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con arroz o ensalada."
    }
  ],
  // Agregar recetas genéricas para productos que faltan
  "Abadejo": [
    {
      nombre: "Abadejo a la Plancha",
      descripcion: "Filetes de abadejo cocidos a la plancha con limón.",
      personas: 2,
      ingredientes: [
        { nombre: "Filetes de abadejo", cantidad: "400 g" },
        { nombre: "Aceite de oliva", cantidad: "1 cda" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1/2" }
      ],
      pasos: [
        { texto: "Calentar la plancha y pincelar con aceite.", tiempo: "2 min" },
        { texto: "Cocinar los filetes 3 minutos por lado.", tiempo: "6 min" },
        { texto: "Servir con jugo de limón.", tiempo: "1 min" }
      ],
      aderezo: "Ideal con ensalada fresca."
    }
  ],
  "Surubi ( Rodajas )": [
    {
      nombre: "Surubí a la Parrilla",
      descripcion: "Rodajas de surubí asadas a la parrilla.",
      personas: 4,
      ingredientes: [
        { nombre: "Rodajas de surubí", cantidad: "1 kg" },
        { nombre: "Aceite de oliva", cantidad: "2 cdas" },
        { nombre: "Sal y pimienta", cantidad: "a gusto" },
        { nombre: "Limón", cantidad: "1" }
      ],
      pasos: [
        { texto: "Pincelar las rodajas con aceite y salpimentar.", tiempo: "2 min" },
        { texto: "Cocinar en parrilla caliente 8 minutos por lado.", tiempo: "16 min" },
        { texto: "Servir con jugo de limón y ensalada fresca.", tiempo: "1 min" }
      ],
      aderezo: "Acompañar con ensalada de hojas verdes."
    }
  ],
};

function Recetas() {
  const [productoSeleccionado, setProductoSeleccionado] = useState(productos[0]);

  const recetas = recetasPorProducto[productoSeleccionado] || [];

  return (
    <div className="recetas-lista">
      <label>
        Seleccioná un producto:&nbsp;
        <select
          value={productoSeleccionado}
          onChange={e => setProductoSeleccionado(e.target.value)}
        >
          {productos.map((prod, idx) => (
            <option key={idx} value={prod}>{prod}</option>
          ))}
        </select>
      </label>

      {recetas.length > 0 && (
        <div className="recetas-producto">
          <h3>Recetas para {productoSeleccionado}</h3>
          <ul>
            {recetas.map((receta, idx) => (
              <li className='recetax' key={idx} style={{ marginBottom: '2rem' }}>
                <strong style={{ fontSize: '1.1rem' }}>{receta.nombre}</strong>
                <p><em>{receta.descripcion}</em></p>
                <p><b>Rinde:</b> {receta.personas} persona{receta.personas > 1 ? 's' : ''}</p>
                <p className='ingredientes'><b>Ingredientes:</b></p>
                <ul>
                  {receta.ingredientes.map((ing, i) => (
                    <li key={i}>{ing.nombre} - {ing.cantidad}</li>
                  ))}
                </ul>
                <p><b>Paso a paso:</b></p>
                <ol>
                  {receta.pasos.map((paso, i) => (
                    <li key={i}>
                      {paso.texto} {paso.tiempo && <span style={{ color: '#888' }}>({paso.tiempo})</span>}
                    </li>
                  ))}
                </ol>
                <p><b>Aderezo o sugerencia:</b> {receta.aderezo}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recetas.length === 0 && (
        <div style={{ marginTop: '1.5rem', color: '#888' }}>
          <em>No hay recetas cargadas para este producto.</em>
        </div>
      )}
    </div>
  );
}

export default Recetas;