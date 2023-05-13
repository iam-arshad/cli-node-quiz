#!/usr/bin/env/ node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner'
import figlet from "figlet";

let playerName, finalResult;

function sleep(ms = 2000) {
  return new Promise(r => setTimeout(r, ms))
}

async function askName() {
  return inquirer.prompt([{ type: "input", name: 'name', message: "What's your name?", }]).then(answer => playerName = answer.name)
}

async function welcome() {
  let title = chalkAnimation.rainbow(`Assalamualaikum!`);
  await sleep(2000);
  title.stop();

  await askName();

  const spinner = createSpinner('Loading...').start();
  await sleep(2000);
  spinner.success({ text: `${chalk.green.bold(`Lets get started, ${playerName}`)}` });

  const instructions = chalkAnimation.neon(`How to play:
  1.Three questions will be asked one by one
  2.If you answer all of them correctly,you will be the winner
  `)
  await sleep(4600);
  instructions.stop();
}

const que2Answer = ["commander", "inquirer", "nodemon"];
function askQuestions() {
  return inquirer.prompt([{ type: "input", name: "que1", message: "What is the command to install a new package using npm in a Node.js project? Please enter your answer below:(text input)" }, {
    type: "checkbox", name: "que2", message: "Which of the following npm packages can be used to create a command-line interface (CLI) application in Node.js?(checkbox)", choices: [
      { name: 'commander' },
      { name: 'chalk' },
      { name: 'express' },
      { name: 'inquirer' },
      { name: 'nodemon' }]
  }, { type: "list", name: "que3", message: "Which of the following is NOT a built-in module in Node.js?(radio)", choices: ["fs", "http", "path", "sql"] }])
    .then((answers => {
      const results =
        [
          (answers.que1 == 'npm install') || (answers.que1 == 'npm i'),
          answers.que2.map(i => que2Answer.includes(i)).every(j => j === true),
          answers.que3 === 'sql'
        ]
      finalResult = (results.every(i => i === true) ? "WON" : "LOSE")
    }))
}

async function Result() {
  const finalMessage = (finalResult == "WON") ? "Congratulations!" : "You Lose";

  const spinner = createSpinner('Loading...').start();
  await sleep(2000);
  (finalMessage == "Congratulations!") ? spinner.success({ text: `You Won 🏆 ${playerName}` }) : spinner.error({ text: `You lose 💀 ${playerName}` })

  figlet(finalMessage, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
}


async function main() {
  await welcome();
  await askQuestions();
  Result();
}

main();
