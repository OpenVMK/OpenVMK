// core.old.cct / CWindowScrollbarBACKUP / mouseWithin

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseWithin(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pState"), symbol("lift"))) {
  var tMouseH = theProperty("mouseH");
  var tMouseV = theProperty("mouseV");
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  if (lingoBinary("gt", tMouseV, lingoBinary("sub", _me.pSprite.bottom, meProp(_me, "pRects")[symbol("bottom")].height))) {
  tMouseV = lingoBinary("sub", _me.pSprite.bottom, meProp(_me, "pRects")[symbol("bottom")].height);
  } else {
  if (lingoBinary("lt", tMouseV, lingoBinary("add", _me.pSprite.top, meProp(_me, "pRects")[symbol("top")].height))) {
  tMouseV = lingoBinary("add", _me.pSprite.top, meProp(_me, "pRects")[symbol("top")].height);
  }

  }

  var tNewLocV = lingoBinary("sub", meProp(_me, "pClickPoint").locV, tMouseV);
  var tNewLiftRect = lingoBinary("sub", meProp(_me, "pRects")[symbol("lift")], callNamed("rect", 0, tNewLocV, 0, tNewLocV));
  if (lingoBinary("gt", tNewLiftRect.bottom, meProp(_me, "pRects")[symbol("bottom")].top)) {
  tNewLiftRect = lingoBinary("add", meProp(_me, "pButtonImg")[symbol("lift_up")].rect, callNamed("rect", 0, lingoBinary("sub", meProp(_me, "pRects")[symbol("bottom")].top, meProp(_me, "pRects")[symbol("lift")].height), 0, lingoBinary("sub", meProp(_me, "pRects")[symbol("bottom")].top, meProp(_me, "pRects")[symbol("lift")].height)));
  }

  if (lingoBinary("lt", tNewLiftRect.top, meProp(_me, "pRects")[symbol("top")].bottom)) {
  tNewLiftRect = lingoBinary("add", meProp(_me, "pButtonImg")[symbol("lift_up")].rect, callNamed("rect", 0, meProp(_me, "pRects")[symbol("top")].height, 0, meProp(_me, "pRects")[symbol("top")].height));
  }

  } else {
  if (lingoBinary("gt", tMouseH, lingoBinary("sub", _me.pSprite.right, meProp(_me, "pRects")[symbol("bottom")].left))) {
  tMouseH = lingoBinary("sub", _me.pSprite.right, meProp(_me, "pRects")[symbol("bottom")].left);
  } else {
  if (lingoBinary("lt", tMouseH, lingoBinary("add", _me.pSprite.left, meProp(_me, "pRects")[symbol("top")].right))) {
  tMouseH = lingoBinary("add", _me.pSprite.left, meProp(_me, "pRects")[symbol("top")].right);
  }

  }

  var tNewLocH = lingoBinary("sub", meProp(_me, "pClickPoint").locH, tMouseH);
  tNewLiftRect = lingoBinary("sub", meProp(_me, "pRects")[symbol("lift")], callNamed("rect", tNewLocH, 0, tNewLocH, 0));
  if (lingoBinary("gt", tNewLiftRect.right, meProp(_me, "pRects")[symbol("bottom")].left)) {
  tNewLiftRect = lingoBinary("add", meProp(_me, "pButtonImg")[symbol("lift_up")].rect, callNamed("rect", lingoBinary("sub", meProp(_me, "pRects")[symbol("bottom")].left, meProp(_me, "pRects")[symbol("lift")].width), 0, lingoBinary("sub", meProp(_me, "pRects")[symbol("bottom")].left, meProp(_me, "pRects")[symbol("lift")].width), 0));
  }

  if (lingoBinary("lt", tNewLiftRect.left, meProp(_me, "pRects")[symbol("top")].right)) {
  tNewLiftRect = lingoBinary("add", meProp(_me, "pButtonImg")[symbol("lift_up")].rect, callNamed("rect", meProp(_me, "pRects")[symbol("top")].width, 0, meProp(_me, "pRects")[symbol("top")].width, 0));
  }

  }

  meProp(_me, "pRects")[symbol("lift")] = tNewLiftRect;
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("bar")]), symbol("up"))
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("lift")]), symbol("down"))
  callMethod("ScrollByLift", _me)
  callMethod("ButtonsStates", _me)
  setMeProp(_me, "pClickPoint", callNamed("point", tMouseH, tMouseV));
  } else {
  if (lingoBinary("or", lingoBinary("eq", meProp(_me, "pState"), symbol("top")), lingoBinary("eq", meProp(_me, "pState"), symbol("bottom")))) {
  callMethod("ScrollBarMouseEvent", _me, symbol("down"))
  callMethod("ButtonsStates", _me)
  }

  }

}

