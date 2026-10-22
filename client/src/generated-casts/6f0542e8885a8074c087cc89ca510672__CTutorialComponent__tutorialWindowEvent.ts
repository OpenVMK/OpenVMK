// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / tutorialWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tutorialWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue, t_dialogParam: LingoValue) {
  var t_bAllowTutorials = callMethod("getTutorialsVisibleState", _me);
  switch (t_dialogEvent) {
case symbol("tutorialOFF"):
  if (t_bAllowTutorials) {
  callMethod("setTutorialsVisibleState", _me, 0)
  } else {
  callMethod("setTutorialsVisibleState", _me, 1)
  }

  break;
case symbol("tutorialMore"):
  callNamed("executeMessage", symbol("open_help_page"), t_dialogParam)
  break;
case symbol("tutorialOK"):
  if ((lingoTruthy(t_bAllowTutorials) ? 0 : 1)) {
  }

  break;
case symbol("link1"):
  setMeProp(_me, "m_iNavCode", 11);
  callMethod("RequestNavigationNodes", callMethod("getComponent", callNamed("getThread", "navigator")), symbol("adventureland"))
  break;
case symbol("link2"):
  setMeProp(_me, "m_iNavCode", 1100);
  callMethod("RequestNavigationNodes", callMethod("getComponent", callNamed("getThread", "navigator")), symbol("fantasyland"))
  break;
case symbol("link3"):
  setMeProp(_me, "m_iNavCode", 1001);
  callMethod("RequestNavigationNodes", callMethod("getComponent", callNamed("getThread", "navigator")), symbol("adventureland"))
  break;
case symbol("link4"):
  setMeProp(_me, "m_iNavCode", 1104);
  callMethod("RequestNavigationNodes", callMethod("getComponent", callNamed("getThread", "navigator")), symbol("frontierland"))
  break;
  default:
  callNamed("put", new LingoList(["Unknown Tutorial Dialog", t_dialogName, t_dialogEvent, t_dialogParam]))
  }

}

