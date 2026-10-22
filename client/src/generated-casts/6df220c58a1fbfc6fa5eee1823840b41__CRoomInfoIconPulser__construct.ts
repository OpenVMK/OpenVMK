// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoIconPulser / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_pElements", new LingoList([]));
  setMeProp(_me, "m_windowTitle", "");
  setMeProp(_me, "m_gPressed", undefined);
  setMeProp(_me, "m_gNormal", undefined);
  setMeProp(_me, "m_gComposite", undefined);
  callMethod("setParentWindow", _me, "MessageBar")
  callMethod("addElements", _me, new LingoList(["chatbar.info"]))
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_iCounter", 0);
  setMeProp(_me, "m_iSpeed", 10);
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

