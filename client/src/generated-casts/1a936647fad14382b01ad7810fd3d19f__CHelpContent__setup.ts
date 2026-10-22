// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpContent / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe, _help: LingoValue, _width: LingoValue) {
  setMeProp(_me, "pHelp", _help);
  if ((lingoTruthy(callNamed("voidp", _width)) ? 0 : 1)) {
  setMeProp(_me, "pwidth", _width);
  }

  setMeProp(_me, "pMem", callNamed("new", symbol("text"), callNamed("castLib", "bin")));
  setThePropOf(meProp(_me, "pMem"), "name", "HELPCONTENT.content");
  setThePropOf(meProp(_me, "pMem"), "font", "Arial");
  setThePropOf(meProp(_me, "pMem"), "wordWrap", 1);
  setThePropOf(meProp(_me, "pMem"), "rect", callNamed("rect", 0, 0, meProp(_me, "pwidth"), 200));
  setThePropOf(meProp(_me, "pMem"), "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(meProp(_me, "pMem"), "fontSize", 12);
  setThePropOf(meProp(_me, "pMem"), "antialias", 1);
  setThePropOf(meProp(_me, "pMem"), "color", callNamed("rgb", 255, 255, 255));
  setMeProp(_me, "pViewMem", callNamed("new", symbol("text"), callNamed("castLib", "bin")));
  setThePropOf(meProp(_me, "pViewMem"), "name", "HELPCONTENT.view");
  setThePropOf(meProp(_me, "pViewMem"), "font", "Arial");
  setThePropOf(meProp(_me, "pViewMem"), "wordWrap", 1);
  setThePropOf(meProp(_me, "pViewMem"), "rect", callNamed("rect", 0, 0, meProp(_me, "pwidth"), 200));
  setThePropOf(meProp(_me, "pViewMem"), "fontStyle", new LingoList([symbol("plain")]));
  setThePropOf(meProp(_me, "pViewMem"), "fontSize", 12);
  setThePropOf(meProp(_me, "pViewMem"), "antialias", 1);
  setThePropOf(meProp(_me, "pViewMem"), "useHypertextStyles", 0);
  setThePropOf(meProp(_me, "pViewMem"), "color", callNamed("rgb", 255, 255, 255));
  setMeProp(_me, "pImg", callMethod("duplicate", meProp(_me, "pMem").image));
  setMeProp(_me, "pLayoutImg", callNamed("image", 300, 300, 32));
  setMeProp(_me, "m_fillColor", callNamed("rgb", "#001f55"));
}

