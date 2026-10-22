// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  switch (a_kAlteredCategory) {
case symbol("items"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridFurnishings"));
  setMeProp(_me, "m_iSelected", -float(1));
  callMethod("render", meProp(_me, "m_rGridRenderer"), a_mp_kType_mp_iRef_rItem, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  break;
case symbol("pins"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPins"));
  setMeProp(_me, "m_iSelected", -float(1));
  callMethod("render", meProp(_me, "m_rGridRenderer"), a_mp_kType_mp_iRef_rItem, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  break;
case symbol("posters"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridPosters"));
  setMeProp(_me, "m_iSelected", -float(1));
  callMethod("render", meProp(_me, "m_rGridRenderer"), a_mp_kType_mp_iRef_rItem, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  break;
case symbol("clothes"):
  setMeProp(_me, "m_rGridRenderer", meProp(_me, "m_rGridClothing"));
  setMeProp(_me, "m_iSelected", -float(1));
  callMethod("render", meProp(_me, "m_rGridRenderer"), a_mp_kType_mp_iRef_rItem, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.inventory"))
  break;
case symbol("step2"):
case "step2":
  setMeProp(_me, "m_sSelectedTab", "furnishings");
  callMethod("HideTabs", _me)
  var t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("items"), t)) {
  callMethod("update", _me, t, symbol("items"))
  } else {
  callNamed("put", "Could not get items-data from inventory")
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown category updated in step2:", a_kAlteredCategory))
  break;
  }

  }

}

