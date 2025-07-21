import chalk from 'chalk';
import figlet from "figlet";

const bannerText = figlet.textSync("BMSCE", {
  font: "ANSI Shadow",
  horizontalLayout: "default",
  verticalLayout: "default",
});

console.log(chalk.yellow.bold(bannerText));