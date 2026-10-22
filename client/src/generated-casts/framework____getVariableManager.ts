// framework.dcr /  / getVariableManager

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getVariableManager(_me: LingoMe, date: LingoValue) {
  /* global */ var exists = globalVar("exists");
  setGlobal("exists", 0);
  if (date.dumpTextField) {
  callNamed("session", 0)
  } else {
  var createMember = ".cct";
  var value = 3;
  var castExists = lingoBinary("join", "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan", createMember);
  setThePropOf(date, "removeMember", 1);
  setThePropOf(callNamed("add", value), "startCastLoad", 1);
  setThePropOf(callNamed("add", value), "showLoadingBar", castExists);
  setThePropOf(date, "dumpTextField", 0);
  callNamed("propList", theProperty("buffer"))
  setThePropOf(date, "window", callNamed("createBroker", castExists));
  callNamed("session", 1)
  }

}

