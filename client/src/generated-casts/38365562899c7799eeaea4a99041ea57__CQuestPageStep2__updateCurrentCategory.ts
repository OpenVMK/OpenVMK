// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / updateCurrentCategory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateCurrentCategory(_me: LingoMe) {
  switch (meProp(_me, "m_sSelectedTab")) {
case "furnishings":
  var t_iCategory = symbol("items");
  break;
case "pins":
  t_iCategory = symbol("pins");
  break;
case "posters":
  t_iCategory = symbol("posters");
  break;
case "clothing":
  t_iCategory = symbol("clothes");
  break;
  default:
  t_iCategory = symbol("items");
  }

  var t = new LingoPropList([]);
  if (callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCategory, t)) {
  callMethod("update", _me, t, t_iCategory)
  } else {
  callNamed("put", lingoBinary("joinPad", "Could not get clothes-data from inventory", t_iCategory))
  }

}

