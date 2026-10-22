// vmk_tutorial.cct / CJungleCruiseHandlerExtension / OnEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnEvent(_me: LingoMe, i_iEvent: LingoValue, i_ar_iData: LingoValue) {
  var tGameEngine = callMethod("getComponent", callNamed("getThread", "minigame"));
  var tJCEngine = callMethod("getComponent", callNamed("getThread", "junglecruise"));
  var tJCInterface = callMethod("getInterface", callNamed("getThread", "junglecruise"));
  switch (i_iEvent) {
case 1:
  callMethod("AddOneAnimal", callMethod("GetAnimalManager", tJCEngine), i_ar_iData[1], i_ar_iData[2])
  break;
case 2:
  var ttype = symbol("none");
  switch (i_ar_iData[2]) {
case 1:
  ttype = symbol("fuel");
  break;
case 2:
  ttype = symbol("film");
  break;
  }

  callMethod("AddPowerup", tJCEngine, i_ar_iData[1], ttype)
  break;
case 3:
  ttype = symbol("none");
  switch (i_ar_iData[1]) {
case 1:
  callMethod("AwardPowerup", tJCEngine, meProp(_me, "m_iFuelPickup"), 0)
  break;
case 2:
  callMethod("AwardPowerup", tJCEngine, 0, meProp(_me, "m_iFilmPickup"))
  break;
  }

  break;
case 4:
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "Award Score"), i_ar_iData))
  }

  callMethod("AddScore", tJCEngine, i_ar_iData[1], i_ar_iData[2])
  break;
case 5:
  var tBoat = callMethod("GetBoat", tJCEngine);
  if ((lingoTruthy(callNamed("voidp", tBoat)) ? 0 : 1)) {
  callMethod("SetParam", tBoat, "Fuel", i_ar_iData[1])
  }

  callMethod("updatePowerups", tJCInterface)
  break;
case 6:
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "Game end"))
  }

  callMethod("updateScoreinfo", tJCInterface)
  callMethod("updatePowerups", tJCInterface)
  callMethod("EndGame", tJCEngine)
  break;
case 7:
  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", meProp(_me, "m_sDebugPre"), "Round trip bonus"))
  }

  callMethod("AwardPowerup", tJCEngine, i_ar_iData[1], i_ar_iData[2])
  break;
  }

}

