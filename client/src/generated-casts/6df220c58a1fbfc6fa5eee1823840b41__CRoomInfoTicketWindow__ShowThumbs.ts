// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoTicketWindow / ShowThumbs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowThumbs(_me: LingoMe, _this: LingoValue, a_mp_sGroup_rItems: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_mp_iType_rThumb = new LingoPropList([]);
  for (var t_rItem of a_mp_sGroup_rItems.toArray()) {
  callMethod("addProp", t_mp_iType_rThumb, t_rItem[symbol("code")], undefined)
  }

  callNamed("executeMessage", "GetPinThumbnail", t_mp_iType_rThumb, new LingoPropList([symbol("client"), callMethod("getID", _this), symbol("method"), symbol("_ThumbsReadyCbk")]))
  }

}

