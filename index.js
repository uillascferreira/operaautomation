const S = require("selenium-webdriver");
const os = require("os");
const fs = require("fs").promises;
const path = require("path");

const chains = ["ACCORMNG", "ACCORLD", "ACCORFAL"];
const indir = "/ACCELERATOR/in";
const outdir = "ACCELERATOR/out";

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
  // const driver = await new S.Builder().forBrowser("chrome").build();
  // driver.get(
  //   "https://apexapps.oracle.com/pls/apex/r/hgbu-csuite/ohce/home?session=107146144735094"
  // );
  // await driver.manage().setTimeouts({ implicit: 100000 });
  // let username = await driver.findElement(S.By.id("sso_username"));
  // let password = await driver.findElement(S.By.id("ssopassword"));
  // let btnIniciar = await driver.findElement(S.By.id("signin_button"));
  // //let openAccelerator = await driver.findElement(S.By.id("wwvFlowForm"));
  // await username.sendKeys("uillas.ferreira@oracle.com");
  // await password.sendKeys("xI55SyhygM6i");
  // await btnIniciar.click();
  // await driver.wait(
  //   S.until.elementIsVisible(await driver.findElement(S.By.id("wwvFlowForm"))),
  //   100000
  // );

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
