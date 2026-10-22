// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / setFocus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFocus(_me: LingoMe) {
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.taskhint.input");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setFocus", tElem, 1)
  setTheProperty("selStart", callMethod("getText", tElem).length);
  setTheProperty("selEnd", callMethod("getText", tElem).length);
  }

}

