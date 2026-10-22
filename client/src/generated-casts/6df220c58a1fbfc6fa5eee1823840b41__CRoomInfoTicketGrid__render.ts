// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketGrid / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, _this: LingoValue, a_mp_iRef_rItem: LingoValue, a_rWindow: LingoValue, a_sImgElem: LingoValue) {
  setMeProp(_me, "m_iSelected", 1);
  setMeProp(_me, "m_rWindow", a_rWindow);
  setMeProp(_me, "m_mp_iRef_rItem", a_mp_iRef_rItem);
  setMeProp(_me, "m_rImgElement", callMethod("getElement", a_rWindow, a_sImgElem));
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var t_rItem of meProp(_me, "m_mp_iRef_rItem").toArray()) {
  callMethod("setaProp", t_mp_iType_rThumb, t_rItem.code, undefined)
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_ThumbsRenderedCbk")]))
}

