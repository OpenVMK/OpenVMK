// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / ShowSelectedImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowSelectedImage(_me: LingoMe, _this: LingoValue, a_mp_Data: LingoValue) {
  var t_rPrev = a_mp_Data[1];
  var t_rItem = callMethod("GetSelected", _this);
  var t_iCode = t_rItem.code;
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox").image);
  if (lingoBinary("eq", callNamed("ilk", t_rPrev), symbol("image"))) {
  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rBack.width, t_rPrev.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rBack.height, t_rPrev.height), 2);
  setThePropOf(t_rBack, "useAlpha", 0);
  callMethod("copyPixels", t_rBack, t_rPrev, lingoBinary("add", t_rPrev.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), t_rPrev.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  }

  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.info"), callNamed("getText", lingoBinary("join", "item.", t_iCode), ""))
  if (callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode)) {
  var t_iItemPrice = callMethod("GetRedeemPrice", callMethod("getComponent", callNamed("getThread", "inventory")), t_iCode);
  } else {
  t_iItemPrice = -float(1);
  }

  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.sell.button"), symbol("blend"), lingoBinary("add", 50, lingoBinary("mul", lingoBinary("gt", t_iItemPrice, -float(1)), 50)))
  setMeProp(_me, "m_iSelected", t_rItem.ref);
}

