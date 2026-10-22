// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _Close

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Close(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  setMeProp(_me, "m_mp_FxList", new LingoPropList([]));
  setMeProp(_me, "m_iMagicStatus", 0);
  setMeProp(_me, "m_EventAgent_obj", undefined);
  setMeProp(_me, "m_iItemId", undefined);
  setMeProp(_me, "m_iActiveFx", undefined);
  setMeProp(_me, "m_iSelectedFx", undefined);
  setMeProp(_me, "m_arAvailableTimes", undefined);
  setMeProp(_me, "m_bMagicMenuOpened", 0);
  }

}

