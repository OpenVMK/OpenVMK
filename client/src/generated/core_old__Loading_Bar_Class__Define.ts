// core.old.cct / Loading Bar Class / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tLoadID: LingoValue, tProps: LingoValue) {
  if (lingoBinary("and", !lingoTruthy(callNamed("stringp", tLoadID)), !lingoTruthy(callNamed("symbolp", tLoadID)))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Invalid download task ID:", tLoadID), symbol("Define"));
  }

  setMeProp(_me, "pTaskId", tLoadID);
  setMeProp(_me, "pPercent", float(0));
  setMeProp(_me, "pDrawPoint", 0);
  setMeProp(_me, "pReadyFlag", 0);
  if (callNamed("ilk", tProps, symbol("propList"))) {
  if (lingoBinary("eq", callNamed("ilk", tProps[symbol("buffer")]), symbol("image"))) {
  setMeProp(_me, "pBuffer", tProps[symbol("buffer")]);
  }

  if (callNamed("ilk", tProps[symbol("width")], symbol("integer"))) {
  setMeProp(_me, "pwidth", tProps[symbol("width")]);
  }

  if (callNamed("ilk", tProps[symbol("height")], symbol("integer"))) {
  setMeProp(_me, "pheight", tProps[symbol("height")]);
  }

  if (callNamed("ilk", tProps[symbol("bgColor")], symbol("color"))) {
  setMeProp(_me, "pBgColor", tProps[symbol("bgColor")]);
  }

  if (callNamed("ilk", tProps[symbol("color")], symbol("color"))) {
  setMeProp(_me, "pcolor", tProps[symbol("color")]);
  }

  if (callNamed("ilk", tProps[symbol("type")], symbol("symbol"))) {
  setMeProp(_me, "pTaskType", tProps[symbol("type")]);
  }

  if (lingoBinary("eq", tProps[symbol("buffer")], symbol("window"))) {
  if (lingoBinary("neq", meProp(_me, "pWindowID"), "")) {
  callNamed("removeWindow", meProp(_me, "pWindowID"))
  }

  setMeProp(_me, "pWindowID", lingoBinary("joinPad", callMethod("getID", _me), theProperty("milliSeconds")));
  callNamed("createWindow", meProp(_me, "pWindowID"), "system.window")
  var tWndObj = callNamed("getWindow", meProp(_me, "pWindowID"));
  callMethod("ResizeTo", tWndObj, meProp(_me, "pwidth"), meProp(_me, "pheight"))
  callMethod("center", tWndObj)
  setMeProp(_me, "pBuffer", callMethod("getProperty", callMethod("getElement", tWndObj, "drag"), symbol("buffer")).image);
  }

  }

  var tRect = meProp(_me, "pBuffer").rect;
  if (lingoBinary("gt", meProp(_me, "pwidth"), tRect.width)) {
  setMeProp(_me, "pwidth", tRect.width);
  }

  if (lingoBinary("gt", meProp(_me, "pheight"), tRect.height)) {
  setMeProp(_me, "pheight", tRect.height);
  }

  setMeProp(_me, "pBarRect", callNamed("rect", lingoBinary("sub", lingoBinary("div", tRect.width, 2), lingoBinary("div", meProp(_me, "pwidth"), 2)), lingoBinary("sub", lingoBinary("div", tRect.height, 2), lingoBinary("div", meProp(_me, "pheight"), 2)), lingoBinary("add", lingoBinary("div", tRect.width, 2), lingoBinary("div", meProp(_me, "pwidth"), 2)), lingoBinary("add", lingoBinary("div", tRect.height, 2), lingoBinary("div", meProp(_me, "pheight"), 2))));
  setMeProp(_me, "pOffRect", callNamed("rect", lingoBinary("add", meProp(_me, "pBarRect")[1], 2), lingoBinary("add", meProp(_me, "pBarRect")[2], 2), lingoBinary("sub", meProp(_me, "pBarRect")[3], 2), lingoBinary("sub", meProp(_me, "pBarRect")[4], 2)));
  callMethod("fill", meProp(_me, "pBuffer"), meProp(_me, "pBarRect"), meProp(_me, "pBgColor"))
  callMethod("draw", meProp(_me, "pBuffer"), meProp(_me, "pBarRect"), new LingoPropList([symbol("color"), meProp(_me, "pcolor"), symbol("shapeType"), symbol("rect")]))
  return callNamed("receivePrepare", callMethod("getID", _me));
}

