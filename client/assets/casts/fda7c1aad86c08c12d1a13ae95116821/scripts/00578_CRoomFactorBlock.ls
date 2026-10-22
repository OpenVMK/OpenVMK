-- Script
on SetToTileStack this, a_rTile, a_iStack
  t_rObj = this.getObject()
  t_rBelow = t_rObj.GetOwner()
  t_rBelow.RemChild(t_rObj.GetKey())
  repeat with i = 1 to t_rObj.GetCount()
    t_rAbove = t_rObj[1]
    t_rBelow.SetChild(t_rAbove.GetKey(), t_rAbove)
    t_rAbove.SetOwner(t_rBelow)
  end repeat
  t_rActual = a_rTile
  repeat with i = 1 to a_iStack
    if t_rActual.GetCount() > 0 then
      t_rActual = t_rActual[1]
      next repeat
    end if
    error(this, "Stack height is not correct, adapting!", #SetToTileStack)
    exit repeat
  end repeat
  if t_rActual.GetCount() > 0 then
    t_rUnknown = t_rActual[1]
    t_rUnknown.SetOwner(t_rObj)
    t_rActual.RemChild(t_rUnknown.GetKey())
    t_rObj.SetChild(t_rUnknown.GetKey(), t_rUnknown)
  end if
  t_rObj.SetOwner(t_rActual)
  t_rActual.SetChild(t_rObj.GetKey(), t_rObj)
  t_rObj.SetRelPos(vector(0, 0, integer(t_rActual.GetParam("HGT"))))
  t_rObj.GetVisual().SetSprites()
  return 1
end
on GetTheTileStack this
  t_rUnknown = this.getObject().GetOwner()
  repeat while 1
    if objectp(t_rUnknown) then
      t_sCls = t_rUnknown.GetParam("CLASS")
      if t_sCls = "tile" or t_sCls = "exit" or t_sCls = "teleport" or t_sCls = "queue" or t_sCls = "sit" then
        return t_rUnknown
      else
        t_rUnknown = t_rUnknown.GetOwner()
      end if
      next repeat
    end if
    return VOID
  end repeat
end