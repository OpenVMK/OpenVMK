// core.old.cct / CMgrVisualizer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pInstanceClass", callNamed("getClassVariable", "visualizer.instance.class"));
  setMeProp(_me, "pActiveItem", "");
  setMeProp(_me, "pPosCache", new LingoPropList([]));
  setMeProp(_me, "pHideList", new LingoList([]));
  setMeProp(_me, "pDefaultLocZ", callNamed("getIntVariable", "visualizer.default.locz", -float(20000000)));
  setMeProp(_me, "pAvailableLocZ", meProp(_me, "pDefaultLocZ"));
  setMeProp(_me, "pBoundary", lingoBinary("add", callNamed("rect", 0, 0, theProperty("stage").rect.width, theProperty("stage").rect.height), callNamed("getVariableValue", "visualizer.boundary.limit")));
  if (!lingoTruthy(callNamed("objectExists", symbol("layout_parser")))) {
  callNamed("createObject", symbol("layout_parser"), callNamed("getClassVariable", "layout.parser.class"))
  }

  if (!lingoTruthy(callNamed("objectExists", symbol("layout_parser_xml")))) {
  callNamed("createObject", symbol("layout_parser_xml"), callNamed("getClassVariable", "layout.parser.xml.class"))
  }

  return 1;
}

