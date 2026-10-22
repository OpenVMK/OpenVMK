// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / AdjustHighlighters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdjustHighlighters(_me: LingoMe, _this: LingoValue, a_iBlend: LingoValue, a_kInk: LingoValue) {
  callNamed("call", symbol("TellVisual"), callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this))), symbol("AdjustHighlighter"), a_iBlend, a_kInk)
}

