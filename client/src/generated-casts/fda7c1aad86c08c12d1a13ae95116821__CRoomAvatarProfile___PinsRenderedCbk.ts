// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomAvatarProfile / _PinsRenderedCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PinsRenderedCbk(_me: LingoMe, _this: LingoValue, a_mp_iRef_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rControls"))) {
  var t_iCount = a_mp_iRef_rThumb.count;
  var t_mp_iRef_rThumb = new LingoPropList([]);
  var t_rcOff = callNamed("rect", 0, 0, 0, 0);
  var t_rStar = callNamed("getMember", "inv.pin.star.thumb").image;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iType = meProp(_me, "m_ar_rPinData")[i][1];
  var t_iLevel = meProp(_me, "m_ar_rPinData")[i][2];
  var t_rThumb = a_mp_iRef_rThumb[i];
  if (callNamed("voidp", t_rThumb)) {
  t_rThumb = callNamed("image", 1, 1, 32);
  }

  t_rThumb = callMethod("duplicate", t_rThumb);
  if (lingoBinary("neq", t_iType, callMethod("getPropAt", a_mp_iRef_rThumb, i))) {
  callNamed("error", _this, "Pin grid thumbnails are out of sync!!!", symbol("_PinsRenderedCbk"))
  return;
  }

  callMethod("addProp", t_mp_iRef_rThumb, callMethod("getPropAt", a_mp_iRef_rThumb, i), new LingoPropList([symbol("thumbnail"), t_rThumb, symbol("blend"), 100]))
  }

  callMethod("render", meProp(_me, "m_rPinGrid"), t_mp_iRef_rThumb, callMethod("getElement", meProp(_me, "m_rControls"), "avatarinfo.pins"))
  }

}

