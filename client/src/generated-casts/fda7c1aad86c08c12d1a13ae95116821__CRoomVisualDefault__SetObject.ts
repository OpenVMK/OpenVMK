// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualDefault / SetObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetObject(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  callNamed("callAncestor", symbol("SetObject"), _this, a_rObj)
  setMeProp(_me, "m_veLastAbs", callMethod("GetAbsPos", a_rObj));
  var t_sSprite = callMethod("GetParam", a_rObj, "SPRITE");
  if (lingoBinary("and", lingoBinary("neq", t_sSprite, ""), lingoBinary("neq", t_sSprite, undefined))) {
  var t_rSprite = callMethod("getaProp", callNamed("getThread", "room").component.m_rSprites, t_sSprite);
  if (callNamed("listp", t_rSprite)) {
  callMethod("_Open", _this, t_rSprite)
  }

  }

}

