export const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

export const entre = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
