const productos = [
  {
    nombre: "Memoria RAM DDR4 8GB",
    id: "001",
    precio: 8000,
    categoria: "Memoria",
    descripcion: "Memory Speed:2666/3000/3200MHz Memory Channel:Dual Channel",
  },
  {
    nombre: "Memoria RAM DDR4 16GB",
    id: "002",
    precio: 15000,
    categoria: "Memoria",
    descripcion: "Memory Speed:2666/3000/3200MHz Memory Channel:Dual Channel",
  },
  {
    nombre: "MEMORIA RAM DDR5 8GB",
    id: "003",
    precio: 16000,
    stock: 5,
    categoria: "Memoria",
    descripcion:
      "Memory Speed: 4800, 5200, 5600, 6000, 6400, 6800 Channel:Dual Channel",
  },
  {
    nombre: "MEMORIA RAM DDR5 16GB",
    id: "004",
    precio: 23000,
    categoria: "Memoria",
    descripcion:
      "Memory Speed: 4800, 5200, 5600, 6000, 6400, 6800 Channel:Dual Channel",
  },
  {
    nombre: "Disco SSD 120",
    id: "005",
    precio: 10000,
    categoria: "Disco SSD",
    descripcion:
      "Tipo de memoria flash NAND: Célula de triple nivel (TLC) Factor de forma: 2.5 Interfaz: SATA 6Gb/s",
  },
  {
    nombre: "Disco SSD 240",
    id: "006",
    precio: 15000,
    categoria: "Disco SSD",
    descripcion:
      "Tipo de memoria flash NAND: Célula de triple nivel (TLC) Factor de forma: 2.5 Interfaz: SATA 6Gb/s",
  },
  {
    nombre: "Disco SSD 480",
    id: "007",
    precio: 20000,
    categoria: "Disco SSD",
    descripcion:
      "Tipo de memoria flash NAND: Célula de triple nivel (TLC) Factor de forma: 2.5 Interfaz: SATA 6Gb/s",
  },
  {
    nombre: "Disco HD 1TB",
    id: "008",
    precio: 20000,
    categoria: "Disco HD",
    descripcion:
      "Tama�o de disco duro: 3.5pulg. Interfaz: Serial ATA III Unidad RPM: 5900",
  },
  {
    nombre: "Disco HD 2TB",
    id: "009",
    precio: 30000,
    categoria: "Disco HD",
    descripcion:
      "Tamaño de disco duro: 3.5pulg. Interfaz: Serial ATA III Unidad RPM: 5900",
  },
  {
    nombre: "Gabinete KIT",
    id: "010",
    precio: 36000,
    categoria: "Gabinete",
    descripcion:
      "Gabinete generico con fuente teclado Mouse y parlantes de regalo",
  },
  {
    nombre: "Gabinete GAMER",
    id: "011",
    precio: 50000,
    categoria: "Gabinete",
    descripcion: "Gabinete sin Fuente y Luces Led",
  },
];

export default function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 3000);
  });
}
