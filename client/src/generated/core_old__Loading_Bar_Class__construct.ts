// core.old.cct / Loading Bar Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var tProps = new LingoPropList([symbol("bgColor"), theProperty("stage").bgColor, symbol("color"), callNamed("rgb", 128, 128, 128), symbol("width"), 128, symbol("height"), 16]);
  tProps = callNamed("getVariableValue", "loading.bar.props", tProps);
  setMeProp(_me, "pTaskId", "");
  setMeProp(_me, "pBuffer", theProperty("stage").image);
  setMeProp(_me, "pwidth", tProps[symbol("width")]);
  setMeProp(_me, "pheight", tProps[symbol("height")]);
  setMeProp(_me, "pBgColor", tProps[symbol("bgColor")]);
  setMeProp(_me, "pcolor", tProps[symbol("color")]);
  setMeProp(_me, "pTaskType", symbol("cast"));
  setMeProp(_me, "pDrawPoint", 0);
  setMeProp(_me, "pWindowID", "");
  setMeProp(_me, "pReadyFlag", 0);
  return 1;
}

