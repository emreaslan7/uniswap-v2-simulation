import chalk from "chalk";
import { prompt } from "./menu.js";
import { readData, writeData } from "./dataManager.js";

export async function swapTokens() {
  const data = readData();

  console.log(chalk.blue("\nSwap İşlemi"));

  const choice = await prompt(
    `\n1: tokenA -> tokenB (1 tokenA = ${
      data.pool.tokenB / data.pool.tokenA
    } tokenB)
    \n2: tokenB -> tokenA (1 tokenB = ${
      data.pool.tokenA / data.pool.tokenB
    } tokenA)
    \nHangi tokeni takas yapmak istiyorsunuz?`
  );

  if (choice !== "1" && choice !== "2") {
    console.log(chalk.red("Geçersiz seçim!"));
    return;
  }

  const inputToken = choice === "1" ? "tokenA" : "tokenB";
  const outputToken = choice === "1" ? "tokenB" : "tokenA";

  const inputAmount = parseFloat(
    await prompt(`Kaç birim ${inputToken} takas etmek istiyorsunuz? `)
  );

  if (isNaN(inputAmount) || inputAmount <= 0) {
    console.log(chalk.red("Geçersiz miktar girdiniz!"));
    return;
  }

  if (data.userBalance[inputToken] < inputAmount) {
    console.log(chalk.red(`Yetersiz bakiye: ${data.userBalance[inputToken]}`));
    return;
  }

  const inputReserve = data.pool[inputToken];
  const outputReserve = data.pool[outputToken];

  const outputAmount =
    (outputReserve * inputAmount) / (inputReserve + inputAmount);

  if (outputAmount > outputReserve) {
    console.log(chalk.red(`Havuzda yeterli ${outputToken} yok.`));
    return;
  }

  data.pool[inputToken] += inputAmount;
  data.pool[outputToken] -= outputAmount;

  data.userBalance[inputToken] -= inputAmount;
  data.userBalance[outputToken] += outputAmount;

  writeData(data);

  console.log(
    chalk.green(
      `Swap işlemi başarılı! ${inputAmount} ${inputToken} verdiniz, ${outputAmount.toFixed(
        2
      )} ${outputToken} aldınız.`
    )
  );
}
