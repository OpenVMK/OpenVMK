// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CGiftInterface / LoadImageToWindowElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadImageToWindowElement(_me: LingoMe, _this: LingoValue, a_sUrl: LingoValue, a_rElement: LingoValue) {
  var t_sMemName = lingoBinary("join", "GiftImage:", meProp(_me, "m_BgType"));
  if (callNamed("memberExists", t_sMemName)) {
  var t_Img = callNamed("getMember", t_sMemName).image;
  if (callNamed("objectp", a_rElement)) {
  callMethod("feedImage", a_rElement, t_Img)
  return;
  }

  }

  var tParamsToCallback = new LingoPropList([symbol("mem"), t_sMemName, symbol("element"), a_rElement]);
  var tMemNum = callNamed("queueDownload", a_sUrl, t_sMemName, symbol("bitmap"), 0);
  if (lingoBinary("eq", tMemNum, 0)) {
  return callNamed("error", _this, "QueueDownload failed", symbol("LoadImageToWindowElement"));
  }

  callNamed("registerDownloadCallback", tMemNum, symbol("PushPicture"), callMethod("getID", _this), tParamsToCallback)
  callMethod("setaProp", meProp(_me, "m_mp_sUrl_rMember"), t_sMemName, callNamed("member", tMemNum))
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), a_rElement)
  callNamed("receiveUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  setMeProp(_me, "m_bLoadingImage", 1);
}

