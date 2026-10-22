// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rVisual"))) {
  callNamed("deconstruct", meProp(_me, "m_rVisual"))
  }

  if (callNamed("objectp", meProp(_me, "m_rFactor"))) {
  callNamed("deconstruct", meProp(_me, "m_rFactor"))
  }

  setMeProp(_me, "m_rVisual", undefined);
  setMeProp(_me, "m_rFactor", undefined);
  setMeProp(_me, "m_bRunning", 0);
  return 1;
}

