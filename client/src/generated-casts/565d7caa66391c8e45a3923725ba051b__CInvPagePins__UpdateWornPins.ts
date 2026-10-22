// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / UpdateWornPins

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateWornPins(_me: LingoMe, _this: LingoValue, a_mp_kType_mp_iRef_rItem: LingoValue, a_kAlteredCategory: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  switch (a_kAlteredCategory) {
case symbol("pins"):
  var t_mp_iRef_rItem = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  var t_mp_iType_rThumb = new LingoPropList([]);
  var t_iCount = t_mp_iRef_rItem.count;
  for (var i = 1; i <= t_iCount; ++i) {
  callMethod("addProp", t_mp_iType_rThumb, t_mp_iRef_rItem[i].code, undefined)
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_WornPinThumbsReadyCbk")]))
  if (lingoBinary("gt", t_mp_iRef_rItem.count, 0)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 50)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 50)
  }

  break;
  }

  }

}

