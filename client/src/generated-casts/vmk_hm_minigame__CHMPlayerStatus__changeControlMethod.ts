// vmk_hm_minigame.cct / CHMPlayerStatus / changeControlMethod

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function changeControlMethod(_me: LingoMe, a_iControlMethod: LingoValue) {
  switch (a_iControlMethod) {
case symbol("mouse"):
  var t_sControls = "mouse";
  setThePropOf(meProp(_me, "m_ar_arrows")[meProp(_me, "m_ar_arrows").count], "visible", 1);
  break;
case symbol("keyboard"):
  t_sControls = "key";
  setThePropOf(meProp(_me, "m_ar_arrows")[meProp(_me, "m_ar_arrows").count], "visible", 0);
  break;
  default:
  t_sControls = "key";
  setThePropOf(meProp(_me, "m_ar_arrows")[meProp(_me, "m_ar_arrows").count], "visible", 0);
  }

  for (var i = 1; i <= lingoBinary("sub", meProp(_me, "m_ar_arrows").count, 1); ++i) {
  var tmember = callNamed("member", lingoBinary("join", lingoBinary("join", lingoBinary("join", "arrow_", t_sControls), "_b_"), lingoBinary("sub", i, 1)));
  setThePropOf(meProp(_me, "m_ar_arrows")[i], "member", tmember);
  setThePropOf(meProp(_me, "m_ar_arrows")[i], "width", tmember.image.width);
  setThePropOf(meProp(_me, "m_ar_arrows")[i], "height", tmember.image.height);
  }

}

