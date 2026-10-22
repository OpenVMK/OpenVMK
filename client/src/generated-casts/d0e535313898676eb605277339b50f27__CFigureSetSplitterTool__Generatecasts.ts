// d0e535313898676eb605277339b50f27.cct / CFigureSetSplitterTool / Generatecasts

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Generatecasts(_me: LingoMe, a_sPart: LingoValue, a_iUpToNumber: LingoValue, a_iMemberToCast: LingoValue) {
  var e = 0;
  var f = 0;
  var t_iMod = lingoBinary("mod", a_iUpToNumber, a_iMemberToCast);
  var t_iListAmount = lingoBinary("div", a_iUpToNumber, a_iMemberToCast);
  e = 1;
  for (var i = 1; i <= t_iListAmount; ++i) {
  callMethod("ListAllGraphics", _me, a_sPart, e, lingoBinary("sub", lingoBinary("add", e, a_iMemberToCast), 1))
  e = lingoBinary("add", e, a_iMemberToCast);
  }

  if (lingoBinary("gt", t_iMod, 0)) {
  callMethod("ListAllGraphics", _me, a_sPart, e, lingoBinary("add", e, t_iMod))
  }

  callMethod("AssignCasts", _me)
}

