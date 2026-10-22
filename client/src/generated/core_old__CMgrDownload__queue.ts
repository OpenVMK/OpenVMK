// core.old.cct / CMgrDownload / queue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function queue(_me: LingoMe, tURL: LingoValue, tMemName: LingoValue, ttype: LingoValue, tForceFlag: LingoValue) {
  if (!lingoTruthy(callNamed("ilk", tURL, symbol("string")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Missing or invalid URL:", tURL), symbol("queue"));
  }

  if (!lingoTruthy(callNamed("ilk", tMemName, symbol("string")))) {
  tMemName = tURL;
  }

  if (!lingoTruthy(callNamed("ilk", ttype, symbol("symbol")))) {
  ttype = callMethod("recognizeMemberType", _me, tURL);
  }

  if (lingoBinary("or", !lingoTruthy(callNamed("voidp", meProp(_me, "pTaskQueue")[tMemName])), !lingoTruthy(callNamed("voidp", meProp(_me, "pActiveTasks")[tMemName])))) {
  return callNamed("error", _me, lingoBinary("joinPad", "File already downloading:", tMemName), symbol("queue"));
  }

  if (callNamed("memberExists", tMemName)) {
  if (tForceFlag) {
  var tMemNum = callNamed("getmemnum", tMemName);
  } else {
  return callNamed("getmemnum", tMemName);
  }

  } else {
  tMemNum = callNamed("createMember", tMemName, ttype);
  }

  if (lingoBinary("lt", tMemNum, 1)) {
  return callNamed("error", _me, "Failed to create member!", symbol("queue"));
  } else {
  if (lingoBinary("eq", callNamed("member", tMemNum)._type, symbol("bitmap"))) {
  setThePropOf(callNamed("member", tMemNum), "image", callNamed("image", 1, 1, 8));
  }

  }

  callMethod("add", meProp(_me, "pReceivedTasks"), tMemName)
  meProp(_me, "pTaskQueue")[tMemName] = new LingoPropList([symbol("url"), tURL, symbol("memNum"), tMemNum, symbol("type"), ttype, symbol("callback"), undefined]);
  callMethod("updateQueue", _me)
  return tMemNum;
}

