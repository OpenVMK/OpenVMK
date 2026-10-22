// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / ShowHideAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowHideAvatar(_me: LingoMe, a_bAvatar: LingoValue, a_bSdw: LingoValue) {
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  if (callNamed("objectp", t_rContext)) {
  var t_rObj = callMethod("_AccessIndexed", t_rContext, meProp(_me, "m_iMyRef"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  var t_rObjVisual = callMethod("GetVisual", t_rObj);
  if (callNamed("objectp", t_rObjVisual)) {
  callMethod("visible", t_rObjVisual, a_bAvatar, a_bSdw)
  }

  }

  }

}

