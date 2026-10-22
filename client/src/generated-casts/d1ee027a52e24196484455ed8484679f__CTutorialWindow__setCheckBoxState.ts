// d1ee027a52e24196484455ed8484679f.cct / CTutorialWindow / setCheckBoxState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCheckBoxState(_me: LingoMe) {
  var t_bAllowTutorials = 1;
  if (lingoBinary("neq", callNamed("getThread", "Tutorial"), 0)) {
  t_bAllowTutorials = callMethod("getTutorialsVisibleState", callMethod("getComponent", callNamed("getThread", "Tutorial")));
  }

  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (t_bAllowTutorials) {
  var t_mem = callNamed("getmemnum", "button.checkbox.0");
  } else {
  t_mem = callNamed("getmemnum", "button.checkbox.1");
  }

  var t_Elem = callMethod("getElement", tWndObj, "tutorial.off");
  if (lingoBinary("neq", t_Elem, 0)) {
  if (lingoBinary("neq", t_mem, 0)) {
  var t_Img = callMethod("duplicate", callNamed("member", t_mem).image);
  callMethod("feedImage", t_Elem, t_Img)
  }

  }

}

