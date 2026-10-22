// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / SetActiveMickeyList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetActiveMickeyList(_me: LingoMe, a_arMickeyIds: LingoValue, a_arColors: LingoValue) {
  var tCount = a_arMickeyIds.count;
  for (var i = 1; i <= tCount; ++i) {
  var tID = a_arMickeyIds[i];
  callMethod("append", meProp(_me, "m_arActiveMickeyList"), tID)
  callMethod("setaProp", meProp(_me, "m_mpMickeyColorList"), tID, a_arColors[i])
  }

}

