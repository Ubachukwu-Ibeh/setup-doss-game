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
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Ubachukwu-Ibeh/BoxEngine ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Preparing ${repoName}...`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

runCommand(`cd ${repoName}`);
runCommand("code .");
runCommand("npm run start");
