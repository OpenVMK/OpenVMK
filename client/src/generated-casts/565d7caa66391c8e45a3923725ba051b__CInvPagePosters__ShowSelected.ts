// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePosters / ShowSelected

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
  if (lingoBinary("lt", t_iCode, 0)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), callMethod("duplicate", callNamed("getMember", "previewbox").image))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.posters.info"), "")
  } else {
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  callNamed("executeMessage", "GetPosterPreview", t_rInput, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_PosterPreviewReadyCbk")]))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.posters.info"), callNamed("getText", lingoBinary("join", "item.", t_iCode), ""))
  if (callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode)) {
  var t_iItemPrice = callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode);
  } else {
  t_iItemPrice = -float(1);
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), lingoBinary("add", 50, lingoBinary("mul", lingoBinary("gt", t_iItemPrice, -float(1)), 50)))
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), symbol("public"))) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.place.button"), symbol("blend"), 50)
  } else {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.place.button"), symbol("blend"), 100)
  }

  setMeProp(_me, "m_iSelected", t_rItem.ref);
  }

}

