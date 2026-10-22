// vmk_hm_minigame.cct / CHMWindowGetReady / GetReadyCountdown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetReadyCountdown(_me: LingoMe, t_iCounter: LingoValue) {
  if (lingoBinary("gt", t_iCounter, 10)) {
  t_iCounter = 10;
  }

  if (lingoBinary("gt", t_iCounter, 0)) {
  t_iCounter = lingoBinary("sub", t_iCounter, 1);
  callMethod("SetNumber", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "getready.countdown", callNamed("member", lingoBinary("join", "hmb_", t_iCounter)))
  callNamed("createTimeout", "hmGetReadyCounter", 1000, symbol("GetReadyCountdown"), callMethod("getID", _me), t_iCounter, 1)
  } else {
  if (lingoBinary("neq", callNamed("getWindow", meProp(_me, "m_sWindowName")), 0)) {
  callNamed("removeWindow", meProp(_me, "m_sWindowName"))
  }

  callMethod("setChattable", callMethod("HMGGetWindow", meProp(_me, "m_rClient"), "UI"), 1)
  callMethod("setActive", meProp(_me, "m_rClient"), 1)
  callMethod("initAvatar", meProp(_me, "m_rClient"))
  var t_rPlayer = callMethod("GetMyAvatar", meProp(_me, "m_rClient"));
  if (callNamed("objectp", t_rPlayer)) {
  var t_iOwner = callMethod("GetParam", t_rPlayer, "Owner");
  if (callNamed("objectp", callMethod("getCollisionEngine", callMethod("getComponent", meProp(_me, "m_rClient"))))) {
  }

  }

  }

}

