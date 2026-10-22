// core.old.cct / CWindowScrollbarBACKUP / ButtonsStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ButtonsStates(_me: LingoMe) {
  if (lingoBinary("and", lingoBinary("and", lingoBinary("gt", meProp(_me, "pScrollOffset"), 0), lingoBinary("neq", meProp(_me, "pButtonStates")[symbol("top")], symbol("up"))), lingoBinary("neq", meProp(_me, "pState"), symbol("top")))) {
  meProp(_me, "pButtonStates")[symbol("top")] = symbol("up");
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("top")]), symbol("up"))
  } else {
  if (lingoBinary("and", lingoBinary("lte", meProp(_me, "pScrollOffset"), 0), lingoBinary("neq", meProp(_me, "pButtonStates")[symbol("top")], symbol("passive")))) {
  meProp(_me, "pButtonStates")[symbol("top")] = symbol("passive");
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("top")]), symbol("passive"))
  }

  }

  if (lingoBinary("and", lingoBinary("and", lingoBinary("lt", meProp(_me, "pScrollOffset"), meProp(_me, "pMaxOffset")), lingoBinary("neq", meProp(_me, "pButtonStates")[symbol("bottom")], symbol("up"))), lingoBinary("neq", meProp(_me, "pState"), symbol("bottom")))) {
  meProp(_me, "pButtonStates")[symbol("bottom")] = symbol("up");
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bottom")]), symbol("up"))
  } else {
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "pScrollOffset"), meProp(_me, "pMaxOffset")), lingoBinary("neq", meProp(_me, "pButtonStates")[symbol("bottom")], symbol("passive")))) {
  meProp(_me, "pButtonStates")[symbol("bottom")] = symbol("passive");
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bottom")]), symbol("passive"))
  }

  }

  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "pButtonStates")[symbol("top")], symbol("passive")), lingoBinary("eq", meProp(_me, "pButtonStates")[symbol("bottom")], symbol("passive")))) {
  meProp(_me, "pButtonStates")[symbol("lift")] = symbol("passive");
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar")]), symbol("up"))
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("lift")]), symbol("passive"))
  } else {
  if (lingoBinary("neq", meProp(_me, "pState"), symbol("lift"))) {
  meProp(_me, "pButtonStates")[symbol("lift")] = symbol("up");
  callMethod("UpdateLiftPosition", _me)
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar"), symbol("lift")]), symbol("up"))
  }

  }

  callMethod("render", _me)
}

