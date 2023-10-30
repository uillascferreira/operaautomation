const os = require("os");
const fs = require("fs").promises;
const path = require("path");

const chains = ["ACCORMNG", "ACCORLD", "ACCORFAL"];
const indir = "/ACCELERATOR/in";

const processFile = async (filePath) => {
  try {
    const files = await fs.readdir(filePath, { withFileTypes: true });

    for (const file of files) {
      const filedir = path.join(filePath, file.name);

      if (file.isDirectory()) {
        await processFile(filedir);
      } else {
        console.log("file path:", filedir);
        console.log("file name:", file.name);
      }
    }
  } catch (err) {
    console.log("error", err);
  }
};

const Main = async () => {
  try {
    for (const chain of chains) {
      const workdir = path.join(os.homedir(), indir, chain);
      await processFile(workdir);
    }
  } catch (err) {
    console.log("error", err);
  }
};

Main();
