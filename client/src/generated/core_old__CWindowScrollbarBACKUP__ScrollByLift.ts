// core.old.cct / CWindowScrollbarBACKUP / ScrollByLift

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ScrollByLift(_me: LingoMe) {
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  var tMoveAreaV = lingoBinary("sub", meProp(_me, "pRects")[symbol("bar")].height, meProp(_me, "pRects")[symbol("lift")].height);
  var tScrollPercent = lingoBinary("div", lingoBinary("mul", lingoBinary("add", lingoBinary("sub", meProp(_me, "pRects")[symbol("lift")].top, meProp(_me, "pRects")[symbol("lift")].height), 1), 100), tMoveAreaV);
  var tNowPercent = lingoBinary("div", callNamed("float", tScrollPercent), 100);
  var tNowOffset = callNamed("integer", lingoBinary("div", lingoBinary("mul", lingoBinary("sub", meProp(_me, "pClientSourceRect").bottom, meProp(_me, "pViewClientRect").height), callNamed("float", tScrollPercent)), 100));
  } else {
  var tMoveAreaH = lingoBinary("sub", meProp(_me, "pRects")[symbol("bar")].width, meProp(_me, "pRects")[symbol("lift")].width);
  tScrollPercent = lingoBinary("div", lingoBinary("mul", lingoBinary("add", lingoBinary("sub", meProp(_me, "pRects")[symbol("lift")].left, meProp(_me, "pRects")[symbol("lift")].width), 1), 100), tMoveAreaH);
  tNowPercent = lingoBinary("div", callNamed("float", tScrollPercent), 100);
  tNowOffset = callNamed("integer", lingoBinary("div", lingoBinary("mul", lingoBinary("sub", meProp(_me, "pClientSourceRect").right, meProp(_me, "pViewClientRect").width), callNamed("float", tScrollPercent)), 100));
  }

  if (lingoBinary("neq", lingoBinary("mod", tNowOffset, meProp(_me, "pScrollStep")), 0)) {
  tNowOffset = lingoBinary("sub", tNowOffset, lingoBinary("mod", tNowOffset, meProp(_me, "pScrollStep")));
  }

  callMethod("sendAdjustOffsetTo", _me, tNowOffset)
}

