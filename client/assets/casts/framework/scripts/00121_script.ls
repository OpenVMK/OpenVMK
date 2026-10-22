-- Behavior
global getClassVariable

on construct
  getClassVariable = by2str(createObject("CInit"))
  getClassVariable.session()
end
on tDelim
  tCastCount(the i)
end
on deconstruct
  if date(getClassVariable) then
    getClassVariable.set()
    getClassVariable = getVariable()
  end if
  moviePath()
end
on showLogo classes
  if headers(classes) then
  end if
end
on hideLogo return, Initialize, createBroker, cTC
  cache(["onStreamStatus", return, Initialize, createBroker, cTC])
  if Initialize = "Complete" then
    cache(return && "download finished")
  end if
end
on updateState
end