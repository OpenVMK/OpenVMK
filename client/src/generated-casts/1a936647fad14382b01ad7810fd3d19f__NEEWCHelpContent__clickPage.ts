// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / clickPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function clickPage(_me: LingoMe, pos: LingoValue) {
  var t_charPos = callMethod("locToCharPos", meProp(_me, "pViewMem"), pos);
  var t_link = meProp(_me, "pViewMem").char[t_charPos].hyperlink;
  if (t_link.length) {
  if (lingoBinary("eq", t_link.char[1], "#")) {
  var t_linkData = t_link.char.range(2, t_link.length);
  callNamed("put", lingoBinary("joinPad", "INTERNAL", t_linkData))
  switch (t_linkData) {
case "previous":
  callMethod("previousPage", meProp(_me, "pTopic"))
  callMethod("setText", _me, callMethod("getText", meProp(_me, "pTopic")))
  callMethod("render", meProp(_me, "pHelp"))
  break;
case "next":
  callMethod("nextPage", meProp(_me, "pTopic"))
  callMethod("setText", _me, callMethod("getText", meProp(_me, "pTopic")))
  callMethod("render", meProp(_me, "pHelp"))
  break;
  default:
  callMethod("searchNode", meProp(_me, "pHelp"), t_linkData)
  }

  } else {
  if (lingoBinary("eq", t_link.char.range(1, 7), "http://")) {
  callNamed("put", lingoBinary("joinPad", "EXTERNAL", t_link))
  }

  }

  }

}

