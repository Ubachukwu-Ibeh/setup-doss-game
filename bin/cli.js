#!/usr/bin/env node

const { execSync } = require("child_process");
const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (e) {
    console.log(`failed to execute ${command}`, e);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const makeDir = `mkdir ${repoName} && cd ${repoName} && git init`;
const gitCheckoutCommand = `cd ${repoName} && git clone https://github.com/Ubachukwu-Ibeh/create-doss-game `;
const installDepsCommand = `cd ${repoName} && npm install && npm run start`;
const deleteBin = `cd ${repoName} && git rm -r bin`;

console.log(`Preparing ${repoName}...`);

runCommand(makeDir) || process.exit(-1);

runCommand(gitCheckoutCommand) || process.exit(-1);

runCommand(installDepsCommand) || process.exit(-1);
