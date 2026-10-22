// vmk_domestic.cct /  / m_iLastDir

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function m_iLastDir(_me: LingoMe, handle_petchat: LingoValue, t_rRenderMember: LingoValue) {
  if (lingoBinary("gt", handle_petchat.setVariable.t_rSprite, 0)) {
  setThePropOf(handle_petchat.setVariable, "m_iLastDir", t_rRenderMember);
  }

}

