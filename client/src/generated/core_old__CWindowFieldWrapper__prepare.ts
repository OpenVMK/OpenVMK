// core.old.cct / CWindowFieldWrapper / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  setMeProp(_me, "pMember", callNamed("member", callMethod("createMember", callNamed("getResourceManager"), lingoBinary("join", lingoBinary("join", _me.pProps[symbol("member")], theProperty("milliSeconds")), callNamed("numToChar", callNamed("random", 99))), symbol("field"))));
  setThePropOf(meProp(_me, "pMember"), "wordWrap", _me.pProps[symbol("wordWrap")]);
  setThePropOf(meProp(_me, "pMember"), "autoTab", _me.pProps[symbol("autoTab")]);
  setThePropOf(meProp(_me, "pMember"), "alignment", _me.pProps[symbol("alignment")]);
  setThePropOf(meProp(_me, "pMember"), "font", _me.pProps[symbol("font")]);
  setThePropOf(meProp(_me, "pMember"), "fontSize", _me.pProps[symbol("fontSize")]);
  setThePropOf(meProp(_me, "pMember"), "boxType", _me.pProps[symbol("boxType")]);
  setThePropOf(meProp(_me, "pMember"), "fontStyle", _me.pProps[symbol("fontStyle")]);
  setThePropOf(meProp(_me, "pMember"), "editable", 1);
  setMeProp(_me, "pOffX", 0);
  setMeProp(_me, "pOffY", 0);
  setMeProp(_me, "pOwnW", _me.pProps[symbol("width")]);
  setMeProp(_me, "pOwnH", _me.pProps[symbol("height")]);
  setMeProp(_me, "pScrolls", new LingoList([]));
  setMeProp(_me, "pUpdateLock", 0);
  setMeProp(_me, "maxChars", 0);
  if (lingoBinary("eq", _me.pProps[symbol("style")], symbol("unique"))) {
  setMeProp(_me, "pOwnX", 0);
  setMeProp(_me, "pOwnY", 0);
  } else {
  setMeProp(_me, "pOwnX", _me.pProps[symbol("locH")]);
  setMeProp(_me, "pOwnY", _me.pProps[symbol("locV")]);
  }

  if (callNamed("voidp", _me.pProps[symbol("border")])) {
  _me.pProps[symbol("border")] = 0;
  }

  setThePropOf(meProp(_me, "pMember"), "color", _me.pProps[symbol("txtColor")]);
  setThePropOf(meProp(_me, "pMember"), "bgColor", _me.pProps[symbol("txtBgColor")]);
  setThePropOf(meProp(_me, "pMember"), "border", _me.pProps[symbol("border")]);
  if (callNamed("integerp", _me.pProps[symbol("boxDropShadow")])) {
  setThePropOf(meProp(_me, "pMember"), "boxDropShadow", _me.pProps[symbol("boxDropShadow")]);
  }

  if (lingoBinary("eq", _me.pProps[symbol("key")], "")) {
  setThePropOf(meProp(_me, "pMember"), "text", "");
  } else {
  if (callNamed("textExists", _me.pProps[symbol("key")])) {
  setThePropOf(meProp(_me, "pMember"), "text", callNamed("getText", _me.pProps[symbol("key")]));
  } else {
  callNamed("error", _me, lingoBinary("joinPad", "Text not found:", _me.pProps[symbol("key")]), symbol("Define"))
  setThePropOf(meProp(_me, "pMember"), "text", _me.pProps[symbol("key")]);
  }

  }

  setThePropOf(_me.pSprite, "member", meProp(_me, "pMember"));
  setThePropOf(meProp(_me, "pMember"), "rect", callNamed("rect", 0, 0, _me.pwidth, _me.pheight));
  return 1;
}

