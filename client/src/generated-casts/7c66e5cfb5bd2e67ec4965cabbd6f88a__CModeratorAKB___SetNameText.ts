// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _SetNameText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SetNameText(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWnd"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWnd"), "mods.akb.target")) {
  if (lingoBinary("and", (lingoTruthy(callNamed("objectp", meProp(_me, "m_ObjUserToOperate"))) ? 0 : 1), lingoBinary("eq", meProp(_me, "m_sName"), ""))) {
  var t_sTxt = callNamed("getText", "mods.room");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.akb.target"), t_sTxt)
  } else {
  if (lingoBinary("neq", meProp(_me, "m_sName"), "")) {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWnd"), "mods.akb.target"), meProp(_me, "m_sName"))
  }

  }

  }

  }

}

