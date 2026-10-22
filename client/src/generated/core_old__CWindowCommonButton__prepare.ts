// core.old.cct / CWindowCommonButton / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  var tField = lingoBinary("join", lingoBinary("join", _me.pProps[symbol("type")], _me.pProps[symbol("model")]), ".element");
  setMeProp(_me, "pProp", callMethod("parse", callNamed("getObject", symbol("layout_parser")), tField));
  if (lingoBinary("eq", meProp(_me, "pProp"), 0)) {
  return 0;
  }

  setMeProp(_me, "pmodel", _me.pProps[symbol("model")]);
  setMeProp(_me, "pOrigWidth", _me.pProps[symbol("width")]);
  setMeProp(_me, "pMaxWidth", _me.pProps[symbol("maxwidth")]);
  setMeProp(_me, "pFixedSize", _me.pProps[symbol("fixedsize")]);
  setMeProp(_me, "pAlignment", _me.pProps[symbol("alignment")]);
  setMeProp(_me, "pButtonText", callNamed("getText", _me.pProps[symbol("key")]));
  setMeProp(_me, "pBlend", _me.pProps[symbol("blend")]);
  setMeProp(_me, "pCachedImgs", new LingoPropList([]));
  if (!lingoTruthy(callNamed("integerp", meProp(_me, "pMaxWidth")))) {
  setMeProp(_me, "pMaxWidth", 300);
  }

  if (callNamed("voidp", meProp(_me, "pFixedSize"))) {
  setMeProp(_me, "pFixedSize", 0);
  }

  callMethod("UpdateImageObjects", _me, undefined, symbol("up"))
  setThePropOf(_me, "pImage", callMethod("createButtonImg", _me, meProp(_me, "pButtonText"), symbol("up")));
  var tTempOffset = _me.pSprite.member.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  setThePropOf(_me, "pwidth", _me.pImage.width);
  setThePropOf(_me, "pheight", _me.pImage.height);
  setThePropOf(_me, "pLocX", _me.pSprite.locH);
  setThePropOf(_me, "pLocY", _me.pSprite.locV);
  switch (meProp(_me, "pAlignment")) {
case symbol("center"):
  setThePropOf(_me, "pLocX", lingoBinary("sub", _me.pLocX, lingoBinary("div", lingoBinary("sub", _me.pwidth, meProp(_me, "pOrigWidth")), 2)));
  break;
case symbol("right"):
  setThePropOf(_me, "pLocX", lingoBinary("sub", _me.pLocX, lingoBinary("sub", _me.pwidth, meProp(_me, "pOrigWidth"))));
  break;
  }

  setThePropOf(_me.pSprite, "loc", callNamed("point", _me.pLocX, _me.pLocY));
  setThePropOf(_me.pSprite, "width", _me.pwidth);
  setThePropOf(_me.pSprite, "height", _me.pheight);
  return 1;
}

