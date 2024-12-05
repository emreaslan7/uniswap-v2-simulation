import readline from "readline";
import { mainMenu } from "./menu.js";

// readline arayüzü oluştur ve tüm uygulama boyunca paylaş
export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Uygulamayı başlat
console.log("Uniswap V2 DEX Simülasyonu");
mainMenu();
