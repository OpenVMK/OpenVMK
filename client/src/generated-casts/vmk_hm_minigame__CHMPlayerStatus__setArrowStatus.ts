// vmk_hm_minigame.cct / CHMPlayerStatus / setArrowStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setArrowStatus(_me: LingoMe, a_iLastDirection: LingoValue, a_iNewDirection: LingoValue, a_iControlMethod: LingoValue) {
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

  if (lingoBinary("gt", a_iLastDirection, -float(1))) {
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iLastDirection, 1)], "member", callNamed("member", lingoBinary("join", lingoBinary("join", lingoBinary("join", "arrow_", t_sControls), "_b_"), a_iLastDirection)));
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iLastDirection, 1)], "width", meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iLastDirection, 1)].member.width);
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iLastDirection, 1)], "height", meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iLastDirection, 1)].member.height);
  }

  if (lingoBinary("gt", a_iNewDirection, -float(1))) {
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iNewDirection, 1)], "member", callNamed("member", lingoBinary("join", lingoBinary("join", lingoBinary("join", "arrow_", t_sControls), "_w_"), a_iNewDirection)));
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iNewDirection, 1)], "width", meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iNewDirection, 1)].member.width);
  setThePropOf(meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iNewDirection, 1)], "height", meProp(_me, "m_ar_arrows")[lingoBinary("add", a_iNewDirection, 1)].member.height);
  }

}

