// core.old.cct / CWindowScrollbarBACKUP / updateData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateData(_me: LingoMe, tViewClientRect: LingoValue, tClientSourceRect: LingoValue) {
  setMeProp(_me, "pViewClientRect", tViewClientRect);
  setMeProp(_me, "pClientSourceRect", tClientSourceRect);
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  if (lingoBinary("neq", lingoBinary("mod", meProp(_me, "pViewClientRect").height, meProp(_me, "pScrollStep")), 0)) {
  setThePropOf(meProp(_me, "pViewClientRect"), "bottom", lingoBinary("add", lingoBinary("sub", meProp(_me, "pViewClientRect").bottom, lingoBinary("mod", meProp(_me, "pViewClientRect").height, meProp(_me, "pScrollStep"))), meProp(_me, "pScrollStep")));
  }

  if (lingoBinary("gt", meProp(_me, "pViewClientRect").height, meProp(_me, "pClientSourceRect").height)) {
  setMeProp(_me, "pScrollOffset", 0);
  }

  setMeProp(_me, "pMaxOffset", lingoBinary("sub", meProp(_me, "pClientSourceRect").height, meProp(_me, "pViewClientRect").height));
  setMeProp(_me, "pPageSize", meProp(_me, "pViewClientRect").height);
  } else {
  if (lingoBinary("neq", lingoBinary("mod", meProp(_me, "pViewClientRect").width, meProp(_me, "pScrollStep")), 0)) {
  setThePropOf(meProp(_me, "pViewClientRect"), "right", lingoBinary("add", lingoBinary("sub", meProp(_me, "pViewClientRect").right, lingoBinary("mod", meProp(_me, "pViewClientRect").width, meProp(_me, "pScrollStep"))), meProp(_me, "pScrollStep")));
  }

  if (lingoBinary("gt", meProp(_me, "pViewClientRect").width, meProp(_me, "pClientSourceRect").width)) {
  setMeProp(_me, "pScrollOffset", 0);
  }

  setMeProp(_me, "pMaxOffset", lingoBinary("sub", meProp(_me, "pClientSourceRect").width, meProp(_me, "pViewClientRect").width));
  setMeProp(_me, "pPageSize", meProp(_me, "pViewClientRect").width);
  }

  callMethod("sendAdjustOffsetTo", _me, meProp(_me, "pScrollOffset"))
  callMethod("ButtonsStates", _me)
}

