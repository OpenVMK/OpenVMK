// vmk_fireworks_preshow_handler.cct / CFWPSComponent / ShootEventFirework

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShootEventFirework(_me: LingoMe, a_ar_Params: LingoValue) {
  var t_sStyle = "";
  switch (a_ar_Params[1]) {
case 0:
  t_sStyle = "sparkle_ferris";
  break;
case 1:
  t_sStyle = "magic_dawn";
  break;
case 2:
  t_sStyle = "blue_whirlcombo";
  break;
  }

  var t_vPos = callNamed("vector", a_ar_Params[2], a_ar_Params[3], a_ar_Params[4]);
  var t_vDirection = callNamed("vector", a_ar_Params[5], a_ar_Params[6], a_ar_Params[7]);
  callMethod("normalize", t_vDirection)
  var tBomb = callMethod("ShootAFirework", meProp(_me, "m_rFireworksEngine"), t_sStyle, t_vPos, t_vDirection);
}

