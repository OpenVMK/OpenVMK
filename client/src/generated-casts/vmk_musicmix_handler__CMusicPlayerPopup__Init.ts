// vmk_musicmix_handler.cct / CMusicPlayerPopup / Init

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Init(_me: LingoMe, t_iClientID: LingoValue) {
  setMeProp(_me, "m_iClientID", t_iClientID);
  callMethod("show", _me)
}

