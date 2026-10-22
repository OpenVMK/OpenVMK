// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, _text: LingoValue) {
  callNamed("put", _text)
  setThePropOf(meProp(_me, "pViewMem"), "text", "");
  setThePropOf(meProp(_me, "pMem"), "text", _text);
  setMeProp(_me, "pImg", callMethod("duplicate", meProp(_me, "pMem").image));
  callMethod("fill", meProp(_me, "pLayoutImg"), meProp(_me, "pLayoutImg").rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), meProp(_me, "m_fillColor")]))
  callMethod("parseContent", _me)
}

