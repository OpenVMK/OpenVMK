// vmk_domestic.cct /  / t_veScr

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function t_veScr(_me: LingoMe, handle_petchat: LingoValue, m_iCurrentDir: LingoValue) {
  callNamed("doubleClick", symbol("t_veScr"), handle_petchat, m_iCurrentDir)
  setMeProp(_me, "m_iAction", callMethod("m_rRenderer", m_iCurrentDir));
}

