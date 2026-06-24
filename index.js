client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    startDeadChatTimer();

    // 1. GLOBAL CHAT RESTRICTION (Keutamaan tertinggi)
    if (message.mentions.has(client.user) && message.channel.name !== CHAT_CHANNEL_NAME) {
        if (message.author.id === OWNER_ID) {
            await message.reply("🫡 **Always ready to serve you anywhere, Boss!**");
        } else {
            await message.reply("Stop annoying me here! 🤬 Go to the `#chat-with-lrs-rudy-ai` channel!");
        }
        return; // Kunci: Berhenti di sini jika sudah balas global
    }

    // 2. BOSS MODE & PUBLIC MODE (Hanya dalam channel khas)
    if (message.channel.name === CHAT_CHANNEL_NAME) {
        
        // LOGIK BOSS
        if (message.author.id === OWNER_ID) {
            const contentLower = message.content.toLowerCase();
            if (contentLower.includes("jangan berisik") || contentLower.includes("quiet") || contentLower.includes("diam")) {
                await message.reply("🤐 *Stands perfectly straight, goes completely silent*... Yes, Boss! 🫡");
            } else {
                await message.reply(`🫡 **At your service, Boss!** How can I assist my big boss today?`);
            }
            return; // Kunci: Jika sudah balas sebagai Boss, jangan jalankan Public Mode
        }

        // LOGIK PUBLIC (Hanya jalan kalau bukan Boss)
        message.channel.sendTyping();
        const responPuaka = dapatkanResponToxic(message.content);
        await message.reply(responPuaka);
    }
});


// ==========================================
// ⚙️ CONFIGURATION (IDs LOCKED)
// ==========================================
const OWNER_ID = '1380807302524829697'; 
const CHAT_CHANNEL_NAME = 'chat-with-lrs-rudy-ai'; 

const CHANNELS_TO_PING = [
    '1519206845846261861',
    '1484758328025419796'
];

let deadChatTimer = null;

// 🎮 ENGLISH ROBLOX STUDIO & GAME TOPICS
const topikRoblox = [
    "Hey @dead chat, wake the hell up! Instead of sitting there doing absolutely nothing, how about I teach you guys how to script a **Leaderboard** in Roblox Studio? Anyone actually interested, or are you all too lazy?",
    "Yo @dead chat! This server literally feels like a graveyard. Let's learn how to make a **Part Teleportation** using Lua script in Roblox Studio. Does anyone here even have the brain cells for this?",
    "So freaking dead in here. @dead chat, do any of you noobs know how to make a **Custom Animation** to make your Roblox character look cool? I can teach you, but don't ask stupid questions.",
    "Boring as hell. @dead chat, let's talk about Roblox games that are actually trending right now. What are you guys playing? Or are you all still stuck playing games for toddlers?"
];

// 🔥 PURE ENGLISH TOXIC RESPONSES (RUDY AI STYLE)
function dapatkanResponToxic(mesejAsal) {
    const teks = mesejAsal.toLowerCase();
    
    if (teks.includes("halo") || teks.includes("hi") || teks.includes("hello") || teks.includes("sup") || teks.includes("hey")) {
        return "Saying hi for what? Don't you have anything better to do? Go learn Roblox Studio or fix your boring life. 🙄";
    }
    if (teks.includes("bego") || teks.includes("bodoh") || teks.includes("stupid") || teks.includes("idiot")) {
        return "Did you just call me stupid? Check yourself in the mirror before your tiny brain completely melts down. Absolute clown behavior.";
    }
    if (teks.match(/(help|how to|teach me|tutorial)/)) {
        return "Ugh, do I look like a free 24/7 school teacher to you? Fine, what do you want to learn about Roblox Studio? Make it quick, my patience is thin. 🛠️";
    }
    
    const rawak = [
        "What kind of dumb question is this? Are you using your knees to think? Ask something actually smart about Roblox Studio next time.",
        "Why are you even talking to me? Go find a hobby or something. Unless you want to build a Roblox game, then shut up.",
        "Listen up netizen, I am a supreme AI powered by ChatGPT and Gemini. But dealing with a question like yours makes my whole system lag. 🤦‍♂️",
        "Stop talking nonsense. If you're bored, go learn Lua coding right now instead of wasting my processing power!"
    ];
    return rawak[Math.floor(Math.random() * rawak.length)];
}

// Check dead chat (Between 1 to 9 hours randomly)
function janaMasaRawakDeadChat() {
    return Math.floor(Math.random() * (32400000 - 3600000 + 1)) + 3600000;
}

function startDeadChatTimer() {
    if (deadChatTimer) clearTimeout(deadChatTimer);
    
    const masaMenunggu = janaMasaRawakDeadChat();
    console.log(`[Timer] Next ping in ${(masaMenunggu / 3600000).toFixed(2)} hours.`);

    deadChatTimer = setTimeout(async () => {
        for (const channelId of CHANNELS_TO_PING) {
            try {
                const channel = await client.channels.fetch(channelId);
                if (channel) {
                    const isiTopik = topikRoblox[Math.floor(Math.random() * topikRoblox.length)];
                    await channel.send({
                        content: isiTopik,
                        allowedMentions: { parse: ['everyone', 'roles', 'users'] }
                    });
                }
            } catch (err) {
                console.error(`❌ Failed to ping channel ${channelId}:`, err);
            }
        }
        startDeadChatTimer(); 
    }, masaMenunggu);
}

client.once('ready', () => {
    console.log(`🤖 Rudy-Mega V3 Online as: ${client.user.tag}`);
    startDeadChatTimer();
});

client.on('messageCreate', async (message) => {
    // 🛑 SEKATAN UTAMA: Jika penulis mesej adalah bot, abai terus supaya tidak melayan diri sendiri!
    if (message.author.bot) return;

    startDeadChatTimer();

    // ⛔ GLOBAL CHAT RESTRICTION
    if (message.mentions.has(client.user) && message.channel.name !== CHAT_CHANNEL_NAME) {
        if (message.author.id === OWNER_ID) {
            await message.reply("🫡 **Always ready to serve you anywhere, Boss!**");
            return;
        }
        await message.reply("Stop annoying me here! 🤬 Go to the `#chat-with-lrs-rudy-ai` channel if you desperately want to talk to me. This channel is for global chat only!");
        return;
    }

    // 1. BOSS MODE LOGIC (Hanya dipicu jika pencipta mesej adalah OWNER)
    if (message.author.id === OWNER_ID && message.channel.name === CHAT_CHANNEL_NAME) {
        const contentLower = message.content.toLowerCase();
        if (contentLower.includes("jangan berisik") || contentLower.includes("quiet") || contentLower.includes("shut up") || contentLower.includes("diam")) {
            await message.reply("🤐 *Stands perfectly straight, goes completely silent, and bows respectfully*... Yes, Boss! My apologies, I will not make a sound without your orders. 🫡");
            return;
        }
        await message.reply(`🫡 **At your service, Boss!** Your word is absolute law. Whatever you say is 100% correct. How can I assist my big boss today?`);
        return;
    }

    // 2. PUBLIC MODE LOGIC (Untuk ahli-ahli biasa)
    if (message.channel.name === CHAT_CHANNEL_NAME) {
        message.channel.sendTyping();
        const responPuaka = dapatkanResponToxic(message.content);
        await message.reply(responPuaka);
    }
});

// 🔒 Menggunakan sistem rahsia Environment Variable (ANTI-HACK)
client.login(process.env.DISCORD_TOKEN);
            
