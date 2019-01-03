const Discord = require("discord.js");
const client = new Discord.Client();
var prefix = '+';
client.on("ready", () => {
  console.log("I am ready!");
});
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith(prefix + "eval")) {
    if(message.author.id !== process.env.OWNER_ID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
client.login(process.env.TOKEN);
