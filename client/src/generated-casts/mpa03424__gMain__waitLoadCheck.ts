// mpa03424.dcr / gMain / waitLoadCheck

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function waitLoadCheck(_me: LingoMe) {
  /* global */ var gGlobal = globalVar("gGlobal");
  if (callNamed("netDone", meProp(_me, "pNetVal"))) {
  var tResult = callNamed("netTextResult", meProp(_me, "pNetVal"));
  setGlobal("gGlobal", new LingoPropList([]));
  globalVar("gGlobal")[symbol("pFiles")] = new LingoPropList([]);
  globalVar("gGlobal")[symbol("pFiles")][symbol("pRegister")] = tResult.word[1];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pServers")] = tResult.word[2];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pGame")] = tResult.word[3];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pXML")] = tResult.word[4];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pIcons")] = tResult.word[5];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pPeople")] = tResult.word[6];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pEmoticons")] = tResult.word[7];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pItems")] = tResult.word[8];
  globalVar("gGlobal")[symbol("pFiles")][symbol("pBadges")] = tResult.word[9];
  setMeProp(_me, "pNetVal", callNamed("preloadNetThing", globalVar("gGlobal")[symbol("pFiles")][symbol("pGame")]));
  setMeProp(_me, "pStatus", symbol("waitLoadGame"));
  setMeProp(_me, "pTime", 0);
  }

}

