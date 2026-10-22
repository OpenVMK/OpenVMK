// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rXMLElement", undefined);
  setMeProp(_me, "m_rXMLAvatar", undefined);
  setMeProp(_me, "m_rXMLPoster", undefined);
  setMeProp(_me, "m_rXMLCollectable", undefined);
  return callMethod("_Config", _this, 0);
}

