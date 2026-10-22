// core.old.cct / Loading Bar Class / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe) {
  if (lingoBinary("or", callNamed("voidp", meProp(_me, "pTaskId")), meProp(_me, "pReadyFlag"))) {
  return callNamed("removeObject", callMethod("getID", _me));
  }

  switch (meProp(_me, "pTaskType")) {
case symbol("cast"):
  var tPercent = callMethod("getLoadPercent", callNamed("getCastLoadManager"), meProp(_me, "pTaskId"));
  break;
case symbol("file"):
  tPercent = callMethod("getLoadPercent", callNamed("getDownloadManager"), meProp(_me, "pTaskId"));
  break;
  default:
  tPercent = callMethod("getLoadPercent", callNamed("getObject", meProp(_me, "pTaskId")));
  }

  setMeProp(_me, "pDrawPoint", lingoBinary("add", meProp(_me, "pDrawPoint"), 1));
  if (lingoBinary("lte", meProp(_me, "pDrawPoint"), lingoBinary("mul", meProp(_me, "pPercent"), meProp(_me, "pOffRect").width))) {
  var tRect = callNamed("rect", lingoBinary("sub", lingoBinary("add", meProp(_me, "pOffRect")[1], meProp(_me, "pDrawPoint")), 1), meProp(_me, "pOffRect")[2], lingoBinary("add", meProp(_me, "pOffRect")[1], meProp(_me, "pDrawPoint")), meProp(_me, "pOffRect")[4]);
  callMethod("fill", meProp(_me, "pBuffer"), tRect, meProp(_me, "pcolor"))
  }

  if (lingoBinary("eq", meProp(_me, "pPercent"), tPercent)) {
  return;
  }

  tRect = callNamed("rect", meProp(_me, "pOffRect")[1], meProp(_me, "pOffRect")[2], lingoBinary("add", lingoBinary("mul", meProp(_me, "pPercent"), meProp(_me, "pOffRect").width), meProp(_me, "pOffRect")[1]), meProp(_me, "pOffRect")[4]);
  callMethod("fill", meProp(_me, "pBuffer"), tRect, meProp(_me, "pcolor"))
  setMeProp(_me, "pDrawPoint", lingoBinary("mul", meProp(_me, "pPercent"), meProp(_me, "pOffRect").width));
  setMeProp(_me, "pPercent", tPercent);
  if (lingoBinary("gte", meProp(_me, "pPercent"), float(1))) {
  callMethod("fill", meProp(_me, "pBuffer"), meProp(_me, "pOffRect"), meProp(_me, "pcolor"))
  setMeProp(_me, "pReadyFlag", 1);
  }

}

