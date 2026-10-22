// core.old.cct / CMgrWindow / Activate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Activate(_me: LingoMe, tID: LingoValue) {
  if (meProp(_me, "pLockLocZ")) {
  return 0;
  }

  if (lingoBinary("eq", _me.pItemList.count, 0)) {
  return 0;
  }

  if (callMethod("exists", _me, _me.pActiveItem)) {
  if (callMethod("getProperty", callMethod("get", _me, _me.pActiveItem), symbol("modal"))) {
  tID = _me.pActiveItem;
  if (callMethod("exists", _me, meProp(_me, "pModalID"))) {
  callMethod("deleteOne", _me.pItemList, meProp(_me, "pModalID"))
  callMethod("append", _me.pItemList, meProp(_me, "pModalID"))
  }

  }

  }

  if (callNamed("voidp", tID)) {
  tID = callMethod("getLast", _me.pItemList);
  } else {
  if (!lingoTruthy(callMethod("exists", _me, tID))) {
  return 0;
  }

  }

  callMethod("deleteOne", _me.pItemList, tID)
  callMethod("append", _me.pItemList, tID)
  setThePropOf(_me, "pAvailableLocZ", _me.pDefaultLocZ);
  for (var tCurrID of _me.pItemList.toArray()) {
  var tWndObj = callMethod("get", _me, tCurrID);
  callMethod("setDeactive", tWndObj)
  for (var tSpr of callMethod("getProperty", tWndObj, symbol("spriteList")).toArray()) {
  setThePropOf(tSpr, "locZ", _me.pAvailableLocZ);
  setThePropOf(_me, "pAvailableLocZ", lingoBinary("add", _me.pAvailableLocZ, 1));
  }

  }

  setThePropOf(_me, "pActiveItem", tID);
  return callMethod("setActive", callMethod("get", _me, tID));
}

