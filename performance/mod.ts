import { loadBot as oldLoadBot } from "https://raw.githubusercontent.com/discordeno/discordeno/main/tests/mod.ts";
import { loadBot } from "../tests/mod.ts";

Deno.env.set("DISCORD_TOKEN", `${btoa("316179474163171338")}.gbaodiwabn`);
const bot = loadBot();
const oldBot = oldLoadBot();

// Fetch the cached guild
const discordGuild = JSON.parse(
  await (await fetch("https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/guild.json"))
    .text(),
);

const currentGuild = bot.transformers.guild(bot, { guild: discordGuild, shardId: 0 });
const previousGuild = oldBot.transformers.guild(oldBot, { guild: discordGuild, shardId: 0 });

Deno.bench("[Guild.toggles.features] Get the features of a guild", () => {
  currentGuild.toggles.features;
});

Deno.bench("[Guild.toggles.features - Previous] Get the features of a guild", {
  ignore: Deno.env.get("CI") === "true",
}, () => {
  previousGuild.toggles.features;
});

// Fetch the cached user
const discordUser = JSON.parse(
  await (await fetch("https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/user.json"))
    .text(),
);

const newUser = bot.transformers.user(bot, discordUser);
const oldUser = oldBot.transformers.user(oldBot, discordUser);

Deno.bench("[Transformer] Discord User to a User", () => {
  bot.transformers.user(bot, discordUser);
});

Deno.bench("[Transformer - Previous] Discord User to a User", {
  ignore: Deno.env.get("CI") === "true",
}, () => {
  oldBot.transformers.user(oldBot, discordUser);
});

Deno.bench("[Transformer] User to a Discord User", () => {
  bot.transformers.reverse.user(bot, newUser);
});

Deno.bench("[Transformer - Previous] User to a Discord User", {
  ignore: Deno.env.get("CI") === "true",
}, () => {
  oldBot.transformers.reverse.user(oldBot, oldUser);
});

for (
  const channelType of [
    "rules",
    "announcement-channel",
    "moderator-channel",
    "text-channel",
    "stage-channel",
    "voice-channel",
  ]
) {
  const discordChannel = JSON.parse(
    await (await fetch(
      `https://raw.githubusercontent.com/discordeno/discordeno/benchies/cache/cachedObject/${channelType}.json`,
    )).text(),
  );
  const formattedChannelType = channelType.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");

  Deno.bench(`[Transformer] Discord ${formattedChannelType} to a ${formattedChannelType}`, () => {
    bot.transformers.channel(bot, { channel: discordChannel });
  });

  Deno.bench(`[Transformer - Previous] Discord ${formattedChannelType} to a ${formattedChannelType}`, {
    ignore: Deno.env.get("CI") === "true",
  }, () => {
    oldBot.transformers.channel(oldBot, { channel: discordChannel });
  });

  /* Not implemented
  const newChannel = bot.transformers.channel(bot, { channel: discordChannel });
  const oldChannel = oldBot.transformers.channel(oldBot, { channel: discordChannel });

  Deno.bench(`[Transformer] ${formattedChannelType} to a Discord ${formattedChannelType}`, () => {
    bot.transformers.reverse.channel(bot, newChannel);
  });

  Deno.bench(`[Transformer - Previous] ${formattedChannelType} to a Discord ${formattedChannelType}`, {
    ignore: Deno.env.get("CI") === "true",
  }, () => {
    oldBot.transformers.reverse.channel(oldBot, oldChannel);
  });
  */
}