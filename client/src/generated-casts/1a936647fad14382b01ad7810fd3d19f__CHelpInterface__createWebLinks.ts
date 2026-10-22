// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / createWebLinks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createWebLinks(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var t_sText = callNamed("getText", "hlp.questions.info");
  t_sText = callNamed("replaceChunks", t_sText, "%VMK.com%", "VMK.com");
  t_sText = callNamed("replaceChunks", t_sText, "%contact%", "contact");
  callMethod("setText", callMethod("getElement", tWndObj, "hlp.questions.info"), t_sText)
}

