// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / Refresh

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Refresh(_me: LingoMe, tDirHead: LingoValue, tDirBody: LingoValue) {
  if (meProp(_me, "m_bActDnc")) {
  tDirHead = tDirBody;
  }

  if (meProp(_me, "m_bActSit")) {
  var t_bSit = 1;
  }

  setMeProp(_me, "m_bActMv", 0);
  setMeProp(_me, "m_bActDnc", 0);
  setMeProp(_me, "m_bActTlk", 0);
  setMeProp(_me, "m_bActCrr", 0);
  setMeProp(_me, "m_bActWav", 0);
  var m_BactTrade = 0;
  setMeProp(_me, "m_bAnimating", 0);
  var m_bActSlp = 0;
  callMethod("arrangeParts", _me)
  setMeProp(_me, "m_iLocFix", callNamed("point", -float(1), 2));
}

