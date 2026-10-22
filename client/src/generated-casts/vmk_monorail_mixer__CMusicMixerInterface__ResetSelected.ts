// vmk_monorail_mixer.cct / CMusicMixerInterface / ResetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResetSelected(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  for (var i = 1; i <= 8; ++i) {
  if (callMethod("elementExists", tWndObj, lingoBinary("join", "inst_drm_", i))) {
  var t_rElement = callMethod("getElement", tWndObj, lingoBinary("join", "inst_drm_", i));
  callMethod("setProperty", t_rElement, symbol("blend"), 0)
  }

  if (callMethod("elementExists", tWndObj, lingoBinary("join", "inst_bas_20", i))) {
  var t_rElement2 = callMethod("getElement", tWndObj, lingoBinary("join", "inst_bas_20", i));
  callMethod("setProperty", t_rElement2, symbol("blend"), 0)
  }

  if (callMethod("elementExists", tWndObj, lingoBinary("join", "inst_gtr_10", i))) {
  var t_rElement3 = callMethod("getElement", tWndObj, lingoBinary("join", "inst_gtr_10", i));
  callMethod("setProperty", t_rElement3, symbol("blend"), 0)
  }

  if (callMethod("elementExists", tWndObj, lingoBinary("join", "inst_snt_30", i))) {
  var t_rElement4 = callMethod("getElement", tWndObj, lingoBinary("join", "inst_snt_30", i));
  callMethod("setProperty", t_rElement4, symbol("blend"), 0)
  }

  if (callMethod("elementExists", tWndObj, lingoBinary("join", "inst_fx_40", i))) {
  var t_rElement5 = callMethod("getElement", tWndObj, lingoBinary("join", "inst_fx_40", i));
  callMethod("setProperty", t_rElement5, symbol("blend"), 0)
  }

  }

}

