// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / ShowSelected

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
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox").image);
  if (lingoBinary("lt", t_iCode, 0)) {
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.clothes.info"), "")
  } else {
  var t_rInput = new LingoPropList([]);
  callMethod("setaProp", t_rInput, t_iCode, undefined)
  callNamed("executeMessage", "GetClothPreview", t_rInput, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("ShowSelectedImage")]))
  }

}

