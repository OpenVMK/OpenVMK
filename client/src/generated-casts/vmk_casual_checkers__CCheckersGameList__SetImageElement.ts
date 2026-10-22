// vmk_casual_checkers.cct / CCheckersGameList / SetImageElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetImageElement(_me: LingoMe, _this: LingoValue, a_rElem: LingoValue) {
  setMeProp(_me, "m_rElement", a_rElem);
  callMethod("SetGameList", _this, callMethod("GetGameList", _this))
}

