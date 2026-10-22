// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / SetCustomHighlighters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetCustomHighlighters(_me: LingoMe, _this: LingoValue, a_bState: LingoValue, a_kType: LingoValue) {
  if (a_bState) {
  if (callMethod("get", callNamed("getObject", symbol("session")), "room_furnish_mode")) {
  if ((lingoTruthy(meProp(_me, "m_bSelected")) ? 0 : 1)) {
  callMethod("CreateHighlighters", _this)
  }

  callNamed("call", symbol("TellVisual"), callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this))), symbol("ChangeHighlighterType"), a_kType)
  setMeProp(_me, "m_bCustomHighlighters", a_bState);
  }

  } else {
  if ((lingoTruthy(meProp(_me, "m_bSelected")) ? 0 : 1)) {
  callMethod("RemoveHighlighters", _this)
  } else {
  callNamed("call", symbol("TellVisual"), callMethod("GetBlocks", callMethod("GetFactor", callMethod("getObject", _this))), symbol("ChangeHighlighterType"), symbol("select"))
  }

  setMeProp(_me, "m_bCustomHighlighters", a_bState);
  }

}

