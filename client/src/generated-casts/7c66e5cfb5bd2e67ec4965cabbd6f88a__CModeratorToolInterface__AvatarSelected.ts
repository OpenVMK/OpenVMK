// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / AvatarSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvatarSelected(_me: LingoMe, _this: LingoValue, a_obj: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objModAKB"))) {
  callMethod("SelectUser", meProp(_me, "m_objModAKB"), a_obj)
  }

  if (callNamed("objectp", meProp(_me, "m_objModMenu"))) {
  callMethod("SelectUser", meProp(_me, "m_objModMenu"), a_obj)
  }

}

