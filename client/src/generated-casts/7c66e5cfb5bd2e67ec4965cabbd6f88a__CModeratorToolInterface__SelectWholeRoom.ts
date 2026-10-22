// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorToolInterface / SelectWholeRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectWholeRoom(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objModAKB"))) {
  callMethod("SelectWholeRoom", meProp(_me, "m_objModAKB"))
  }

  if (callNamed("objectp", meProp(_me, "m_objModMenu"))) {
  callMethod("SelectWholeRoom", meProp(_me, "m_objModMenu"))
  }

}

