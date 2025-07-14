import chalk from 'chalk';
import figlet from "figlet";

const bannerText = figlet.textSync("BMSCE", {
  font: "Ansi Shadow",
  horizontalLayout: "default",
  verticalLayout: "default",
});

console.log(chalk.red.bold(bannerText));