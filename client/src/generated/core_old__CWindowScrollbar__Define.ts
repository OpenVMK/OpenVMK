// core.old.cct / CWindowScrollbar / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tProps: LingoValue) {
  var tField = lingoBinary("join", lingoBinary("join", tProps[symbol("type")], tProps[symbol("model")]), ".element");
  setMeProp(_me, "pParts", callMethod("parse", callNamed("getObject", symbol("layout_parser")), tField));
  if (lingoBinary("eq", meProp(_me, "pParts"), 0)) {
  return 0;
  }

  setThePropOf(_me, "pProps", tProps);
  setThePropOf(_me, "pID", tProps[symbol("id")]);
  setThePropOf(_me, "pMotherId", tProps[symbol("mother")]);
  setThePropOf(_me, "pType", tProps[symbol("type")]);
  setThePropOf(_me, "pScaleH", tProps[symbol("scaleH")]);
  setThePropOf(_me, "pScaleV", tProps[symbol("scaleV")]);
  setThePropOf(_me, "pBuffer", tProps[symbol("buffer")]);
  setThePropOf(_me, "pSprite", tProps[symbol("sprite")]);
  setThePropOf(_me, "pLocX", tProps[symbol("locX")]);
  setThePropOf(_me, "pLocY", tProps[symbol("locY")]);
  setThePropOf(_me, "pwidth", tProps[symbol("width")]);
  setThePropOf(_me, "pheight", tProps[symbol("height")]);
  setMeProp(_me, "pClientID", tProps[symbol("client")]);
  setMeProp(_me, "pScrollStep", tProps[symbol("offset")]);
  setMeProp(_me, "pButtonImg", new LingoPropList([]));
  if (callNamed("variableExists", "interface.palette")) {
  setThePropOf(_me, "pPalette", callNamed("member", callNamed("getmemnum", callNamed("getVariable", "interface.palette"))));
  } else {
  setThePropOf(_me, "pPalette", symbol("systemMac"));
  }

  setMeProp(_me, "pRects", new LingoPropList([]));
  setMeProp(_me, "pState", symbol("waitMouseEvent"));
  setMeProp(_me, "pScrollOffset", 0);
  setMeProp(_me, "pButtonStates", new LingoPropList([symbol("top"), symbol("up"), symbol("bottom"), symbol("up"), symbol("bar"), symbol("up"), symbol("lift"), symbol("up")]));
  callMethod("UpdateImageObjects", _me, undefined, new LingoList([symbol("up"), symbol("down"), symbol("passive")]))
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  setThePropOf(_me, "pwidth", meProp(_me, "pButtonImg")["top_up"].width);
  } else {
  setThePropOf(_me, "pheight", meProp(_me, "pButtonImg")["top_up"].height);
  }

  setThePropOf(_me, "pImage", callNamed("image", _me.pwidth, _me.pheight, 8, _me.pPalette));
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("top"), symbol("bottom"), symbol("bar"), symbol("lift")]), symbol("up"))
  var tTempOffset = _me.pBuffer.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  setMeProp(_me, "pAgentID", lingoBinary("joinPad", callMethod("getID", _me), theProperty("milliSeconds")));
  callNamed("createObject", meProp(_me, "pAgentID"), callNamed("getClassVariable", "event.agent.class"))
  return 1;
}

