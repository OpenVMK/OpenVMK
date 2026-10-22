// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "thumbs.grid.b":
  callMethod("Unselect", meProp(_me, "m_rWornRenderer"))
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 50)
  setMeProp(_me, "m_kActive", symbol("pins"));
  if (theProperty("doubleClick")) {
  var t_rSelected = callMethod("GetSelected", _this);
  if (lingoBinary("neq", t_rSelected.state, symbol("invalid"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "WearPin", new LingoPropList([symbol("int"), t_rSelected.ref]))
  }

  }

  switch (meProp(_me, "m_kMode")) {
case symbol("select"):
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  callMethod("ShowSelected", _this)
  break;
case symbol("Combine"):
  var t_iOriginal = meProp(_me, "m_iSelected");
  var t_rOriginal = callMethod("getaProp", meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")], t_iOriginal);
  callMethod("MouseSelection", meProp(_me, "m_rGridRenderer"), a_vParam)
  var t_rItem = callMethod("GetSelected", _this);
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.cancelcombine.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.wear.button"), symbol("blend"), 100)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), 100)
  if (lingoBinary("eq", t_rItem.state, symbol("normal"))) {
  if (lingoBinary("neq", t_iOriginal, t_rItem.ref)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "pins.combine.dialog", 2, 1);
  var t_sTitle = callNamed("getText", "inv.pins.combine.dialog.title");
  var t_sText = callNamed("getText", "inv.pins.combine.dialog.text");
  var t_rBtn1 = new LingoPropList([symbol("text"), callNamed("getText", "inv.pins.combine.dialog.btnCancel"), symbol("eventID"), symbol("dialogCancel"), symbol("data"), ""]);
  var t_rBtn2 = new LingoPropList([symbol("text"), callNamed("getText", "inv.pins.combine.dialog.btnOK"), symbol("eventID"), symbol("dialogOK"), symbol("data"), new LingoPropList([symbol("int"), t_iOriginal, symbol("int"), t_rItem.ref])]);
  callMethod("setText", t, t_sText, t_sTitle, t_rBtn1, t_rBtn2)
  callMethod("show", t)
  callMethod("_ActivateWornPinWindow", _this, 1)
  }

  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "ErrorDialog", 1, 0);
  callMethod("show", t)
  var t_sTxt = callNamed("getText", "error.4525");
  callMethod("setText", t, t_sTxt, "Error", "OK")
  callMethod("_ActivateWornPinWindow", _this, 1)
  for (var tPin of meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].toArray()) {
  callMethod("setaProp", tPin, symbol("state"), symbol("normal"))
  }

  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  }

  callMethod("ShowSelected", _this)
  setMeProp(_me, "m_kMode", symbol("select"));
  break;
  }

  break;
case "thumbs.grid.h":
  setMeProp(_me, "m_kActive", symbol("worn_pins"));
  callMethod("Unselect", meProp(_me, "m_rGridRenderer"))
  callMethod("MouseSelection", meProp(_me, "m_rWornRenderer"), a_vParam)
  callMethod("ShowSelected", _this)
  var t_iSelected = callMethod("GetSelected", meProp(_me, "m_rWornRenderer"));
  t_rSelected = callMethod("GetSelected", _this);
  var t_mp_wornPins = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  if (lingoBinary("and", lingoBinary("gt", t_iSelected, 0), lingoBinary("lte", t_iSelected, t_mp_wornPins.count))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 100)
  if (theProperty("doubleClick")) {
  callMethod("send", callNamed("getConnection", "VMK"), "UnwearPin", new LingoPropList([symbol("int"), t_rSelected.ref]))
  }

  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 50)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("blend"), 50)
  }

  break;
case "inv.wear.button":
  t_rSelected = callMethod("GetSelected", _this);
  if (lingoBinary("neq", t_rSelected.state, symbol("invalid"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "WearPin", new LingoPropList([symbol("int"), t_rSelected.ref]))
  }

  break;
case "inv.sell.button":
  t_rSelected = callMethod("GetSelected", _this);
  if (lingoBinary("neq", t_rSelected.state, symbol("invalid"))) {
  callMethod("send", callNamed("getConnection", "VMK"), "SellItemRequest", new LingoPropList([symbol("int"), t_rSelected.ref]))
  }

  break;
case "inv.takeoff.button":
  t_iSelected = callMethod("GetSelected", meProp(_me, "m_rWornRenderer"));
  t_mp_wornPins = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  if (lingoBinary("and", lingoBinary("gt", t_iSelected, 0), lingoBinary("lte", t_iSelected, t_mp_wornPins.count))) {
  callMethod("send", callNamed("getConnection", "VMK"), "UnwearPin", new LingoPropList([symbol("int"), t_mp_wornPins[t_iSelected].ref]))
  }

  break;
case "inv.combine.button":
  t_rItem = callMethod("GetSelected", _this);
  if (lingoBinary("eq", t_rItem.param, 5)) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "ErrorDialog", 1, 0);
  callMethod("show", t)
  callMethod("setText", t, callNamed("getText", "error.4527"), "Error", "OK")
  return 1;
  }

  setMeProp(_me, "m_kMode", symbol("Combine"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.pin.info"), callNamed("getText", "inv.select.combine"))
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.cancelcombine.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.wear.button"), symbol("blend"), 50)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), 50)
  for (var tPin of meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].toArray()) {
  if (lingoBinary("neq", callMethod("getaProp", tPin, symbol("code")), callMethod("getaProp", t_rItem, symbol("code")))) {
  callMethod("setaProp", tPin, symbol("state"), symbol("invalid"))
  continue;
  }

  if (lingoBinary("gt", lingoBinary("add", tPin.param, t_rItem.param), 5)) {
  callMethod("setaProp", tPin, symbol("state"), symbol("invalid"))
  }

  }

  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  callMethod("_ActivateWornPinWindow", _this, 0)
  break;
case "inv.cancelcombine.button":
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.cancelcombine.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.takeoff.button"), symbol("blend"), 100)
  for (var t_rPin of meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].toArray()) {
  callMethod("setaProp", t_rPin, symbol("state"), symbol("normal"))
  }

  callMethod("_ActivateWornPinWindow", _this, 1)
  callMethod("ShowSelected", _this)
  setMeProp(_me, "m_kMode", symbol("select"));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  break;
case "inv.grid.next":
  if (lingoBinary("gt", meProp(_me, "m_mp_kType_mp_iRef_rItem")[symbol("pins")].count, lingoBinary("mul", meProp(_me, "m_iCurrentPage"), meProp(_me, "m_iItemsPerPage")))) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("add", meProp(_me, "m_iCurrentPage"), 1));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  }

  break;
case "inv.grid.prev":
  if (lingoBinary("gt", meProp(_me, "m_iCurrentPage"), 1)) {
  setMeProp(_me, "m_iCurrentPage", lingoBinary("sub", meProp(_me, "m_iCurrentPage"), 1));
  callMethod("update", _this, meProp(_me, "m_mp_kType_mp_iRef_rItem"), symbol("pins"))
  }

  break;
case "help":
  callNamed("executeMessage", "ui_help", "help.inventory.pins")
  break;
  }

}

