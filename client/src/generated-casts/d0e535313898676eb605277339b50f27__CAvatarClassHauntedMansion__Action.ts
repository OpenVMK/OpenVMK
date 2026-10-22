// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / Action

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Action(_me: LingoMe, a_Ar_Data: LingoValue) {
  setMeProp(_me, "m_mp_AvatarData", a_Ar_Data);
  setMeProp(_me, "m_bFlipped", 0);
  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActSit", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActCrr", 0);
  setMeProp(_me, "m_bAnimating", 0);
  setMeProp(_me, "m_sCurrentAnim", "");
  setMeProp(_me, "m_iHeadDir", meProp(_me, "m_mp_AvatarData").HeadDir);
  setMeProp(_me, "m_iBdDir", meProp(_me, "m_mp_AvatarData").BodyDir);
  var t_iActHands = meProp(_me, "m_mp_AvatarData").RightHand;
  callMethod("ActHands", _me, t_iActHands)
  callMethod("ActFeet", _me, meProp(_me, "m_mp_AvatarData").Feet)
  setMeProp(_me, "m_bFlipped", meProp(_me, "m_mp_AvatarData").Flipped);
  callMethod("Refresh", _me, meProp(_me, "m_iHeadDir"), meProp(_me, "m_iBdDir"))
  if (lingoBinary("eq", t_iActHands, 13)) {
  callMethod("updater", _me, 200)
  return 1;
  }

  if (lingoBinary("or", lingoBinary("eq", t_iActHands, 12), lingoBinary("eq", t_iActHands, 1))) {
  callMethod("updater", _me, 50)
  } else {
  var t_mpDelays = new LingoPropList([]);
  t_mpDelays = _me.delays;
  for (var g = 1; g <= t_mpDelays.count; ++g) {
  callMethod("cancel", _me, callMethod("getPropAt", t_mpDelays, g))
  }

  }

}

