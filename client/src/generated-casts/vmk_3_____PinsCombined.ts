// vmk_3.dcr /  / _PinsCombined

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PinsCombined(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iUpdatedPinRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sUpdatedPinOldGroup = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sUpdatedPinNewGroup = callMethod("GetStrFrom", a_rMsg.connection);
  var t_iNewLevel = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iRemovedPinRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sRemovedPinGroup = callMethod("GetStrFrom", a_rMsg.connection);
  var t_rItem = callNamed("duplicate", callNamed("GetItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_sUpdatedPinOldGroup));
  callMethod("setaProp", t_rItem, symbol("param"), t_iNewLevel)
  callMethod("setaProp", t_rItem, symbol("group"), t_sUpdatedPinNewGroup)
  callMethod("setaProp", t_rItem, symbol("state"), symbol("normal"))
  var t_rDetails = callNamed("GetItemDetails", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_sUpdatedPinOldGroup);
  if ((lingoTruthy(callNamed("voidp", t_rDetails)) ? 0 : 1)) {
  t_rDetails = callNamed("duplicate", t_rDetails);
  }

  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_iUpdatedPinRef, t_sUpdatedPinOldGroup)
  callMethod("RemItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_iRemovedPinRef, t_sRemovedPinGroup)
  callNamed("addItem", callMethod("GetInventory", callMethod("getComponent", _this), 1), symbol("pins"), t_iUpdatedPinRef, t_rItem, t_rDetails, t_sUpdatedPinNewGroup)
}

