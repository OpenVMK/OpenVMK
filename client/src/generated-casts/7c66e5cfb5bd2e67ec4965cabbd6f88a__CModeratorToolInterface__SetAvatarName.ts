// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / SetAvatarName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAvatarName(_me: LingoMe, _this: LingoValue, a_sName: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objModAKB"))) {
  if (callNamed("voidp", a_sName)) {
  callMethod("SetName", meProp(_me, "m_objModAKB"), "")
  callMethod("SelectUser", meProp(_me, "m_objModAKB"), undefined)
  } else {
  callMethod("SetName", meProp(_me, "m_objModAKB"), a_sName)
  callMethod("SelectUser", meProp(_me, "m_objModAKB"), undefined)
  }

  }

  if (callNamed("objectp", meProp(_me, "m_objModMenu"))) {
  if (callNamed("voidp", a_sName)) {
  callMethod("SetName", meProp(_me, "m_objModMenu"), "")
  callMethod("SelectUser", meProp(_me, "m_objModMenu"), undefined)
  } else {
  callMethod("SetName", meProp(_me, "m_objModMenu"), a_sName)
  callMethod("SelectUser", meProp(_me, "m_objModMenu"), undefined)
  }

  }

}

