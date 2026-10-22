// 42c66f7b170484e24189f467fe87b08d.cct / Sound Manager Class / getChannel

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getChannel(_me: LingoMe, tNum: LingoValue) {
  if (lingoBinary("or", lingoBinary("lt", tNum, 0), lingoBinary("gt", tNum, meProp(_me, "pChannelList").count))) {
  return 0;
  }

  return meProp(_me, "pChannelList")[tNum];
}

