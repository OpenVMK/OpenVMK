// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "pXMLData", callNamed("createObject", "Help XML Loader", "CHelpLoadStructure"));
  callMethod("setNotifyObject", meProp(_me, "pXMLData"), _me)
  callMethod("LoadMapFile", meProp(_me, "pXMLData"))
  setMeProp(_me, "bParsed", 0);
  setMeProp(_me, "helpCategories", new LingoList([]));
  setMeProp(_me, "pActiveTopic", undefined);
  setMeProp(_me, "pMouseOver", undefined);
  setMeProp(_me, "pContent", callNamed("createObject", "Help Content View", "CHelpContent"));
  callMethod("setup", meProp(_me, "pContent"), _me, 267)
  setThePropOf(meProp(_me, "pContent"), "pOffset", callNamed("point", 310, 0));
  setMeProp(_me, "pImg", callNamed("image", 267, 300, 32));
  setMeProp(_me, "m_fillColor", callNamed("rgb", "#001f55"));
  return 1;
}

