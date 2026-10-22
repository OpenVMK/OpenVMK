// vmk_domestic.cct /  / m_iLastAct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_iLastAct(_me: LingoMe, handle_petchat: LingoValue) {
  if (lingoBinary("gt", handle_petchat.setVariable.t_rSprite, 0)) {
  setThePropOf(handle_petchat.setVariable, "m_iLastDir", 1);
  }

}

