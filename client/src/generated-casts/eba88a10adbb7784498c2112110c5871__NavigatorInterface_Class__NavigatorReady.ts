// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / NavigatorReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function NavigatorReady(_me: LingoMe) {
  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "m_page"), symbol("parkmap")), lingoBinary("eq", meProp(_me, "m_page"), symbol("whatsnew")))) {
  setMeProp(_me, "m_ar_MinigameNavNodes", callMethod("GetNavNodes", callMethod("getComponent", _me)));
  }

}

