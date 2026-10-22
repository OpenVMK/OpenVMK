// core.old.cct / CWindowDropDown / Define

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
  setMeProp(_me, "pProp", callMethod("parse", callNamed("getObject", symbol("layout_parser")), tField));
  if (lingoBinary("eq", meProp(_me, "pProp"), 0)) {
  return 0;
  }

  setMeProp(_me, "pState", symbol("close"));
  setThePropOf(_me, "pID", tProps[symbol("id")]);
  setThePropOf(_me, "pBuffer", tProps[symbol("buffer")]);
  setThePropOf(_me, "pSprite", tProps[symbol("sprite")]);
  setThePropOf(_me, "pLocX", _me.pSprite.left);
  setThePropOf(_me, "pLocY", _me.pSprite.top);
  var pmodel = tProps[symbol("model")];
  setMeProp(_me, "pAlignment", tProps[symbol("alignment")]);
  setMeProp(_me, "pTextKeys", tProps[symbol("keylist")]);
  setMeProp(_me, "pOrigWidth", tProps[symbol("width")]);
  setMeProp(_me, "pLineHeight", tProps[symbol("fixedLineSpace")]);
  setMeProp(_me, "pOpenDir", tProps[symbol("direction")]);
  setMeProp(_me, "pMaxWidth", tProps[symbol("maxwidth")]);
  setMeProp(_me, "pLineHeight", tProps[symbol("height")]);
  setMeProp(_me, "pFixedSize", tProps[symbol("fixedsize")]);
  setMeProp(_me, "pTextlist", new LingoList([]));
  for (var tKey of meProp(_me, "pTextKeys").toArray()) {
  if (callNamed("textExists", tKey)) {
  callMethod("add", meProp(_me, "pTextlist"), callNamed("getText", tKey))
  }

  }

  if (lingoBinary("eq", meProp(_me, "pTextlist").count, 0)) {
  callMethod("add", meProp(_me, "pTextlist"), "...")
  }

  if (callNamed("voidp", _me.pPalette)) {
  if (callNamed("variableExists", "interface.palette")) {
  setThePropOf(_me, "pPalette", callNamed("member", callNamed("getmemnum", callNamed("getVariable", "interface.palette"))));
  } else {
  setThePropOf(_me, "pPalette", symbol("systemMac"));
  }

  } else {
  if (callNamed("stringp", _me.pPalette)) {
  setThePropOf(_me, "pPalette", callNamed("member", callNamed("getmemnum", _me.pPalette)));
  }

  }

  if (callNamed("voidp", meProp(_me, "pFixedSize"))) {
  setMeProp(_me, "pFixedSize", 0);
  }

  if (callNamed("voidp", meProp(_me, "pMaxWidth"))) {
  setMeProp(_me, "pMaxWidth", meProp(_me, "pOrigWidth"));
  }

  if (lingoBinary("lt", meProp(_me, "pMaxWidth"), meProp(_me, "pOrigWidth"))) {
  setMeProp(_me, "pMaxWidth", meProp(_me, "pOrigWidth"));
  }

  if (lingoBinary("mod", meProp(_me, "pLineHeight"), 2)) {
  setMeProp(_me, "pLineHeight", lingoBinary("add", meProp(_me, "pLineHeight"), 1));
  }

  setMeProp(_me, "pSelectedItemNum", 1);
  setMeProp(_me, "pMenuItems", meProp(_me, "pTextlist"));
  setMeProp(_me, "pNumberOfMenuItems", callMethod("count", meProp(_me, "pTextlist")));
  callMethod("UpdateImageObjects", _me, undefined, symbol("up"))
  setMeProp(_me, "pDropMenuImg", callMethod("createDropImg", _me, meProp(_me, "pMenuItems"), 1, symbol("up")));
  setThePropOf(_me, "pImage", meProp(_me, "pDropMenuImg"));
  setThePropOf(_me, "pwidth", _me.pImage.width);
  var pheight = _me.pImage.height;
  setMeProp(_me, "pDropActiveBtnImg", callMethod("createDropImg", _me, new LingoList([meProp(_me, "pMenuItems")[1]]), 0, symbol("up")));
  setMeProp(_me, "pRollOverItem", 1);
  setThePropOf(_me, "pImage", meProp(_me, "pDropActiveBtnImg"));
  var tTempOffset = _me.pBuffer.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  setThePropOf(_me.pSprite, "blend", tProps[symbol("blend")]);
  return 1;
}

