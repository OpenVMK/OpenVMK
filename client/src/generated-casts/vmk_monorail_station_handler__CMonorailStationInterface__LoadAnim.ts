// vmk_monorail_station_handler.cct / CMonorailStationInterface / LoadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function LoadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  meProp(_me, "m_animIDs")[1] = callMethod("LoadAnim", tAnimEngine, "monorail_open_arrangement");
  meProp(_me, "m_animIDs")[2] = callMethod("LoadAnim", tAnimEngine, "monorail_close_arrangement");
  }

  callMethod("resetTrainRegPoints", _me)
  callMethod("HideTrain", _me)
  callMethod("hideDoors", _me)
  callMethod("hideMasks", _me)
  callMethod("hideExits", _me)
  setMeProp(_me, "m_pTextScroller", callMethod("initTextScroller", _me));
  setMeProp(_me, "m_pTextScrollerHolder", callMethod("initTextScrollerHolder", _me));
}

