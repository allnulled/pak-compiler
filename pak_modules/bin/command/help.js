module.exports = function(args,utils) {
  let msg = "\n";
  msg += `┌────────────────────────────┐\n`;
  msg += `│ pak command line interface │\n`;
  msg += `│                            │\n`;
  msg += `│        » pak help          │\n`;
  msg += `└────────────────────────────┘\n`;
  msg += `\n`;
  msg += `Commands:\n\n`;
  msg += `  # Start new project\n`;
  msg += `  · pak init {path}        # directory\n\n`;
  msg += `  # Build distribuible\n`;
  msg += `  · pak build {project}    # directory\n`;
  msg += `      --entry  {entry.js}  # file\n`;
  msg += `      --output {output}    # directory\n\n`;
  msg += `  # Run project + entry\n`;
  msg += `  · pak run   {project}    # directory\n`;
  msg += `      --entry  {entry.js}  # file\n\n`;
  msg += `  · pak help\n\n`;
  msg += `  # See project\n`;
  msg += `  · pak list projects      #\n`;
  msg += `  · pak list sources       #\n`;
  msg += `  · pak list distribuibles #\n`;
  msg += `  · pak list commands      #\n`;
  msg += `\n`;
  console.log(utils.colors.style("yellow").text(msg));
}