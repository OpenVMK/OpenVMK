// 1a936647fad14382b01ad7810fd3d19f.cct / NEEWCHelpContent / setStyle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setStyle(_me: LingoMe) {
  setThePropOf(meProp(_me, "pViewMem"), "antialias", 1);
  setThePropOf(meProp(_me, "pViewMem"), "useHypertextStyles", 1);
  setThePropOf(meProp(_me, "pViewMem"), "useHypertextStyles", 0);
  var pHyperLinks = meProp(_me, "pViewMem").hyperlinks;
  var pVisited = new LingoList([]);
  if (lingoBinary("gt", pHyperLinks.count, 0)) {
  pVisited[pHyperLinks.count] = 0;
  var pNormalColor = callNamed("rgb", 255, 255, 255);
  var pNormalStyle = new LingoList([symbol("normal"), symbol("underline")]);
  for (var i of pHyperLinks.toArray()) {
  var linkRef = meProp(_me, "pViewMem").char.range(i[1], i[2]).ref;
  setThePropOf(linkRef, "color", pNormalColor);
  setThePropOf(linkRef, "fontStyle", pNormalStyle);
  setThePropOf(linkRef, "font", "Arial");
  }

  }

  callNamed("put", meProp(_me, "pViewMem").html)
}

