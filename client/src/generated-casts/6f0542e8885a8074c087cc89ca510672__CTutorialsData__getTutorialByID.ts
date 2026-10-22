// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsData / getTutorialByID

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getTutorialByID(_me: LingoMe, tutorialID: LingoValue, t_ar_Info: LingoValue) {
  if (meProp(_me, "bParsed")) {
  var t_data = callMethod("getaProp", meProp(_me, "m_pRooms"), callNamed("string", tutorialID));
  if ((lingoTruthy(callNamed("voidp", t_data)) ? 0 : 1)) {
  setThePropOf(t_ar_Info, "name", callMethod("getaProp", t_data, symbol("name")));
  setThePropOf(t_ar_Info, "Caption", callMethod("getaProp", t_data, symbol("Caption")));
  setThePropOf(t_ar_Info, "description", callMethod("getaProp", t_data, symbol("desc")));
  setThePropOf(t_ar_Info, "link", callMethod("getaProp", t_data, symbol("link")));
  }

  return 1;
  }

  return 0;
}

