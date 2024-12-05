import chalk from "chalk";
import { readData } from "./dataManager.js";

// Havuz durumunu görüntüleme
export function viewPool() {
  const data = readData();
  console.log(chalk.green("\nHavuz Durumu:"));
  console.log(chalk.green(`TokenA: ${data.pool.tokenA}`));
  console.log(chalk.green(`TokenB: ${data.pool.tokenB}`));
  console.log(chalk.green(`Sabit K Değeri: ${data.pool.K}`));
}

// Kullanıcı bakiyesini görüntüleme
export function viewUserBalance() {
  const data = readData();
  console.log(chalk.green("\nKullanıcı Bakiyesi:"));
  console.log(chalk.green(`TokenA: ${data.userBalance.tokenA}`));
  console.log(chalk.green(`TokenB: ${data.userBalance.tokenB}`));
}
