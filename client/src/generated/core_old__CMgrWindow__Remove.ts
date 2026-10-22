// core.old.cct / CMgrWindow / Remove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Remove(_me: LingoMe, tID: LingoValue) {
  var tWndObj = callMethod("get", _me, tID);
  if (lingoBinary("eq", tWndObj, 0)) {
  return 0;
  }

  _me.pPosCache[tID] = new LingoList([callMethod("getProperty", tWndObj, symbol("locX")), callMethod("getProperty", tWndObj, symbol("locY"))]);
  callMethod("Remove", callNamed("getObjectManager"), tID)
  callMethod("deleteOne", _me.pItemList, tID)
  if (lingoBinary("eq", _me.pActiveItem, tID)) {
  var tNextActive = callMethod("getLast", _me.pItemList);
  } else {
  tNextActive = _me.pActiveItem;
  }

  if (callMethod("exists", _me, meProp(_me, "pModalID"))) {
  var tModals = 0;
  for (var i = _me.pItemList.count; i >= 1; --i) {
  tID = _me.pItemList[i];
  if (callMethod("getProperty", callMethod("get", _me, tID), symbol("modal"))) {
  tModals = 1;
  tNextActive = tID;
  break;
  }

  }

  if (!lingoTruthy(tModals)) {
  callMethod("Remove", _me, meProp(_me, "pModalID"))
  }

  }

  callMethod("Activate", _me, tNextActive)
  return 1;
}

