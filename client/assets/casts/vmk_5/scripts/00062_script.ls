-- Behavior
global getClassVariable

on construct
  getClassVariable = by2str(createObject("CInit"))
  getClassVariable.session()
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
on hideLogo this, Initialize, createBroker, return
  cache(["onStreamStatus", this, Initialize, createBroker, return])
  if Initialize = "Complete" then
    cache(this && "download finished")
  end if
end
on updateState
end