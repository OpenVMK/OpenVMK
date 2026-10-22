// core.old.cct / CMgrThread / buildThreadObj

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function buildThreadObj(_me: LingoMe, _this: LingoValue, tID: LingoValue, tClassList: LingoValue, tThreadObj: LingoValue) {
  var tObject = undefined;
  var tTemp = undefined;
  var tBase = callMethod("new", meProp(_me, "pObjBaseCls"));
  callMethod("construct", tBase)
  tBase[symbol("ancestor")] = tThreadObj;
  callMethod("setID", tBase, tID)
  var tResMgr = callNamed("getResourceManager");
  var tObjMgr = callNamed("getObjectManager");
  callMethod("registerObject", tObjMgr, tID, tBase)
  callMethod("addAt", tClassList, 1, tBase)
  for (var tClass of tClassList.toArray()) {
  if (callNamed("objectp", tClass)) {
  tObject = tClass;
  var tInitFlag = 0;
  } else {
  var tMemNum = callMethod("getmemnum", tResMgr, tClass);
  if (lingoBinary("lt", tMemNum, 1)) {
  callMethod("unregisterObject", tObjMgr, tID)
  return callNamed("error", _this, lingoBinary("joinPad", "Script not found:", tMemNum), symbol("buildThreadObj"));
  }

  tObject = callMethod("new", callNamed("script", tMemNum));
  tInitFlag = callMethod("handler", tObject, symbol("construct"));
  }

  tObject[symbol("ancestor")] = tTemp;
  tTemp = tObject;
  callMethod("unregisterObject", tObjMgr, tID)
  callMethod("registerObject", tObjMgr, tID, tObject)
  if (tInitFlag) {
  callMethod("construct", tObject)
  }

  }

  return tObject;
}

