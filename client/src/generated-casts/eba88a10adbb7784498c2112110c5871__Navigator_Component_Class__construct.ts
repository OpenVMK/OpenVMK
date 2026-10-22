// eba88a10adbb7784498c2112110c5871.cct / Navigator Component Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_NavSubs", undefined);
  setMeProp(_me, "m_obj_FastPassWindow", undefined);
  callNamed("registerMessage", symbol("ui_navigator"), callMethod("getID", _me), symbol("showhidenavigator"))
  return 1;
}

