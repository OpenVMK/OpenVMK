// vmk_musicmix1.cct / CMusicMixerInterface / SelectInstrument

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SelectInstrument(_me: LingoMe, a_sInst: LingoValue, a_iSampleNum: LingoValue) {
  callMethod("ResetSelected", _me)
  switch (a_sInst) {
case "drm":
  var tBtnColor = "red";
  var t_Col = callNamed("rgb", "6F0000");
  break;
case "gtr":
  tBtnColor = "green";
  t_Col = callNamed("rgb", "5C8B00");
  break;
case "fx":
  tBtnColor = "blue";
  t_Col = callNamed("rgb", "008687");
  break;
case "bas":
  tBtnColor = "orange";
  t_Col = callNamed("rgb", "B05800");
  break;
case "snt":
  tBtnColor = "pink";
  t_Col = callNamed("rgb", "C20081");
  break;
  default:
  t_Col = callNamed("rgb", 20, 30, 210);
  }

  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", tWndObj, lingoBinary("join", lingoBinary("join", lingoBinary("join", "inst_", a_sInst), "_"), a_iSampleNum))) {
  var t_rElement = callMethod("getElement", tWndObj, lingoBinary("join", lingoBinary("join", lingoBinary("join", "inst_", a_sInst), "_"), a_iSampleNum));
  var t_sprite = callMethod("getProperty", t_rElement, symbol("sprite"));
  if (lingoBinary("neq", t_sprite, 0)) {
  var t_Alpha = callMethod("extractAlpha", callNamed("member", lingoBinary("join", lingoBinary("join", lingoBinary("join", "button.", tBtnColor), a_iSampleNum.char[a_iSampleNum.char.count]), ".pressed")).image);
  callMethod("setAlpha", t_sprite.member.image, t_Alpha)
  setThePropOf(t_sprite.member, "useAlpha", 1);
  }

  callMethod("setProperty", t_rElement, symbol("blend"), 100)
  }

}

