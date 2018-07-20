const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
exports.fetchDependencies = projectLocation => {
  shell.exec("cd " + projectLocation + " && ./scripts/fetch-dependencies.sh");
};
exports.handleCartfileBackups = templateDirectory => {
  const cartfileBakPath = path.join(templateDirectory, "Cartfile.bak");
  const cartfilePrivateBakPath = path.join(templateDirectory, "Cartfile.private.bak");
  if (fs.existsSync(cartfileBakPath)) {
    const cartfileContents = fs.readFileSync(cartfileBakPath);
    fs.writeFileSync(path.join(templateDirectory, "Cartfile"), cartfileContents);
  }
  if (fs.existsSync(cartfileBakPath)) {
    const cartfilePrivateContents = fs.readFileSync(cartfilePrivateBakPath);
    fs.writeFileSync(path.join(templateDirectory, "Cartfile.private"), cartfilePrivateContents);
  }
  const files = fs.readdirSync(templateDirectory);
  files.filter(name => /\.*\.bak$/.test(name)).forEach(file => {
    fs.unlinkSync(path.join(templateDirectory, file));
  });
};
