const { fetchData } = require("./../../../util/Util.js");


async function loadEvents(){
  exports.EVENT_NAME = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/events.json")
  exports.EVENT_DECK = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/eventDeckBonuses.json")
  exports.EVENT_CARD = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/eventCards.json")
  await console.log("loadEvents")
}
loadEvents();

async function loadCards(){
  exports.CARD_PREFIX = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/cards.json");
  exports.CHARACTER_NAME = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/gameCharacters.json");
  exports.CARD_SKILL = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/skills.json");
  exports.CHARACTER_NAME_EN = await fetchData('https://raw.githubusercontent.com/Sekai-World/sekai-i18n/main/en/character_name.json');
  exports.CHARACTER_PROFILE_EN = await fetchData('https://raw.githubusercontent.com/Sekai-World/sekai-i18n/main/en/character_profile.json');
  exports.CARD_PREFIX_EN = await fetchData('https://raw.githubusercontent.com/Sekai-World/sekai-i18n/main/en/card_prefix.json');
  await console.log("loadCards")
}
loadCards();

async function loadCharas(){
  exports.CHARACTER_PROFILE = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/characterProfiles.json");
  exports.CHARACTER_NAME = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/gameCharacters.json");
  exports.CHARACTER_COLOR = await fetchData("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master/gameCharacterUnits.json");
  await console.log("loadCharas")
}
loadCharas();
