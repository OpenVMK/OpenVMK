// core.old.cct / Layout Parser Class / parse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parse(_me: LingoMe, tFieldName: LingoValue) {
  if (callNamed("memberExists", tFieldName)) {
  if (callNamed("listp", meProp(_me, "pCache")[tFieldName])) {
  var tdata = meProp(_me, "pCache")[tFieldName];
  } else {
  if (lingoBinary("contains", tFieldName, ".window")) {
  tdata = callMethod("parse_window", _me, tFieldName);
  meProp(_me, "pCache")[tFieldName] = tdata;
  } else {
  if (lingoBinary("contains", tFieldName, ".element")) {
  tdata = callMethod("parse_element", _me, tFieldName);
  meProp(_me, "pCache")[tFieldName] = tdata;
  } else {
  if (lingoBinary("contains", tFieldName, ".room")) {
  tdata = callMethod("parse_visual", _me, tFieldName);
  } else {
  if (lingoBinary("contains", tFieldName, ".visual")) {
  tdata = callMethod("parse_visual", _me, tFieldName);
  meProp(_me, "pCache")[tFieldName] = tdata;
  }

  }

  }

  }

  }

  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Member not found:", tFieldName), symbol("parse"));
  }

  return callMethod("duplicate", tdata);
}

