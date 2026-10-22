// core.old.cct / CWindowXML / setElementGroupState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setElementGroupState(_me: LingoMe, _this: LingoValue, a_sID: LingoValue, a_iState: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "pElementGroups")[a_sID][symbol("state")], a_iState)) {
  var tStates = meProp(_me, "pElementGroups")[a_sID][symbol("states")];
  for (var t = 1; t <= tStates.count; ++t) {
  var tstate = callMethod("getPropAt", tStates, t);
  var tList = tStates[t];
  if (lingoBinary("eq", tstate, a_iState)) {
  for (var tElement of tList.toArray()) {
  setThePropOf(tElement.sprite, "visible", 1);
  }

  continue;
  }

  if (lingoBinary("neq", tstate, 0)) {
  for (var tElement of tList.toArray()) {
  setThePropOf(tElement.sprite, "visible", 0);
  }

  }

  }

  meProp(_me, "pElementGroups")[a_sID][symbol("state")] = a_iState;
  }

}

