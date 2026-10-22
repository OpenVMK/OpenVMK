// core.old.cct / Window API / CreateWindowXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateWindowXML(_me: LingoMe, a_sID: LingoValue, a_sLayout: LingoValue, a_iLocX: LingoValue, a_iLocY: LingoValue, a_kSpecial: LingoValue) {
  callMethod("SetXMLMode", callNamed("getWindowManager"))
  return callMethod("create", callNamed("getWindowManager"), a_sID, a_sLayout, a_iLocX, a_iLocY, a_kSpecial);
}

