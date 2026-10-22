// core.old.cct / CMgrVisualizer / CreateXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateXML(_me: LingoMe, tID: LingoValue, tLayout: LingoValue, tLocX: LingoValue, tLocY: LingoValue) {
  if (!lingoTruthy(callNamed("integerp", tLocX))) {
  tLocX = 0;
  }

  if (!lingoTruthy(callNamed("integerp", tLocY))) {
  tLocY = 0;
  }

  if (callMethod("exists", _me, tID)) {
  callMethod("Remove", _me, tID)
  }

  setMeProp(_me, "pInstanceClass", callNamed("getClassVariable", "visualizer.xml.instance.class"));
  var tItem = callMethod("create", callNamed("getObjectManager"), tID, meProp(_me, "pInstanceClass"));
  if (!lingoTruthy(tItem)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Item creation failed:", tID), symbol("create"));
  }

  var tProps = new LingoPropList([]);
  tProps[symbol("locX")] = tLocX;
  tProps[symbol("locY")] = tLocY;
  tProps[symbol("locZ")] = meProp(_me, "pAvailableLocZ");
  tProps[symbol("layout")] = tLayout;
  tProps[symbol("boundary")] = meProp(_me, "pBoundary");
  if (!lingoTruthy(callMethod("Define", tItem, tProps))) {
  callMethod("Remove", callNamed("getObjectManager"), tID)
  return 0;
  }

  callMethod("add", _me.pItemList, tID)
  setMeProp(_me, "pAvailableLocZ", lingoBinary("add", meProp(_me, "pAvailableLocZ"), callMethod("getProperty", tItem, symbol("sprCount"))));
  return 1;
}

