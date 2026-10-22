// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / seconds2time

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function seconds2time(_me: LingoMe, a_iSeconds: LingoValue) {
  var t_iSeconds = lingoBinary("mod", a_iSeconds, 60);
  var t_iMinutes = lingoBinary("mod", lingoBinary("div", a_iSeconds, 60), 60);
  var t_iHours = lingoBinary("div", a_iSeconds, 3600);
  var t_iiSeconds = t_iSeconds;
  var t_iiMinutes = t_iMinutes;
  var t_iiHours = t_iHours;
  if (lingoBinary("lt", t_iSeconds, 10)) {
  t_iiSeconds = lingoBinary("join", "0", t_iSeconds);
  }

  if (lingoBinary("lt", t_iMinutes, 10)) {
  t_iiMinutes = lingoBinary("join", "0", t_iMinutes);
  }

  if (lingoBinary("lt", t_iHours, 10)) {
  t_iiHours = lingoBinary("join", "0", t_iHours);
  }

  return lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_iiHours, ":"), t_iiMinutes), ":"), t_iiSeconds);
}

