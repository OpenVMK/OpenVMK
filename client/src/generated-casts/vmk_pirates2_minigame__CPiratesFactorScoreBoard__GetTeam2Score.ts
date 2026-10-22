// vmk_pirates2_minigame.cct / CPiratesFactorScoreBoard / GetTeam2Score

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetTeam2Score(_me: LingoMe) {
  var t_ar_rShips = callMethod("GetObjectsByCode", callMethod("getComponent", callNamed("getThread", "minigame")), 1);
  var t_teamGold = 0;
  for (var tShip of t_ar_rShips.toArray()) {
  switch (callMethod("GetParam", tShip, "Team")) {
case 2:
  t_teamGold = lingoBinary("add", t_teamGold, callMethod("GetParam", tShip, "Score"));
  break;
  }

  }

  return t_teamGold;
}

