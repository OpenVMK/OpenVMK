// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreenConfiguration / loadingCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function loadingCallback(_me: LingoMe, _this: LingoValue, a_sUrl: LingoValue) {
  callNamed("dumpVariableField", a_sUrl)
  var t_sText = callNamed("getMember", a_sUrl).text;
  for (var i = 1; i <= t_sText.line.count; ++i) {
  var t_sLine = t_sText.line[i];
  var t_sSeparator = callNamed("offset", "=", t_sLine);
  var t_arConfVal = callNamed("value", callNamed("chars", t_sLine, lingoBinary("add", t_sSeparator, 1), t_sLine.char.count));
  if (callNamed("listp", t_arConfVal)) {
  for (var t_mpItemConf of t_arConfVal.toArray()) {
  var t_sImgUrl = callMethod("getaProp", t_mpItemConf, symbol("img"));
  if ((lingoTruthy(callNamed("voidp", t_sImgUrl)) ? 0 : 1)) {
  var tMemNum = callNamed("queueDownload", t_sImgUrl, t_sImgUrl, symbol("bitmap"));
  callMethod("setaProp", meProp(_me, "m_mpMemNumbers"), t_sImgUrl, tMemNum)
  }

  }

  }

  }

  callNamed("removeMember", a_sUrl)
}

