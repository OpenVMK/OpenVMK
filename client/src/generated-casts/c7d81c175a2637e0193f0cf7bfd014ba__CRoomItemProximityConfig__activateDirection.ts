// c7d81c175a2637e0193f0cf7bfd014ba.cct / CRoomItemProximityConfig / activateDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function activateDirection(_me: LingoMe, a_sDir: LingoValue, a_iNum: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sConfigurationWindowID"));
  var t_iNum = 1;
  while (1) {
  var a_sElemID = lingoBinary("join", lingoBinary("join", lingoBinary("join", "darkride.dir.", a_sDir), "."), t_iNum);
  var t_rElem = callMethod("getElement", tWndObj, a_sElemID);
  if (callNamed("objectp", t_rElem)) {
  callMethod("setProperty", t_rElem, symbol("blend"), 0)
  t_iNum = lingoBinary("add", t_iNum, 1);
  continue;
  }

  break;
  }

  t_iNum = 1;
  for (var t_iNum = 1; t_iNum <= a_iNum; ++t_iNum) {
  a_sElemID = lingoBinary("join", lingoBinary("join", lingoBinary("join", "darkride.dir.", a_sDir), "."), t_iNum);
  t_rElem = callMethod("getElement", tWndObj, a_sElemID);
  if (callNamed("objectp", t_rElem)) {
  callMethod("setProperty", t_rElem, symbol("blend"), 100)
  }

  }

}

