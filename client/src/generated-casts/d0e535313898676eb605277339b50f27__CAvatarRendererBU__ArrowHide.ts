// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / ArrowHide

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ArrowHide(_me: LingoMe) {
  if (meProp(_me, "m_bShowArrow")) {
  var t_rContext = callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component);
  var t_rObj = callMethod("_AccessIndexed", t_rContext, meProp(_me, "m_iMyRef"), "avatar");
  if (callNamed("objectp", t_rObj)) {
  callMethod("Unselect", callMethod("GetVisual", t_rObj))
  }

  }

}

