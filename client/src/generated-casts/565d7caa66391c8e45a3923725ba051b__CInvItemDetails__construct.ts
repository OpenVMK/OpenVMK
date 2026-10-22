// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemDetails / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_NonTradableItems", new LingoList([]));
  setMeProp(_me, "m_mp_props", new LingoPropList([]));
  if (callNamed("variableExists", "nontradable")) {
  setMeProp(_me, "m_ar_NonTradableItems", callNamed("getVariableValue", "nontradable"));
  }

  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("RemoveMe"))
  return 1;
}

