import chalk from "chalk";
import readline from "readline";
import { addLiquidity, swapTokens, viewPool, viewBalance } from "./commands.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function mainMenu() {
  console.log(chalk.blue("\nUniswap V2 Simülasyonu"));
  console.log(chalk.green("1. Likidite Ekle"));
  console.log(chalk.green("2. Swap (Token Takası)"));
  console.log(chalk.green("3. Havuz Durumunu Görüntüle"));
  console.log(chalk.green("4. Kullanıcı Bakiyesini Görüntüle"));
  console.log(chalk.red("5. Çıkış\n"));

  rl.question("Seçiminizi yapın (1-5): ", async (choice) => {
    switch (choice) {
      case "1":
        await addLiquidity();
        break;
      case "2":
        await swapTokens();
        break;
      case "3":
        await viewPool();
        break;
      case "4":
        await viewBalance();
        break;
      case "5":
        console.log(chalk.red("Programdan çıkılıyor..."));
        rl.close();
        return;
      default:
        console.log(
          chalk.red("Geçersiz seçim! Lütfen 1-5 arasında bir değer girin.")
        );
    }

    mainMenu(); // İşlem tamamlandıktan sonra tekrar ana menüye dön
  });
}

mainMenu();
