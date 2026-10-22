// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / ShowSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSelected(_me: LingoMe, _this: LingoValue) {
  var t_rItem = callMethod("GetSelected", _this);
  var t_iCode = t_rItem.code;
  var t_rBack = callMethod("duplicate", meProp(_me, "m_rPrevBackImage"));
  if (lingoBinary("lt", t_iCode, 0)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.pin.info"), "")
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.wear.button"), symbol("blend"), 50)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), 50)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("blend"), 50)
  } else {
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  callNamed("executeMessage", "GetPinPreview", t_rInput, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_PinPreviewReady")]))
  var t_mp_wornPins = callMethod("GetItemListByCategory", callMethod("GetInventory", callNamed("getThread", "inventory").component, 3), symbol("pins"));
  if (lingoBinary("and", lingoBinary("gt", callMethod("getaProp", t_rItem, symbol("param")), 0), lingoBinary("eq", meProp(_me, "m_kActive"), symbol("pins")))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("blend"), 100)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("blend"), 50)
  }

  if (lingoBinary("or", lingoBinary("eq", t_mp_wornPins.count, 15), lingoBinary("eq", meProp(_me, "m_kActive"), symbol("worn_pins")))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.wear.button"), symbol("blend"), 50)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.wear.button"), symbol("blend"), 100)
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), symbol("visible"), 0)
  if (lingoBinary("and", lingoBinary("gt", callMethod("getaProp", t_rItem, symbol("param")), 0), lingoBinary("or", lingoBinary("eq", meProp(_me, "m_kActive"), symbol("pins")), lingoBinary("eq", meProp(_me, "m_kActive"), symbol("worn_pins"))))) {
  if (callNamed("integerp", callMethod("getaProp", t_rItem, symbol("param")))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), symbol("visible"), 1)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), callNamed("getMember", "inv.pin.star.prev").image)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), callNamed("getText", "magic.pin.info.text"))
  }

  } else {
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), callNamed("getText", "normal.pin.info.text"))
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass.info"), symbol("visible"), 0)
  if (lingoBinary("and", callMethod("getaProp", t_rItem, symbol("singleuse")), lingoBinary("or", lingoBinary("eq", meProp(_me, "m_kActive"), symbol("pins")), lingoBinary("eq", meProp(_me, "m_kActive"), symbol("worn_pins"))))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.combine.button"), symbol("blend"), 50)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), symbol("visible"), 1)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "singleuse"), callNamed("getMember", "icon.singleuse").image)
  var t_iExpiryDate = callMethod("getaProp", t_rItem, symbol("expirydate"));
  if (lingoBinary("neq", t_iExpiryDate, -float(1))) {
  var t_iHours = lingoBinary("div", t_iExpiryDate, 3600);
  var t_IDaysLeft = lingoBinary("div", t_iHours, 24);
  var t_sTxt = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", callNamed("getText", "singleuse.expiry.info.text"), "\r"), t_IDaysLeft), callNamed("getText", "days.left.text"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), t_sTxt)
  var t_iRef = t_rItem.ref;
  if (lingoBinary("eq", meProp(_me, "m_kActive"), symbol("worn_pins"))) {
  var t_sCategory = symbol("wornPins");
  } else {
  t_sCategory = symbol("itemInventory");
  }

  var t_rDetails = callMethod("GetItemDetails", callMethod("GetInventory", callMethod("getComponent", callNamed("getThread", "inventory")), 1), symbol("pins"), t_rItem.group);
  if ((lingoTruthy(callNamed("voidp", t_rDetails)) ? 0 : 1)) {
  var t_sTicketGoodFor = callMethod("getaProp", t_rDetails, "goodfor");
  } else {
  t_sTicketGoodFor = undefined;
  }

  if ((lingoTruthy(callNamed("voidp", t_sTicketGoodFor)) ? 0 : 1)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass"), symbol("visible"), 1)
  var t_Img = callNamed("getMember", "icon.fastpass").image;
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass"), t_Img)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.cancelcombine.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass.info"), symbol("visible"), 1)
  t_sTxt = lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("getText", "tickets.goodfor"), "\r"), t_sTicketGoodFor), callNamed("getText", "room.tickets.for.room"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass.info"), t_sTxt)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "fastpass.info"), symbol("visible"), 0)
  }

  } else {
  t_sTxt = callNamed("getText", "singleuse.info.text");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "expiredate.info"), t_sTxt)
  }

  }

  }

  if (lingoBinary("eq", meProp(_me, "m_kActive"), symbol("pins"))) {
  if (callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode)) {
  var t_iItemPrice = callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode);
  } else {
  t_iItemPrice = -float(1);
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), lingoBinary("add", 50, lingoBinary("mul", lingoBinary("gt", t_iItemPrice, -float(1)), 50)))
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), 50)
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.pin.info"), callNamed("getText", lingoBinary("join", "item.", t_iCode), ""))
  setMeProp(_me, "m_iSelected", t_rItem.ref);
}

