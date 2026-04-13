module.exports = function(argv = process.argv, commands = {}) {
  const args = {_:[]};
  const aliases = Object.keys(commands).reduce(function(out, key) {
    const command = commands[key];
    if(command.alias) {
      out[command.alias] = key;
    }
    return out;
  }, {});
  let lastParameter = "_";
  Iterating_parameters:
  for(let index=0; index<argv.length; index++) {
    const arg = argv[index];
    if(arg.startsWith("--")) {
      const commandId = arg.substr(2);
      if(commandId in commands) {
        lastParameter = commandId;
        if(!(lastParameter in args)) args[lastParameter] = [];
        continue Iterating_parameters;
      }
    } else if(arg.startsWith("-")) {
      const aliasId = arg.substr(1);
      if(aliasId in aliases) {
        const commandId = aliases[aliasId];
        if(commandId in commands) {
          lastParameter = commandId;
          if(!(lastParameter in args)) args[lastParameter] = [];
          continue Iterating_parameters;
        }
      }
    }
    args[lastParameter].push(arg);
  }
  return args;
}