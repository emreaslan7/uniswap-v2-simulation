import chalk from "chalk";
import { readData, writeData } from "./dataManager.js";

// Likidite ekleme
export async function addLiquidity() {
  const data = readData();
  const amountA = 100; // Kullanıcıdan alınan örnek veri
  const amountB = 100;

  data.pool.tokenA += amountA;
  data.pool.tokenB += amountB;
  data.pool.K = data.pool.tokenA * data.pool.tokenB;

  writeData(data);
  console.log(chalk.green("Likidite başarıyla eklendi!"));
}

// Token swap işlemi
export async function swapTokens() {
  const data = readData();
  const inputToken = "tokenA"; // Örnek kullanıcı girdisi
  const outputToken = "tokenB";
  const inputAmount = 50;

  const inputReserve = data.pool[inputToken];
  const outputReserve = data.pool[outputToken];

  const outputAmount =
    (outputReserve * inputAmount) / (inputReserve + inputAmount);
  data.pool[inputToken] += inputAmount;
  data.pool[outputToken] -= outputAmount;

  writeData(data);
  console.log(
    chalk.green(
      `Takas başarılı! ${inputAmount} ${inputToken}, ${outputAmount.toFixed(
        2
      )} ${outputToken} ile değiştirildi.`
    )
  );
}

// Havuz durumunu görüntüleme
export async function viewPool() {
  const { pool } = readData();
  console.log(chalk.blue("Havuz Durumu:"));
  console.table(pool);
}

// Kullanıcı bakiyesini görüntüleme
export async function viewBalance() {
  const { userBalance } = readData();
  console.log(chalk.blue("Kullanıcı Bakiyesi:"));
  console.table(userBalance);
}
