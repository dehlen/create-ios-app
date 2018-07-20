const git = require("simple-git");
const stringUtil = require("./stringUtil");
exports.initRepository = (workingDir, remoteUrl) => {
  if (stringUtil.isEmpty(remoteUrl)) {
    git(workingDir)
      .init()
      .add("./*")
      .commit("initial commit", () => console.log("✅ Initialized successfully"));
  } else {
    git(workingDir)
      .init()
      .add("./*")
      .commit("initial commit")
      .addRemote("origin", remoteUrl)
      .push(["-u", "origin", "master"], () =>
        console.log("✅ Initialized successfully and pushed to: " + remoteUrl)
      );
  }
};
