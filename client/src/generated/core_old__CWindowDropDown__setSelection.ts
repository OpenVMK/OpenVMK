// core.old.cct / CWindowDropDown / setSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setSelection(_me: LingoMe, tSelNumOrStr: LingoValue) {
  if (callNamed("stringp", tSelNumOrStr)) {
  var tSelNum = callMethod("getPos", meProp(_me, "pMenuItems"), tSelNumOrStr);
  if (lingoBinary("eq", tSelNum, 0)) {
  tSelNum = callMethod("getPos", meProp(_me, "pTextKeys"), tSelNumOrStr);
  }

  } else {
  tSelNum = tSelNumOrStr;
  }

  if (lingoBinary("and", lingoBinary("gt", tSelNum, 0), lingoBinary("lte", tSelNum, meProp(_me, "pNumberOfMenuItems")))) {
  setMeProp(_me, "pSelectedItemNum", tSelNum);
  setMeProp(_me, "pDropActiveBtnImg", callMethod("createDropImg", _me, new LingoList([meProp(_me, "pMenuItems")[meProp(_me, "pSelectedItemNum")]]), 0, symbol("up")));
  setThePropOf(_me, "pImage", meProp(_me, "pDropActiveBtnImg"));
  setThePropOf(_me.pSprite, "loc", meProp(_me, "pLoc"));
  callMethod("render", _me)
  return 1;
  } else {
  return 0;
  }

}

