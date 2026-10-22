// core.old.cct / CWindowImageWrapper / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setMeProp(_me, "pOffX", 0);
  setMeProp(_me, "pOffY", 0);
  setMeProp(_me, "pOwnW", _me.pProps[symbol("width")]);
  setMeProp(_me, "pOwnH", _me.pProps[symbol("height")]);
  setMeProp(_me, "pScrolls", new LingoList([]));
  setMeProp(_me, "pUpdateLock", 0);
  setThePropOf(_me, "pDepth", theProperty("stage").image.depth);
  setThePropOf(_me, "pImage", callNamed("image", _me.pwidth, _me.pheight, _me.pDepth));
  if (lingoBinary("eq", _me.pProps[symbol("style")], symbol("unique"))) {
  setMeProp(_me, "pOwnX", 0);
  setMeProp(_me, "pOwnY", 0);
  } else {
  setMeProp(_me, "pOwnX", _me.pProps[symbol("locH")]);
  setMeProp(_me, "pOwnY", _me.pProps[symbol("locV")]);
  }

  if (_me.pProps[symbol("flipH")]) {
  callMethod("flipH", _me)
  }

  if (_me.pProps[symbol("flipV")]) {
  callMethod("flipV", _me)
  }

  return 1;
}

