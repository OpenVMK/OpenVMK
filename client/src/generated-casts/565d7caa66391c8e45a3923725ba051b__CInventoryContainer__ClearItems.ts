// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / ClearItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ClearItems(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_kCat_rGroups", new LingoPropList([]));
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("items"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("pins"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("clothes"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("posters"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("undefined"), new LingoPropList([]))
}

