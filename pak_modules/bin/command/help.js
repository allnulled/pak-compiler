module.exports = function() {
  let msg = "";
  msg += `┌────────────────────────────┐\n`;
  msg += `│ pak command line interface │\n`;
  msg += `│                            │\n`;
  msg += `│        » pak help          │\n`;
  msg += `└────────────────────────────┘\n`;
  msg += `\n`;
  msg += `Commands:\n`;
  msg += `  ~ pak init {PATH}       # directory\n`;
  msg += `  ~ pak build {PROJECT}   # directory\n`;
  msg += `    --entry  {ENTRY.js}   # js file\n`;
  msg += `    --output {OUTPUT}     # directory\n`;
  msg += `  ~ pak run PROJECT       # directory\n`;
  msg += `    --entry  {ENTRY.js}   # js file\n`;
  msg += `  ~ pak help\n`;
  msg += `\n`;
  console.log(msg);
}