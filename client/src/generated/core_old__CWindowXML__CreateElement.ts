// core.old.cct / CWindowXML / CreateElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateElement(_me: LingoMe, _this: LingoValue, tProps: LingoValue) {
  var tTemplate = meProp(_me, "pElemClsList")[tProps[symbol("style")]];
  var ttype = tProps[symbol("type")];
  var tmodel = tProps[symbol("model")];
  var tClass = lingoBinary("join", lingoBinary("join", lingoBinary("join", "window.", ttype), tmodel), ".class");
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pElemClsList")[tClass]))) {
  var tClsStruct = meProp(_me, "pElemClsList")[tClass];
  } else {
  if (callNamed("variableExists", tClass)) {
  tClsStruct = callNamed("GetClsVariable", tClass);
  meProp(_me, "pElemClsList")[tClass] = tClsStruct;
  } else {
  tClsStruct = undefined;
  }

  }

  if (callNamed("voidp", tClsStruct)) {
  var tElement = callNamed("createObject", symbol("temp"), tTemplate);
  } else {
  tElement = callNamed("createObject", symbol("temp"), tTemplate, tClsStruct);
  }

  if (!lingoTruthy(tElement)) {
  return callNamed("error", _this, lingoBinary("joinPad", lingoBinary("joinPad", "Illegal element type:", tProps[symbol("id")]), tClass), symbol("CreateElement"));
  }

  callMethod("setID", tElement, tProps[symbol("id")])
  if (callMethod("Define", tElement, tProps)) {
  return tElement;
  } else {
  return undefined;
  }

}

