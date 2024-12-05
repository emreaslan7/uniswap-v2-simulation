import chalk from "chalk";
import { rl } from "./index.js"; // Global readline interface'i kullanıyoruz
import { addLiquidity } from "./addLiquidity.js";
import { swapTokens } from "./swapTokens.js";
import { viewPool, viewUserBalance } from "./viewData.js";

// Kullanıcıdan bilgi almak için yardımcı fonksiyon
export async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer));
  });
}

// Ana menü
export async function mainMenu() {
  while (true) {
    console.log(chalk.blue("\nAna Menü:"));
    console.log(chalk.blue("1. Likidite Ekle"));
    console.log(chalk.blue("2. Swap Yap"));
    console.log(chalk.blue("3. Havuz Durumunu Görüntüle"));
    console.log(chalk.blue("4. Kullanıcı Bakiyesini Görüntüle"));
    console.log(chalk.blue("5. Çıkış"));

    const choice = await prompt("Bir seçim yapın: ");

    if (choice === "1") {
      await addLiquidity(); // Likidite ekle
    } else if (choice === "2") {
      await swapTokens(); // Swap işlemi yap
    } else if (choice === "3") {
      viewPool(); // Havuz durumunu görüntüle
    } else if (choice === "4") {
      viewUserBalance(); // Kullanıcı bakiyesini görüntüle
    } else if (choice === "5") {
      console.log(chalk.green("Uygulamadan çıkılıyor..."));
      rl.close();
      break;
    } else {
      console.log(chalk.red("Geçersiz seçim! Lütfen tekrar deneyin."));
    }
  }
}
