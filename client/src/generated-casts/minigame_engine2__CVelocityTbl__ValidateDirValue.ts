// minigame_engine2.cct / CVelocityTbl / ValidateDirValue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ValidateDirValue(_me: LingoMe, _this: LingoValue, a_iDirValue: LingoValue) {
  if (lingoBinary("gt", a_iDirValue, 359)) {
  return lingoBinary("mod", a_iDirValue, 360);
  } else {
  if (lingoBinary("lt", a_iDirValue, 0)) {
  return lingoBinary("add", 360, lingoBinary("mod", a_iDirValue, 360));
  }

  }

  return a_iDirValue;
}

