// d0e535313898676eb605277339b50f27.cct / CLoaderAvatarRender / startAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startAnimation(_me: LingoMe, tMemName: LingoValue) {
  if (lingoBinary("eq", tMemName, meProp(_me, "m_sCurrentAnim"))) {
  return 0;
  }

  if ((lingoTruthy(callNamed("memberExists", tMemName)) ? 0 : 1)) {
  return 0;
  }

  var tmember = callNamed("member", callNamed("getmemnum", tMemName));
  var tList = tmember.text;
  var tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", "/");
  for (var i = 1; i <= tList.line.count; ++i) {
  var tPart = tList.line[i].item[1];
  var tAnim = tList.line[i].item[2];
  callNamed("call", symbol("setAnimation"), meProp(_me, "m_mpSortedParts"), tPart, tAnim)
  }

  setTheProperty("itemDelimiter", tTempDelim);
  setMeProp(_me, "m_bAnimating", 1);
  setMeProp(_me, "m_sCurrentAnim", tMemName);
}

