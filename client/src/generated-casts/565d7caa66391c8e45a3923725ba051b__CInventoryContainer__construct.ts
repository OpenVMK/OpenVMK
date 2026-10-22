// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryContainer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_kCat_rGroups", new LingoPropList([]));
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("items"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("pins"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("clothes"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("posters"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rGroups"), symbol("undefined"), new LingoPropList([]))
  setMeProp(_me, "m_mp_kCat_rDetails", new LingoPropList([]));
  callMethod("addProp", meProp(_me, "m_mp_kCat_rDetails"), symbol("items"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rDetails"), symbol("pins"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rDetails"), symbol("clothes"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rDetails"), symbol("posters"), new LingoPropList([]))
  callMethod("addProp", meProp(_me, "m_mp_kCat_rDetails"), symbol("undefined"), new LingoPropList([]))
  callMethod("sort", meProp(_me, "m_mp_kCat_rDetails")[symbol("items")])
  callMethod("sort", meProp(_me, "m_mp_kCat_rDetails")[symbol("pins")])
  callMethod("sort", meProp(_me, "m_mp_kCat_rDetails")[symbol("clothes")])
  callMethod("sort", meProp(_me, "m_mp_kCat_rDetails")[symbol("posters")])
  callMethod("sort", meProp(_me, "m_mp_kCat_rDetails")[symbol("undefined")])
  setMeProp(_me, "m_ar_mp_itemListCallbacks", new LingoList([]));
  setMeProp(_me, "m_ar_mp_detailsCallbacks", new LingoList([]));
  return 1;
}

