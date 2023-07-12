"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stellar ${chalk.red("generator-mayfly-cli")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "someAnswer",
        message: "Would you like to enable this option?",
        default: true,
      },
      {
        type: "input",
        name: "name",
        message: "Your project name.",
        default: "library",
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    const { name } = this.props;

    this.fs.copy(this.templatePath("**"), this.destinationPath("./"), {
      globOptions: {
        dot: true,
        nodir: true,
      },
    });

    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      { name }
    );
  }

  install() {
    this.yarnInstall();
  }
};
