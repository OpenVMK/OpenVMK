// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / rank2text

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function rank2text(_me: LingoMe, a_iRank: LingoValue) {
  var t_iRest = lingoBinary("mod", a_iRank, 10);
  if (lingoBinary("or", lingoBinary("lt", a_iRank, 10), lingoBinary("gt", a_iRank, 20))) {
  switch (t_iRest) {
case 1:
  return lingoBinary("join", a_iRank, "st");
case 2:
  return lingoBinary("join", a_iRank, "nd");
case 3:
  return lingoBinary("join", a_iRank, "rd");
  }

  }

  return lingoBinary("join", a_iRank, "th");
}

