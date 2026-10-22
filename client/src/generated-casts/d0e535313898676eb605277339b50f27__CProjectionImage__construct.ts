// d0e535313898676eb605277339b50f27.cct / CProjectionImage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_ar_BodyPartObjects", undefined);
  var m_ar_AvatarData = undefined;
  setMeProp(_me, "m_mp_AllSets", callNamed("getVariable", "AllAvailableSets", undefined));
  setMeProp(_me, "m_ar_FigureColorList", callNamed("getVariableValue", "ColorList", undefined));
  setMeProp(_me, "m_ar_FigureSetNumbers", callNamed("getVariableValue", "SetNumbers"));
  setMeProp(_me, "m_ar_rSetContents", callNamed("getVariableValue", "SetContents"));
  setMeProp(_me, "m_sSex", "M");
  return 1;
}

