// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / time2seconds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function time2seconds(_me: LingoMe, a_sTime: LingoValue) {
  var t_rDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ":");
  var t_iSeconds = lingoBinary("mul", callNamed("integer", a_sTime.item[1]), 3600);
  t_iSeconds = lingoBinary("add", t_iSeconds, lingoBinary("mul", callNamed("integer", a_sTime.item[2]), 60));
  t_iSeconds = lingoBinary("add", t_iSeconds, callNamed("integer", a_sTime.item[3]));
  setTheProperty("itemDelimiter", t_rDelim);
  return t_iSeconds;
}

