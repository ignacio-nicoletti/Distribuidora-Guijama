// salesData.ts

interface Sale {
  id: number;
  nombre: string;
  apellido: string;
  fecha: string;
  total: number;
  cuotas: number;
  remito: string;
}

const fakeSales: Sale[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "18/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 52,
    nombre: "María",
    apellido: "González",
    fecha: "19/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 141,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "20/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 242,
    nombre: "María",
    apellido: "González",
    fecha: "21/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1752,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "22/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 272,
    nombre: "María",
    apellido: "González",
    fecha: "23/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 7221,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "24/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 4752,
    nombre: "María",
    apellido: "González",
    fecha: "25/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 155,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "26/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 78562,
    nombre: "María",
    apellido: "González",
    fecha: "27/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1536,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "15/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 682,
    nombre: "María",
    apellido: "lopez",
    fecha: "29/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 86815,
    nombre: "Estela",
    apellido: "Chascomus",
    fecha: "15/02/2024",
    total: 1550,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 258569,
    nombre: "Esteban",
    apellido: "Cuello",
    fecha: "15/02/2024",
    total: 1800,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 3753,
    nombre: "Matias",
    apellido: "Suarez",
    fecha: "29/02/2024",
    total: 1050,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 15788,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "18/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 2555,
    nombre: "María",
    apellido: "González",
    fecha: "19/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 177,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "20/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 27,
    nombre: "María",
    apellido: "González",
    fecha: "21/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1121,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "22/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 2110,
    nombre: "María",
    apellido: "González",
    fecha: "23/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1000,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "24/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 24712,
    nombre: "María",
    apellido: "González",
    fecha: "25/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1242,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "26/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 2659,
    nombre: "María",
    apellido: "González",
    fecha: "27/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 5351,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "15/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 238,
    nombre: "María",
    apellido: "lopez",
    fecha: "29/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 155,
    nombre: "Estela",
    apellido: "Chascomus",
    fecha: "15/02/2024",
    total: 1550,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 2933,
    nombre: "Esteban",
    apellido: "Cuello",
    fecha: "15/02/2024",
    total: 1800,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 3355,
    nombre: "Matias",
    apellido: "Suarez",
    fecha: "29/02/2024",
    total: 1050,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 133,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "18/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 2896,
    nombre: "María",
    apellido: "González",
    fecha: "19/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 168,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "20/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 298,
    nombre: "María",
    apellido: "González",
    fecha: "21/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 189,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "22/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 862,
    nombre: "María",
    apellido: "González",
    fecha: "23/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 1896,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "24/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 982,
    nombre: "María",
    apellido: "González",
    fecha: "25/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 188,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "26/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 662,
    nombre: "María",
    apellido: "González",
    fecha: "27/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 860,
    nombre: "Juan",
    apellido: "Perez",
    fecha: "15/02/2024",
    total: 100,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 28999,
    nombre: "María",
    apellido: "lopez",
    fecha: "29/02/2024",
    total: 150,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 198685,
    nombre: "Estela",
    apellido: "Chascomus",
    fecha: "15/02/2024",
    total: 1550,
    cuotas: 3,
    remito: "RE-002",
  },
  {
    id: 8939,
    nombre: "Esteban",
    apellido: "Cuello",
    fecha: "15/02/2024",
    total: 1800,
    cuotas: 2,
    remito: "RE-001",
  },
  {
    id: 386933,
    nombre: "Matias",
    apellido: "Suarez",
    fecha: "29/02/2024",
    total: 1050,
    cuotas: 3,
    remito: "RE-002",
  },
];

export default fakeSales;
