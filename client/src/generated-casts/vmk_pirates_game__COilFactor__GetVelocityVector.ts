// vmk_pirates_game.cct / COilFactor / GetVelocityVector

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetVelocityVector(_me: LingoMe, a_iDir: LingoValue, a_iSpeed: LingoValue) {
  var tVelTable = callMethod("GetVelocityTable", meProp(_me, "m_rGameEngine"));
  var tVel = callNamed("intvector", lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelX", tVelTable, a_iDir), a_iSpeed), 512), lingoBinary("div", lingoBinary("mul", callMethod("GetBaseVelY", tVelTable, a_iDir), a_iSpeed), 512), 0);
  return tVel;
}

