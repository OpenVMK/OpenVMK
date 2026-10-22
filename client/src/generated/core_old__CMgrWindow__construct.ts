// core.old.cct / CMgrWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "pLockLocZ", 0);
  setMeProp(_me, "pDefLocX", callNamed("getIntVariable", "window.default.locx", 100));
  setMeProp(_me, "pDefLocY", callNamed("getIntVariable", "window.default.locy", 100));
  setThePropOf(_this, "pItemList", new LingoList([]));
  setThePropOf(_this, "pHideList", new LingoList([]));
  callMethod("setProperty", _this, symbol("defaultLocZ"), callNamed("getIntVariable", "window.default.locz", 0))
  setThePropOf(_this, "pBoundary", lingoBinary("add", callNamed("rect", 0, 0, theProperty("stage").rect.width, theProperty("stage").rect.height), callNamed("getVariableValue", "window.boundary.limit")));
  setThePropOf(_this, "pInstanceClass", callNamed("GetClsVariable", "window.instance.class"));
  setMeProp(_me, "pClsList", new LingoPropList([]));
  setMeProp(_me, "pModalID", symbol("modal"));
  meProp(_me, "pClsList")[symbol("wrapper")] = callNamed("GetClsVariable", "window.wrapper.class");
  meProp(_me, "pClsList")[symbol("unique")] = callNamed("GetClsVariable", "window.unique.class");
  meProp(_me, "pClsList")[symbol("grouped")] = callNamed("GetClsVariable", "window.grouped.class");
  if (!lingoTruthy(callNamed("memberExists", "null"))) {
  var tNull = callNamed("member", callNamed("createMember", "null", symbol("bitmap")));
  setThePropOf(tNull, "image", callNamed("image", 1, 1, 8));
  callMethod("setPixel", tNull.image, 0, 0, callNamed("rgb", 0, 0, 0))
  }

  if (!lingoTruthy(callNamed("objectExists", symbol("layout_parser")))) {
  callNamed("createObject", symbol("layout_parser"), callNamed("GetClsVariable", "layout.parser.class"))
  }

  if (!lingoTruthy(callNamed("objectExists", symbol("layout_parser_xml")))) {
  callNamed("createObject", symbol("layout_parser_xml"), callNamed("getClassVariable", "layout.parser.xml.class"))
  }

  return 1;
}

