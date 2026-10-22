// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / UpdateList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateList(_me: LingoMe) {
  callMethod("sort", meProp(_me, "m_mpFinalList"))
  var t_sTxt = callNamed("getMember", "listaa").text;
  t_sTxt = lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sTxt, "\r"), "\r"), meProp(_me, "m_mpFinalList"));
  setThePropOf(callNamed("getMember", "listaa"), "text", t_sTxt);
}

