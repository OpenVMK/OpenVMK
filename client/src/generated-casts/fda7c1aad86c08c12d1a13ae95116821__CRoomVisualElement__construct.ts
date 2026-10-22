// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualElement / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_bLoaded", 0);
  setMeProp(_me, "m_bSelected", 0);
  setMeProp(_me, "m_bCustomHighlighters", 0);
  setMeProp(_me, "m_mp_blinkStat", new LingoPropList([symbol("cur"), 0, symbol("min"), 0, symbol("max"), 50, symbol("inc"), 10]));
  if ((lingoTruthy(callNamed("variableExists", "room_load_anim_disabled")) ? 0 : 1)) {
  callNamed("setVariable", "room_load_anim_disabled", 1)
  }

  if (callNamed("getIntVariable", "room_load_anim_disabled")) {
  setMeProp(_me, "m_bAnimate", 0);
  } else {
  setMeProp(_me, "m_bAnimate", 1);
  var t_rLoadStruct = callNamed("GetItemAniStructure", "loading");
  setMeProp(_me, "m_ar_loadAnimation", new LingoPropList([symbol("frames"), undefined, symbol("sound"), undefined, symbol("condition"), undefined, symbol("delay"), 5, symbol("current"), 1]));
  callMethod("returnAnimatedBlocks", t_rLoadStruct, 0, 3, meProp(_me, "m_ar_loadAnimation"))
  }

  return 1;
}

