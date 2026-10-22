// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorAKB / _HandleRadioButtons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _HandleRadioButtons(_me: LingoMe, _this: LingoValue, a_iID: LingoValue) {
  if (callNamed("integerp", a_iID)) {
  for (var i = 2; i <= 4; ++i) {
  var t_Img = callNamed("member", callNamed("getMember", "button.radiobutton.0")).image;
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWnd"), lingoBinary("join", lingoBinary("join", "mods.bantime", i), ".button"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("feedImage", t_rElem, t_Img)
  continue;
  }

  callNamed("put", lingoBinary("joinPad", "Could not find Radio Button (akb) ", i))
  }

  var t_img2 = callNamed("member", callNamed("getMember", "button.radiobutton.1")).image;
  t_rElem = callMethod("getElement", meProp(_me, "m_rWnd"), lingoBinary("join", lingoBinary("join", "mods.bantime", a_iID), ".button"));
  if (callNamed("objectp", t_rElem)) {
  callMethod("feedImage", t_rElem, t_img2)
  } else {
  callNamed("put", lingoBinary("joinPad", "Could not activate Radio Button (akb) ", a_iID))
  }

  setMeProp(_me, "m_iBanTime", meProp(_me, "m_arBanTimes")[a_iID]);
  }

}

