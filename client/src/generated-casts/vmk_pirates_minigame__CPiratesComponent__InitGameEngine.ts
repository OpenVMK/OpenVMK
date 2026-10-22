// vmk_pirates_minigame.cct / CPiratesComponent / InitGameEngine

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitGameEngine(_me: LingoMe, m_rContext: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  callMethod("StartMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 1, "piratesship")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 2, "piratescannonball")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 3, "piratespowerup")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 4, "piratesturret")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 5, "piratesbuilding")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 7, "piratestree")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 8, "pirateswindindicator")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 9, "piratesscoreboard")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 10, "piratesbridge")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 11, "piratesseamonster")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 12, "pirateswhirlpool")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 13, "piratesmoonlight")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 14, "piratesoilspill")
  callNamed("executeMessage", symbol("RegisterMinigameObject"), 15, "piratesbuilding")
  callNamed("executeMessage", symbol("SetMinigameOwnerRef"), meProp(_me, "m_myAvatarRef"))
  callMethod("_SetPooledAllocationModel", callMethod("getComponent", callNamed("getThread", "minigame")))
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_stage"))) ? 0 : 1)) {
  callNamed("put", "preallocate often-used objects")
  callMethod("Reserve", callMethod("GetObjectPool", callMethod("getComponent", callNamed("getThread", "minigame"))), "piratescannonball", 30)
  callMethod("Reserve", callMethod("GetObjectPool", callMethod("getComponent", callNamed("getThread", "minigame"))), "piratespuff", 10)
  callMethod("Reserve", callMethod("GetObjectPool", callMethod("getComponent", callNamed("getThread", "minigame"))), "piratespowerup", 20)
  setMeProp(_me, "m_gameInitialized", 1);
  if (callNamed("voidp", meProp(_me, "m_rCloudField"))) {
  setMeProp(_me, "m_rCloudField", callNamed("createObject", "PiratesCloudField", "CCloudField"));
  }

  callMethod("InitClouds", meProp(_me, "m_rCloudField"), callNamed("getVariableValue", "visual.noclouds"))
  setMeProp(_me, "m_ar_ar_dmgObjects", new LingoList([]));
  setMeProp(_me, "m_ar_ar_burnObjects", new LingoList([]));
  var tBurnRoot = callMethod("Search", callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room"))), "NAME", "Burn");
  if ((lingoTruthy(callNamed("voidp", tBurnRoot)) ? 0 : 1)) {
  for (var i = 1; i <= callMethod("GetCount", tBurnRoot); ++i) {
  var tName = callMethod("GetParam", tBurnRoot[i], "NAME");
  if (lingoBinary("eq", tName.char[1], "h")) {
  var sc = tName.char[2];
  if (lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("or", lingoBinary("eq", sc, "0"), lingoBinary("eq", sc, "1")), lingoBinary("eq", sc, "2")), lingoBinary("eq", sc, "3")), lingoBinary("eq", sc, "4")), lingoBinary("eq", sc, "5")), lingoBinary("eq", sc, "6")), lingoBinary("eq", sc, "7")), lingoBinary("eq", sc, "8")), lingoBinary("eq", sc, "9"))) {
  if (lingoBinary("contains", tName, "dmg")) {
  var tStart = callNamed("offset", "dmg", tName);
  var tBuildingIndex = callNamed("value", callNamed("chars", tName, 2, lingoBinary("sub", tStart, 1)));
  var tDmgLevel = callNamed("value", callNamed("chars", tName, lingoBinary("add", tStart, 3), tName.length));
  while (lingoBinary("lt", meProp(_me, "m_ar_ar_dmgObjects").count, tBuildingIndex)) {
  callMethod("append", meProp(_me, "m_ar_ar_dmgObjects"), new LingoList([]))
  }

  if (lingoBinary("neq", callNamed("ilk", meProp(_me, "m_ar_ar_dmgObjects")[tBuildingIndex]), symbol("list"))) {
  meProp(_me, "m_ar_ar_dmgObjects")[tBuildingIndex] = new LingoList([]);
  }

  while (lingoBinary("lt", meProp(_me, "m_ar_ar_dmgObjects")[tBuildingIndex].count, tDmgLevel)) {
  callMethod("append", meProp(_me, "m_ar_ar_dmgObjects")[tBuildingIndex], new LingoList([]))
  }

  callMethod("append", meProp(_me, "m_ar_ar_dmgObjects")[tBuildingIndex][tDmgLevel], tBurnRoot[i])
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tBurnRoot[i])), "visible", 0);
  continue;
  }

  if (lingoBinary("contains", tName, "burn")) {
  tStart = callNamed("offset", "burn", tName);
  tBuildingIndex = callNamed("value", callNamed("chars", tName, 2, lingoBinary("sub", tStart, 1)));
  if (lingoBinary("lt", meProp(_me, "m_ar_ar_burnObjects").count, tBuildingIndex)) {
  meProp(_me, "m_ar_ar_burnObjects")[tBuildingIndex] = new LingoList([tBurnRoot[i]]);
  } else {
  if (lingoBinary("neq", callNamed("ilk", meProp(_me, "m_ar_ar_burnObjects")[tBuildingIndex]), symbol("list"))) {
  meProp(_me, "m_ar_ar_burnObjects")[tBuildingIndex] = new LingoList([tBurnRoot[i]]);
  } else {
  callMethod("append", meProp(_me, "m_ar_ar_burnObjects")[tBuildingIndex], tBurnRoot[i])
  }

  }

  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tBurnRoot[i])), "visible", 0);
  }

  }

  }

  }

  }

  setMeProp(_me, "m_ar_buildingBounds", new LingoList([]));
  var t_mp_mp_fixtures = callMethod("GetBuildings", meProp(_me, "m_stage"));
  for (var i = 1; i <= t_mp_mp_fixtures.count; ++i) {
  var tIndex = callMethod("getPropAt", t_mp_mp_fixtures, i);
  var tRect = callMethod("getaProp", t_mp_mp_fixtures, tIndex).BBox;
  meProp(_me, "m_ar_buildingBounds")[tIndex] = new LingoList([callNamed("intvector", tRect.left, tRect.top, 0), callNamed("intvector", tRect.right, tRect.bottom, 0)]);
  }

  callMethod("_SendStageLoaded", callMethod("getHandler", callNamed("getThread", "minigame")))
  }

}

