const vscode = require("vscode");
const axios = require("axios");
/**
 * @param {vscode.ExtensionContext} context
 */
const activate = async (context) => {
  let disposable = vscode.commands.registerCommand(
    "firstextension.getJoke",
    async () => {
      let joke, link;
      const res = await axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((res) => {
          joke = res.data.value;
          link = res.data.url;
        })
        .catch((err) => {
          console.log(err);
        });

      const click = await vscode.window.showInformationMessage(
        joke,
        "See on web"
      );
      if (click == "See on web") {
        vscode.env.openExternal(link);
      }
    }
  );

  context.subscriptions.push(disposable);
};

const deactivate = () => {};

module.exports = {
  activate,
  deactivate,
};
