class SuperError extends Error {
    constructor(args, name) {
        super(args.red + "\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh".green);
        this.name = name.cyan;
    }
}

module.exports.SuperError = SuperError;