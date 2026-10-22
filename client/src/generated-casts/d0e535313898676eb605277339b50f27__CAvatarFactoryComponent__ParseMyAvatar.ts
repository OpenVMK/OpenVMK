// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / ParseMyAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParseMyAvatar(_me: LingoMe, tMsg: LingoValue) {
  setMeProp(_me, "m_ar_MyAvatar", callMethod("ParseFigure", _me, tMsg));
  setMeProp(_me, "m_ar_PropsToServer", meProp(_me, "m_ar_MyAvatar"));
  if (callMethod("findPos", meProp(_me, "m_mp_AvatarBuilderData"), "MyAvatar")) {
  meProp(_me, "m_mp_AvatarBuilderData")["MyAvatar"] = meProp(_me, "m_ar_MyAvatar");
  } else {
  callMethod("addProp", meProp(_me, "m_mp_AvatarBuilderData"), "MyAvatar", meProp(_me, "m_ar_MyAvatar"))
  }

  callMethod("AvatarDataReceived", _me._interface, meProp(_me, "m_mp_AvatarBuilderData"))
}

