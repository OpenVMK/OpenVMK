// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderInterface / AvatarDataReceived

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvatarDataReceived(_me: LingoMe, _this: LingoValue, a_mpAvatarData: LingoValue) {
  if (lingoBinary("and", callNamed("listp", a_mpAvatarData), lingoBinary("neq", meProp(_me, "m_sMiniGameName"), "jungle_cruise"))) {
  setMeProp(_me, "m_mpAvatarData", a_mpAvatarData);
  callMethod("_RefreshSettingList", _this, meProp(_me, "m_mpAvatarData"), "MyAvatar")
  setMeProp(_me, "m_rWindow", callMethod("GetWindowObj", meProp(_me, "m_rCurPageObj")));
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "GETFIGURELIST")
  }

}

