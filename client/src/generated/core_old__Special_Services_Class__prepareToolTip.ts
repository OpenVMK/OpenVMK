// core.old.cct / Special Services Class / prepareToolTip

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareToolTip(_me: LingoMe) {
  if (meProp(_me, "pToolTipAct")) {
  var tFontStruct = callNamed("getStructVariable", "struct.font.tooltip");
  setMeProp(_me, "pToolTipMem", callNamed("member", callNamed("createMember", "ToolTip Text", symbol("field"))));
  setThePropOf(meProp(_me, "pToolTipMem"), "boxType", symbol("adjust"));
  setThePropOf(meProp(_me, "pToolTipMem"), "wordWrap", 0);
  setThePropOf(meProp(_me, "pToolTipMem"), "rect", callNamed("rect", 0, 0, 10, 20));
  setThePropOf(meProp(_me, "pToolTipMem"), "border", 1);
  setThePropOf(meProp(_me, "pToolTipMem"), "margin", 4);
  setThePropOf(meProp(_me, "pToolTipMem"), "alignment", "center");
  setThePropOf(meProp(_me, "pToolTipMem"), "font", callMethod("getaProp", tFontStruct, symbol("font")));
  setThePropOf(meProp(_me, "pToolTipMem"), "fontSize", callMethod("getaProp", tFontStruct, symbol("fontSize")));
  setThePropOf(meProp(_me, "pToolTipMem"), "color", callMethod("getaProp", tFontStruct, symbol("color")));
  setMeProp(_me, "pToolTipSpr", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "pToolTipSpr"), "member", meProp(_me, "pToolTipMem"));
  setThePropOf(meProp(_me, "pToolTipSpr"), "visible", 0);
  setThePropOf(meProp(_me, "pToolTipSpr"), "locZ", 200000000);
  setMeProp(_me, "pToolTipID", undefined);
  setMeProp(_me, "pToolTipDel", callNamed("getIntVariable", "tooltip.delay", 2000));
  }

}

