// core.old.cct / CWindowXML / redirectEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function redirectEvent(_me: LingoMe, tEvent: LingoValue, tSprID: LingoValue) {
  var tMethod = meProp(_me, "pProcedures")[tEvent][1];
  var tTarget = meProp(_me, "pProcedures")[tEvent][2];
  var tParam = callNamed("call", tEvent, new LingoList([meProp(_me, "pElemList")[tSprID]]), tSprID);
  if (lingoBinary("eq", tParam, 0)) {
  return 0;
  }

  if (lingoBinary("or", lingoBinary("eq", tEvent, symbol("groupMouseDown")), lingoBinary("eq", tEvent, symbol("groupMouseup")))) {
  tParam = meProp(_me, "pGroupEventPass");
  }

  var tClient = callNamed("getObject", tTarget);
  if (lingoBinary("neq", tClient, 0)) {
  return callNamed("call", tMethod, tClient, tEvent, tSprID, tParam, callMethod("getID", _me));
  } else {
  return callMethod("removeProcedure", _me, tEvent);
  }

}

