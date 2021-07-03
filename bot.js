const Discord = require('discord.js') // discord.js modülü tanımlıyoruz.
const client = new Discord.Client() // client tanımalamsı
const { readdirSync } = require('fs'); // tanımlamalar
const { join } = require('path'); // tanımlamalar

client.commands= new Discord.Collection(); // komutları alıyoruz

const prefix = "*"

const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); // Belli bir klasörden belli .js uzantılı dosyaları buluyor.

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.kod, command); // Komutları Ayarlıyoruz.
}

client.on("error", console.error);

client.on('ready', () => {
    console.log('Botumuz Aktif')
    const durumlar = [
      `${client.guilds.cache.size} sunucudayım`,
      'Yapım aşamasındayım'
    ]
    setInterval(function () {
      let durum = durumlar[Math.floor(Math.random()*durumlar.length)]
      client.user.setActivity(durum)
    }, 2000);

});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return message.channel.send(`Kanka **${command}** diye bir kod yok.`);


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('*kick')) {
    if (!message.member.hasPermission('KİCK_MEMBERS')) return message.channel.send('O ADMİN AMK')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
           log.send(`${user.tag} kendisi şuan farklı alemlerde`);
          })
          .catch(err => {
            message.reply('gitti.');
            console.error(err);
          });
      } else {
        message.reply("Öyle biri yok amk");
      }
    } else {
      message.reply("Kim aq");
    }
  }
});

client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('*ban')) {
    if (!message.member.hasPermission('KİCK_MEMBERS')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
           log.send(`${user.tag} Kendisi gökten inme biriydi.`);
          })
          .catch(err => {
            message.reply('PİUUU.');
            console.error(err);
          });
      } else {
        message.reply("O KİM AQ");
      }
    } else {
      message.reply("O KİM AQ");
    }
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'naber') {
    msg.reply('iyilik biladerim');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('as');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Selamun aleyküm') {
    msg.reply('Aleyküm selam');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kral') {
    msg.react("😎")
    msg.channel.send('Birisi benden mi bashetti');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yapacağın botu sikm') {
    msg.delete()
    msg.channel.send('Ağır oluyor');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'napim') {
    msg.reply('banlayın bu arkadaşı');
  }
});


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'prefix') {
    msg.reply('*');
  }
});

client.login('ODM3NjQ3NTQzNTk5ODkwNDY0.YIvmEQ.-SouGKpso7MhakqNKTBLU8O9PyU')
