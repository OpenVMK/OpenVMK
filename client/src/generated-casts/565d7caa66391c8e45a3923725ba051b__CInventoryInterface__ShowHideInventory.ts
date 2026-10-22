// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryInterface / ShowHideInventory

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowHideInventory(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rCurPageObj"))) ? 0 : 1)) {
  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), "CInvPageBase"));
  setMeProp(_me, "m_bInitialized", callNamed("objectp", meProp(_me, "m_rCurPageObj")));
  if ((lingoTruthy(meProp(_me, "m_bInitialized")) ? 0 : 1)) {
  return callNamed("error", _this, "Failed to init inventory page!", symbol("_RefreshItemList"));
  }

  callMethod("open", meProp(_me, "m_rCurPageObj"))
  callMethod("RegisterItemListCallback", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), meProp(_me, "m_rCurPageObj"), symbol("update"))
  } else {
  }

  callMethod("open", meProp(_me, "m_rCurPageObj"))
}

