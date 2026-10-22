// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / splitString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function splitString(_me: LingoMe, a_sString: LingoValue, a_sDelim: LingoValue) {
  var t_sDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", a_sDelim);
  var t_sString = a_sString.item[1];
  setTheProperty("itemDelimiter", t_sDelim);
  return t_sString;
}

