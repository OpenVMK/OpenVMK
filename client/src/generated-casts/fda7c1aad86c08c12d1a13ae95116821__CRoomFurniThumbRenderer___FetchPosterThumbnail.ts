// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _FetchPosterThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FetchPosterThumbnail(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  var t_iCount = a_mp_iType_rOutput.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iTypeCode = callMethod("getPropAt", a_mp_iType_rOutput, i);
  var t_rImage = callMethod("getaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iTypeCode);
  if (callNamed("voidp", t_rImage)) {
  var t_rMember = callNamed("getMember", lingoBinary("join", lingoBinary("join", "item_", t_iTypeCode), "_5"));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  t_rImage = callMethod("_ShrinkToThumbnail", _this, t_rMember.image);
  callMethod("setaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iTypeCode, t_rImage)
  }

  }

  a_mp_iType_rOutput[i] = t_rImage;
  }

  callNamed("call", a_rCallback.method, new LingoList([callNamed("getObject", a_rCallback.client)]), a_mp_iType_rOutput, a_rCallback)
}

