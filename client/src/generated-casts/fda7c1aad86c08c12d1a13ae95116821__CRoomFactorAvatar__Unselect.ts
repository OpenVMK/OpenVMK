// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorAvatar / Unselect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Unselect(_me: LingoMe, _this: LingoValue) {
  callMethod("Unselect", callMethod("GetVisual", callMethod("getObject", _this)))
  return callNamed("callAncestor", symbol("Unselect"), _this);
}

