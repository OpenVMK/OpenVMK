// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  if ((lingoTruthy(callMethod("getInventoryLoaded", callMethod("getComponent", callNamed("getThread", "inventory")))) ? 0 : 1)) {
  callMethod("_LoadInventory", callMethod("getComponent", callNamed("getThread", "inventory")))
  }

  setMeProp(_me, "m_rInterface", callNamed("createObject", callNamed("getUniqueID"), "CQuestWindowManager"));
  callMethod("SetOwner", meProp(_me, "m_rInterface"), _me)
  setMeProp(_me, "m_sCurrentPage", "");
  setMeProp(_me, "m_ar_data", new LingoPropList([]));
  callMethod("setFocus", callMethod("getElement", callNamed("getWindow", "MessageBar"), "chat.field"), 0)
  return 1;
}

