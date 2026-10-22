// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / TellVisual

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TellVisual(_me: LingoMe, _this: LingoValue, a_kMethod: LingoValue, a_vArgA: LingoValue, a_vArgB: LingoValue, a_vArgC: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  callNamed("call", a_kMethod, new LingoList([meProp(_me, "m_rVisual")]), a_vArgA, a_vArgB, a_vArgC)
  }

}

