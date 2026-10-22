// core.old.cct / CMgrVisualizer / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, tID: LingoValue) {
  if (!lingoTruthy(callMethod("exists", _me, tID))) {
  return 0;
  }

  var tItem = callMethod("get", _me, tID);
  setMeProp(_me, "pAvailableLocZ", lingoBinary("sub", meProp(_me, "pAvailableLocZ"), callMethod("getProperty", tItem, symbol("sprCount"))));
  meProp(_me, "pPosCache")[tID] = new LingoList([callMethod("getProperty", tItem, symbol("locX")), callMethod("getProperty", tItem, symbol("locY"))]);
  callMethod("deleteOne", _me.pItemList, tID)
  if (lingoBinary("eq", meProp(_me, "pActiveItem"), tID)) {
  setMeProp(_me, "pActiveItem", callMethod("getLast", _me.pItemList));
  }

  callMethod("Remove", callNamed("getObjectManager"), tID)
  callMethod("Activate", _me, callMethod("getLast", _me.pItemList))
  return 1;
}

