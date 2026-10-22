// vmk_pirates2_minigame.cct / CPiratesMessageBar / setAmmoindicator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAmmoindicator(_me: LingoMe, a_ar_Ammo: LingoValue) {
  var a_iAmmo = a_ar_Ammo.count;
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  if (callNamed("objectp", tWndObj)) {
  for (var i = 1; i <= 5; ++i) {
  var t_rElem = callMethod("getElement", tWndObj, lingoBinary("join", "ammo", i));
  callMethod("hide", t_rElem)
  if (lingoBinary("gte", a_iAmmo, i)) {
  callMethod("show", t_rElem)
  var tSprite = callMethod("getProperty", t_rElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  switch (a_ar_Ammo[i]) {
case 0:
  var tmember = callNamed("getMember", "ammo.status");
  break;
case 1:
  tmember = callNamed("getMember", "ammo.status.golden");
  break;
  default:
  tmember = callNamed("getMember", "ammo.status");
  }

  setThePropOf(tSprite, "member", tmember);
  setThePropOf(tSprite, "width", tmember.width);
  setThePropOf(tSprite, "height", tmember.height);
  }

  }

  }

  }

}

