// vmk_tutorial.cct / CJungleCruiseComponent / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callNamed("voidp", meProp(_me, "m_stage"))) {
  return;
  }

  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  setMeProp(_me, "m_sdacc", lingoBinary("add", meProp(_me, "m_sdacc"), 1));
  if (lingoBinary("gt", meProp(_me, "m_sdacc"), meProp(_me, "m_soundUpdateFreq"))) {
  callMethod("updateSound", _me)
  setMeProp(_me, "m_sdacc", 1);
  }

  if (lingoBinary("eq", callMethod("GetName", meProp(_me, "m_stage")), "dock.stage1")) {
  callMethod("DisableCollision", callMethod("GetFactor", meProp(_me, "m_boat")))
  var tSay = callMethod("GetSomethingToSay", meProp(_me, "m_tutorial"));
  if (lingoBinary("gt", tSay.count, 0)) {
  callMethod("SaySomething", meProp(_me, "m_hostCharacter"), tSay.sound, tSay.text)
  }

  var tDist = lingoBinary("sub", callNamed("vector", 500, 265, callMethod("GetScrPos", meProp(_me, "m_boat")).z), callMethod("GetScrPos", meProp(_me, "m_boat"))).length;
  if (lingoBinary("and", lingoBinary("lt", tDist, 100), (lingoTruthy(meProp(_me, "m_avatarInBoat")) ? 0 : 1))) {
  callMethod("_SendStageLoaded", callMethod("getHandler", callNamed("getThread", "minigame")))
  callMethod("SetParam", meProp(_me, "m_boat"), "AvatarOn", 1)
  setThePropOf(meProp(_me, "m_avatarOnDock"), "member", undefined);
  setMeProp(_me, "m_avatarInBoat", 1);
  var tdir = 1;
  if (lingoBinary("eq", callMethod("getDirection", meProp(_me, "m_stage")), "down")) {
  tdir = 3;
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_avatarFigure"))) ? 0 : 1)) {
  var t_mpList = new LingoPropList([symbol("figure"), meProp(_me, "m_ar_avatarFigure"), symbol("dir"), new LingoList([tdir, tdir]), symbol("act"), new LingoList([100, 0]), symbol("Output"), undefined]);
  callNamed("executeMessage", "GetAvatarImage", t_mpList)
  setThePropOf(callNamed("member", "tempAvatarImage"), "image", t_mpList[symbol("Output")]);
  if (lingoBinary("eq", tdir, 1)) {
  setThePropOf(callNamed("member", "tempAvatarImage"), "regPoint", callNamed("point", 73, 116));
  } else {
  setThePropOf(callNamed("member", "tempAvatarImage"), "regPoint", callNamed("point", 65, 152));
  }

  }

  }

  } else {
  if ((lingoTruthy(meProp(_me, "m_avatarInBoat")) ? 0 : 1)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_boat"))) ? 0 : 1)) {
  callMethod("SetParam", meProp(_me, "m_boat"), "AvatarOn", 1)
  setThePropOf(meProp(_me, "m_avatarOnDock"), "member", undefined);
  setMeProp(_me, "m_avatarInBoat", 1);
  }

  }

  }

  if (callMethod("GetGameEnd", _me)) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_boat"))) ? 0 : 1)) {
  tDist = lingoBinary("sub", callNamed("vector", 500, 265, callMethod("GetScrPos", meProp(_me, "m_boat")).z), callMethod("GetScrPos", meProp(_me, "m_boat"))).length;
  if (lingoBinary("lt", tDist, 150)) {
  callMethod("GoToAlbumView", _me)
  }

  }

  }

  if ((lingoTruthy(callMethod("GetGameEnd", _me)) ? 0 : 1)) {
  callMethod("update", meProp(_me, "m_animalMgr"))
  callMethod("update", meProp(_me, "m_powerupMgr"))
  callMethod("update", meProp(_me, "m_hazardMgr"))
  if (callMethod("StageFinished", _me)) {
  callMethod("disableCamera", callMethod("getInterface", _me))
  setMeProp(_me, "m_Color", callMethod("GetParam", meProp(_me, "m_boat"), "Color"));
  setMeProp(_me, "m_deviation", callMethod("GetParam", meProp(_me, "m_boat"), "Deviation"));
  setMeProp(_me, "m_fuel", callMethod("GetParam", meProp(_me, "m_boat"), "Fuel"));
  setMeProp(_me, "m_film", callMethod("GetParam", meProp(_me, "m_boat"), "Film"));
  setMeProp(_me, "m_throttle", callMethod("GetParam", meProp(_me, "m_boat"), "Throttle"));
  callNamed("executeMessage", symbol("SendMinigameAction"), 3, new LingoList([]))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_stage")))
  setMeProp(_me, "m_stage", 0);
  callMethod("StopSound", meProp(_me, "m_rMotorSound"))
  if (lingoBinary("neq", callNamed("getThread", "junglecruiseViewer"), 0)) {
  callNamed("executeMessage", "JCViewer")
  }

  }

  }

  }

}

