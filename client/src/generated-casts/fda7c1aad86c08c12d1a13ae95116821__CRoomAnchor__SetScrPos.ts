// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAnchor / SetScrPos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetScrPos(_me: LingoMe, _this: LingoValue, a_vePos: LingoValue) {
  var t_veScr = callMethod("GetScrPos", _this);
  var t_veAbs = callMethod("GetAbsPos", _this);
  var t_fOffX = lingoBinary("sub", a_vePos.x, t_veScr.x);
  var t_fOffY = lingoBinary("mul", lingoBinary("sub", a_vePos.y, t_veScr.y), 2);
  callMethod("SetAbsPos", _this, callNamed("vector", lingoBinary("add", t_veAbs.x, t_fOffX), lingoBinary("add", t_veAbs.y, t_fOffY), t_veAbs.z))
}

