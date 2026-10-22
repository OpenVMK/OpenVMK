// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / showHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showHide(_me: LingoMe) {
  setMeProp(_me, "m_bVisible", (lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1));
  if (meProp(_me, "m_bVisible")) {
  callMethod("show", _me)
  } else {
  callMethod("hide", _me)
  }

}

