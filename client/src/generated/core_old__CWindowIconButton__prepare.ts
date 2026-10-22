// core.old.cct / CWindowIconButton / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  var tField = lingoBinary("join", lingoBinary("join", _me.pType, _me.pProps[symbol("model")]), ".element");
  setThePropOf(_me, "pProp", callMethod("parse", callNamed("getObject", symbol("layout_parser")), tField));
  if (lingoBinary("eq", _me.pProp, 0)) {
  return 0;
  }

  setThePropOf(_me, "pOrigWidth", _me.pProps[symbol("width")]);
  setThePropOf(_me, "pMaxWidth", _me.pProps[symbol("maxwidth")]);
  setThePropOf(_me, "pFixedSize", _me.pProps[symbol("fixedsize")]);
  setThePropOf(_me, "pAlignment", _me.pProps[symbol("alignment")]);
  setThePropOf(_me, "pButtonText", callNamed("getText", _me.pProps[symbol("key")]));
  setThePropOf(_me, "pBlend", _me.pProps[symbol("blend")]);
  setThePropOf(_me, "pCachedImgs", new LingoPropList([]));
  if (!lingoTruthy(callNamed("voidp", _me.pProps[symbol("icon")]))) {
  var tMemNum = callNamed("getmemnum", _me.pProps[symbol("icon")]);
  if (lingoBinary("gt", tMemNum, 0)) {
  setMeProp(_me, "pIconImg", callMethod("duplicate", callNamed("member", tMemNum).image));
  }

  }

  if (!lingoTruthy(callNamed("integerp", _me.pMaxWidth))) {
  setThePropOf(_me, "pMaxWidth", 300);
  }

  if (callNamed("voidp", _me.pFixedSize)) {
  setThePropOf(_me, "pFixedSize", 0);
  }

  callMethod("UpdateImageObjects", _me, undefined, symbol("up"))
  setThePropOf(_me, "pImage", callMethod("createButtonImg", _me, _me.pButtonText, symbol("up")));
  var tTempOffset = _me.pSprite.member.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  setThePropOf(_me, "pwidth", _me.pImage.width);
  setThePropOf(_me, "pheight", _me.pImage.height);
  setThePropOf(_me, "pLocX", _me.pSprite.locH);
  setThePropOf(_me, "pLocY", _me.pSprite.locV);
  setThePropOf(_me.pSprite, "width", _me.pwidth);
  setThePropOf(_me.pSprite, "height", _me.pheight);
  return 1;
}

