// vmk_pirates2_minigame.cct / CStage / LoadXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadXML(_me: LingoMe, i_sDocument: LingoValue) {
  var t_rXML = callNamed("CreateXML", callNamed("getMember", i_sDocument).text);
  var tRoot = callMethod("GetRoot", t_rXML);
  if (callMethod("Search", t_rXML, "type", "PIRATES_OF_THE_CARIBBEAN", 0)) {
  var tRootXML = callNamed("CreateXML");
  callMethod("copy", tRootXML, callMethod("GetNode", t_rXML))
  setMeProp(_me, "m_sName", callMethod("GetParam", t_rXML, "STAGE"));
  setMeProp(_me, "m_iStartTime", callMethod("GetParam", t_rXML, "STARTTIME"));
  setMeProp(_me, "m_iEndTime", callMethod("GetParam", t_rXML, "ENDTIME"));
  if (callMethod("Search", tRootXML, "type", "TEAMS", 0)) {
  var tCount = callMethod("count", tRootXML);
  for (var i = 1; i <= tCount; ++i) {
  var tTeam = tRootXML[i];
  var tStartPosCount = tTeam[symbol("child")].count;
  for (var j = 1; j <= tStartPosCount; ++j) {
  }

  }

  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "ITEMS", 0)) {
  tCount = callMethod("count", tRootXML);
  for (var i = 1; i <= tCount; ++i) {
  var tItem = tRootXML[i];
  }

  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "FIXTURES", 0)) {
  tCount = callMethod("count", tRootXML);
  for (var i = 1; i <= tCount; ++i) {
  var tFixture = tRootXML[i];
  switch (tFixture[symbol("type")]) {
case "BUILDING":
  var tGraphic = callNamed("value", tFixture[symbol("param")]["GRAPHIC"]);
  var tPos = callNamed("value", tFixture[symbol("param")]["POS"]);
  var tBBxtl = callNamed("value", tFixture[symbol("param")]["BBOXTL"]);
  var tBBxbr = callNamed("value", tFixture[symbol("param")]["BBOXBR"]);
  callMethod("setaProp", meProp(_me, "m_mp_fixtures")[symbol("buildings")], tGraphic, new LingoPropList([symbol("pos"), tPos, symbol("BBox"), callNamed("rect", tBBxtl.locH, tBBxtl.locV, tBBxbr.locH, tBBxbr.locV)]))
  break;
case "TURRET":
  tPos = callNamed("value", tFixture[symbol("param")]["POS"]);
  callMethod("setaProp", meProp(_me, "m_mp_fixtures")[symbol("turrets")], lingoBinary("add", meProp(_me, "m_mp_fixtures")[symbol("turrets")].count, 1), new LingoPropList([symbol("pos"), tPos, symbol("BBox"), callNamed("rect", -float(1125), -float(1125), 1125, 1125)]))
  break;
case "OILBUILDING":
  tPos = callNamed("value", tFixture[symbol("param")]["POS"]);
  callMethod("setaProp", meProp(_me, "m_mp_fixtures")[symbol("oilbuildings")], lingoBinary("add", meProp(_me, "m_mp_fixtures")[symbol("oilbuildings")].count, 1), new LingoPropList([symbol("pos"), tPos, symbol("BBox"), callNamed("rect", -float(1125), -float(1125), 1125, 1125)]))
  break;
  }

  }

  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "SCORES", 0)) {
  var tHitEnemy = callNamed("value", callMethod("GetParam", tRootXML, "HITENEMY"));
  var tKilledEnemy = callNamed("value", callMethod("GetParam", tRootXML, "KILLEDENEMY"));
  var tHitNPC = callNamed("value", callMethod("GetParam", tRootXML, "HITNPC"));
  var tKilledNPC = callNamed("value", callMethod("GetParam", tRootXML, "KILLEDNPC"));
  var tSelfHit = callNamed("value", callMethod("GetParam", tRootXML, "SELFHIT"));
  var tBailout = callNamed("value", callMethod("GetParam", tRootXML, "BAILOUT"));
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "HitEnemy", tHitEnemy)
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "KilledEnemy", tKilledEnemy)
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "HitNPC", tHitNPC)
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "KilledNPC", tKilledNPC)
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "SelfHit", tSelfHit)
  callMethod("setaProp", meProp(_me, "m_mp_scores"), "Bailout", tBailout)
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "WIND", 0)) {
  var tChangeInterval = callNamed("value", callMethod("GetParam", tRootXML, "CHANGEINTERVAL"));
  var tChangeProb = callNamed("value", callMethod("GetParam", tRootXML, "CHANGEPROPABILITY"));
  callMethod("setaProp", meProp(_me, "m_mp_wind"), "ChangeInterval", tChangeInterval)
  callMethod("setaProp", meProp(_me, "m_mp_wind"), "ChangePropability", tChangeProb)
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "POWERUPS", 0)) {
  var tInterval = callNamed("value", callMethod("GetParam", tRootXML, "INTERVAL"));
  var tPropability = callNamed("value", callMethod("GetParam", tRootXML, "PROPABILITY"));
  var tCannonballAmount = callNamed("value", callMethod("GetParam", tRootXML, "CANNONBALLAMOUNT"));
  callMethod("setaProp", meProp(_me, "m_mp_powerupsettings"), "Interval", tInterval)
  callMethod("setaProp", meProp(_me, "m_mp_powerupsettings"), "Propability", tPropability)
  callMethod("setaProp", meProp(_me, "m_mp_powerupsettings"), "CannonballAmount", tCannonballAmount)
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "COLLISIONMAP", 0)) {
  setMeProp(_me, "m_collisionMap", callNamed("createObject", symbol("random"), "CMap"));
  var tTileSize = callNamed("value", callMethod("GetParam", tRootXML, "TILESIZE"));
  var tOffset = callNamed("value", callMethod("GetParam", tRootXML, "OFFSET"));
  var tSize = callNamed("value", callMethod("GetParam", tRootXML, "SIZE"));
  var tDataMember = callNamed("member", callMethod("GetParam", tRootXML, "DATAMEMBER"));
  callMethod("InitMap", meProp(_me, "m_collisionMap"), tSize.locH, tSize.locV)
  callMethod("SetTileSize", meProp(_me, "m_collisionMap"), tTileSize)
  callMethod("SetOffset", meProp(_me, "m_collisionMap"), tOffset.locH, tOffset.locV)
  for (var i = 1; i <= callMethod("count", tRootXML); ++i) {
  var tLine = tRootXML[i];
  var tMapLine = tLine[symbol("param")]["MAP"];
  var tOfs = 1;
  for (var c = 1; c <= chunkCount(tMapLine, "char"); ++c) {
  var tChar = tMapLine.char[tOfs];
  if (lingoBinary("eq", tChar, "-")) {
  var tvalue = -float(callNamed("value", tMapLine.char[lingoBinary("add", tOfs, 1)]));
  tOfs = lingoBinary("add", tOfs, 1);
  } else {
  tvalue = callNamed("value", tMapLine.char[tOfs]);
  }

  callMethod("SetMapAt", meProp(_me, "m_collisionMap"), c, i, tvalue)
  tOfs = lingoBinary("add", tOfs, 1);
  }

  }

  if (lingoBinary("gt", tDataMember._number, 0)) {
  callMethod("SetMap", meProp(_me, "m_collisionMap"), callNamed("value", tDataMember.text))
  }

  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "WHIRLPOOL", 0)) {
  setMeProp(_me, "m_mp_whirlpoolsettings", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_whirlpoolsettings"), "PullRadius", callNamed("value", callMethod("GetParam", tRootXML, "PULLRADIUS")))
  callMethod("setaProp", meProp(_me, "m_mp_whirlpoolsettings"), "PullAmount", callNamed("value", callMethod("GetParam", tRootXML, "PULLAMT")))
  callMethod("setaProp", meProp(_me, "m_mp_whirlpoolsettings"), "SpinSpeed", callNamed("value", callMethod("GetParam", tRootXML, "SPINSPD")))
  callMethod("setaProp", meProp(_me, "m_mp_whirlpoolsettings"), "ReleaseRadius", callNamed("value", callMethod("GetParam", tRootXML, "RELEASERADIUS")))
  callMethod("setaProp", meProp(_me, "m_mp_whirlpoolsettings"), "MoveSpeed", callNamed("value", callMethod("GetParam", tRootXML, "MOVESPD")))
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "SEAMONSTER", 0)) {
  setMeProp(_me, "m_mp_seamonstersettings", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_seamonstersettings"), "ChaseTrigger", callNamed("value", callMethod("GetParam", tRootXML, "CHASETRIG")))
  callMethod("setaProp", meProp(_me, "m_mp_seamonstersettings"), "ChaseSpeed", callNamed("value", callMethod("GetParam", tRootXML, "CHASESPD")))
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "KRAKENSEAMONSTER", 0)) {
  setMeProp(_me, "m_mp_krakenseamonstersettings", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_krakenseamonstersettings"), "ChaseTrigger", callNamed("value", callMethod("GetParam", tRootXML, "CHASETRIG")))
  callMethod("setaProp", meProp(_me, "m_mp_krakenseamonstersettings"), "ChaseSpeed", callNamed("value", callMethod("GetParam", tRootXML, "CHASESPD")))
  }

  callMethod("GetRoot", tRootXML)
  if (callMethod("Search", tRootXML, "type", "MUSIC", 0)) {
  setMeProp(_me, "m_sMusic", callMethod("GetParam", tRootXML, "PLAY"));
  }

  callMethod("GetRoot", tRootXML)
  setMeProp(_me, "m_bMoonlightUserTriggered", 0);
  if (callMethod("Search", tRootXML, "type", "MOONLIGHT", 1)) {
  setMeProp(_me, "m_bMoonlightUserTriggered", callNamed("value", callMethod("GetParam", tRootXML, "USER_TRIGGERED")));
  }

  }

}

