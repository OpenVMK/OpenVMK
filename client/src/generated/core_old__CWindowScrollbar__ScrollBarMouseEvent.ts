// core.old.cct / CWindowScrollbar / ScrollBarMouseEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrollBarMouseEvent(_me: LingoMe, tstate: LingoValue) {
  if (lingoBinary("and", lingoBinary("eq", meProp(_me, "pButtonStates")[symbol("top")], symbol("passive")), lingoBinary("eq", meProp(_me, "pButtonStates")[symbol("bottom")], symbol("passive")))) {
  return;
  }

  if (lingoBinary("eq", meProp(_me, "pState"), symbol("lift"))) {
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar"), symbol("lift")]), symbol("up"))
  meProp(_me, "pButtonStates")[symbol("lift")] = symbol("up");
  return;
  }

  var tClickbutton = callMethod("buttonOfClickArea", _me, meProp(_me, "pClickPoint"));
  if (callNamed("voidp", tClickbutton)) {
  return;
  }

  if (lingoBinary("eq", meProp(_me, "pButtonStates")[tClickbutton], symbol("passive"))) {
  return;
  }

  meProp(_me, "pButtonStates")[tClickbutton] = tstate;
  setMeProp(_me, "pState", callNamed("symbol", tClickbutton));
  if (lingoBinary("or", lingoBinary("eq", tClickbutton, symbol("top")), lingoBinary("eq", tClickbutton, symbol("bottom")))) {
  callMethod("UpdateScrollBar", _me, new LingoList([tClickbutton]), tstate)
  if (lingoBinary("eq", tClickbutton, symbol("top"))) {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("sub", meProp(_me, "pScrollOffset"), meProp(_me, "pScrollStep")))
  } else {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("add", meProp(_me, "pScrollOffset"), meProp(_me, "pScrollStep")))
  }

  callMethod("UpdateLiftPosition", _me)
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar"), symbol("lift")]), symbol("up"))
  } else {
  if (lingoBinary("eq", tClickbutton, symbol("lift"))) {
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar")]), symbol("up"))
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("lift")]), tstate)
  callMethod("initEventAgent", _me, 1)
  } else {
  if (lingoBinary("and", lingoBinary("eq", tClickbutton, symbol("bar")), lingoBinary("eq", tstate, symbol("down")))) {
  var tUpPageUp = 0;
  callMethod("UpdateLiftPosition", _me)
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  if (lingoBinary("lte", lingoBinary("sub", meProp(_me, "pClickPoint").locV, _me.pSprite.locV), meProp(_me, "pRects")[symbol("lift")].top)) {
  tUpPageUp = 1;
  }

  } else {
  if (lingoBinary("lte", lingoBinary("sub", meProp(_me, "pClickPoint").locH, _me.pSprite.locH), meProp(_me, "pRects")[symbol("lift")].left)) {
  tUpPageUp = 1;
  }

  }

  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  if (tUpPageUp) {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("sub", meProp(_me, "pScrollOffset"), meProp(_me, "pPageSize")))
  var tTop = meProp(_me, "pRects")[symbol("lift")].bottom;
  var tBottom = meProp(_me, "pRects")[symbol("bottom")].top;
  } else {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("add", meProp(_me, "pScrollOffset"), meProp(_me, "pPageSize")))
  tTop = meProp(_me, "pRects")[symbol("top")].bottom;
  tBottom = meProp(_me, "pRects")[symbol("lift")].top;
  }

  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar")]), tstate)
  callMethod("DrawSpecificRect", _me, callNamed("rect", 0, tTop, meProp(_me, "pRects")[symbol("bar")].width, tBottom), symbol("bar"), symbol("up"))
  } else {
  if (tUpPageUp) {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("sub", meProp(_me, "pScrollOffset"), meProp(_me, "pPageSize")))
  var tLeft = meProp(_me, "pRects")[symbol("lift")].right;
  var tRight = meProp(_me, "pRects")[symbol("bottom")].left;
  } else {
  callMethod("sendAdjustOffsetTo", _me, lingoBinary("add", meProp(_me, "pScrollOffset"), meProp(_me, "pPageSize")))
  tLeft = meProp(_me, "pRects")[symbol("top")].right;
  tRight = meProp(_me, "pRects")[symbol("lift")].left;
  }

  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar")]), tstate)
  callMethod("DrawSpecificRect", _me, callNamed("rect", tLeft, 0, tRight, meProp(_me, "pRects")[symbol("bar")].height), symbol("bar"), symbol("up"))
  }

  callMethod("UpdateScrollBar", _me, new LingoList([symbol("lift")]), symbol("up"))
  }

  }

  }

}

