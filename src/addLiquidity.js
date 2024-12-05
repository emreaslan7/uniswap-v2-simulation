import chalk from "chalk";
import { prompt } from "./menu.js"; // Kullanıcıdan bilgi almak için prompt kullanıyoruz
import { readData, writeData } from "./dataManager.js";

export async function addLiquidity() {
  const data = readData();

  console.log(chalk.blue("\nLikidite Ekleme İşlemi"));

  const tokenAAmount = parseFloat(
    await prompt("Kaç birim tokenA eklemek istiyorsunuz? ")
  );
  const tokenBAmount = parseFloat(
    await prompt("Kaç birim tokenB eklemek istiyorsunuz? ")
  );

  if (
    isNaN(tokenAAmount) ||
    isNaN(tokenBAmount) ||
    tokenAAmount < 0 ||
    tokenBAmount < 0
  ) {
    console.log(chalk.red("Geçersiz miktar girdiniz!"));
    return;
  }

  if (
    data.userBalance.tokenA < tokenAAmount ||
    data.userBalance.tokenB < tokenBAmount
  ) {
    console.log(
      chalk.red(
        `Yetersiz bakiye! TokenA: ${data.userBalance.tokenA}, TokenB: ${data.userBalance.tokenB}`
      )
    );
    return;
  }

  // Kullanıcı bakiyesini güncelle
  data.userBalance.tokenA -= tokenAAmount;
  data.userBalance.tokenB -= tokenBAmount;

  // Havuz rezervlerini güncelle
  data.pool.tokenA += tokenAAmount;
  data.pool.tokenB += tokenBAmount;

  // Sabit K değerini güncelle
  data.pool.K = data.pool.tokenA * data.pool.tokenB;

  writeData(data);

  console.log(chalk.green("Likidite başarıyla eklendi!"));
}
