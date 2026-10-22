// core.old.cct / CWindowDropDown / setActiveItemTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActiveItemTo(_me: LingoMe, tItem: LingoValue) {
  if (callNamed("voidp", callMethod("findPos", meProp(_me, "pTextKeys"), tItem))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Cannot activate the item of dropmenu:", tItem));
  }

  setMeProp(_me, "pSelectedItemNum", callMethod("findPos", meProp(_me, "pTextKeys"), tItem));
  setMeProp(_me, "pDropActiveBtnImg", callMethod("createDropImg", _me, new LingoList([meProp(_me, "pMenuItems")[meProp(_me, "pSelectedItemNum")]]), 0, symbol("up")));
  setThePropOf(_me, "pImage", meProp(_me, "pDropActiveBtnImg"));
  callMethod("render", _me)
}

