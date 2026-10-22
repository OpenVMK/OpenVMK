// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomElementControl / SetButtonStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetButtonStates(_me: LingoMe, _this: LingoValue, a_bMove: LingoValue, a_bRotate: LingoValue, a_bTakeAway: LingoValue) {
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), symbol("public"))) {
  var t_rEventProcessor = callNamed("getObject", "RoomEventProcessor");
  if (lingoBinary("neq", t_rEventProcessor, 0)) {
  callMethod("reset", t_rEventProcessor)
  }

  return;
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rControls"))) ? 0 : 1)) {
  var tWnd = callNamed("getWindow", callMethod("getID", meProp(_me, "m_rControls")));
  if ((lingoTruthy(callNamed("voidp", a_bMove)) ? 0 : 1)) {
  if ((lingoTruthy(a_bMove) ? 0 : 1)) {
  callMethod("deactivate", callMethod("getElement", tWnd, "place.move.button"))
  } else {
  callMethod("Activate", callMethod("getElement", tWnd, "place.move.button"))
  }

  }

  if ((lingoTruthy(callNamed("voidp", a_bRotate)) ? 0 : 1)) {
  if ((lingoTruthy(a_bRotate) ? 0 : 1)) {
  callMethod("deactivate", callMethod("getElement", tWnd, "place.rotate.button"))
  } else {
  callMethod("Activate", callMethod("getElement", tWnd, "place.rotate.button"))
  }

  }

  if ((lingoTruthy(callNamed("voidp", a_bTakeAway)) ? 0 : 1)) {
  if ((lingoTruthy(a_bTakeAway) ? 0 : 1)) {
  callMethod("deactivate", callMethod("getElement", tWnd, "place.takeaway.button"))
  } else {
  callMethod("Activate", callMethod("getElement", tWnd, "place.takeaway.button"))
  }

  }

  }

}

