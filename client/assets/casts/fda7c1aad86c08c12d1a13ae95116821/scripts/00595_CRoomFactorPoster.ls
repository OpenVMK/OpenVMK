-- Script
on PlaceTo this, a_rWall, a_veRel
  t_rObj = this.getObject()
  t_rObj.GetOwner().RemChild(t_rObj.GetKey())
  a_rWall.SetChild(t_rObj.GetKey(), t_rObj)
  t_rObj.SetOwner(a_rWall)
  t_iXD = integer(a_rWall.GetParam("XD"))
  t_iYD = integer(a_rWall.GetParam("YD"))
  if t_iXD > t_iYD then
    t_iDir = 5
    t_rObj.SetParam("DIR", "5")
  else
    t_iDir = 3
    t_rObj.SetParam("DIR", "3")
  end if
  if t_iDir = 3 then
    a_veRel.x = 0
  else
    a_veRel.y = 0
  end if
  t_rObj.SetRelPos(a_veRel)
  this._Rotate(t_iDir)
  t_rObj.GetVisual().SetBlend(100)
  return 1
end
on FloatAbove this, a_rWall, a_ptPos
  if a_rWall.GetParam("CLASS") <> "wall" then
    return error(this, "Wall expected!!!", #FloatAbove)
  end if
  t_rObj = this.getObject()
  if t_rObj.GetOwner() <> a_rWall then
    t_rObj.GetOwner().RemChild(t_rObj.GetKey())
    a_rWall.SetChild(t_rObj.GetKey(), t_rObj)
    t_rObj.SetOwner(a_rWall)
  end if
  if integer(a_rWall.GetParam("XD")) > integer(a_rWall.GetParam("YD")) then
    t_iDir = 5
    t_rObj.SetParam("DIR", "5")
  else
    t_iDir = 3
    t_rObj.SetParam("DIR", "3")
  end if
  t_rStruct = t_rObj.GetParam("STRUCT")
  repeat with t_rDir in t_rStruct.child
    if string(t_rDir.param["NUM"]) = t_iDir then
      t_rBlocks = t_rDir.child
      exit repeat
    end if
  end repeat
  t_rBlock = t_rBlocks[1]
  t_iXD = integer(t_rBlock.param["XD"])
  t_iYD = integer(t_rBlock.param["YD"])
  t_iZD = integer(t_rBlock.param["ZD"])
  t_rObj.SetParam("XD", t_iXD)
  t_rObj.SetParam("YD", t_iYD)
  if t_iDir = 5 then
    t_veOff = vector(t_iXD / 2, 0, t_iZD / 2)
  else
    t_veOff = vector(0, t_iYD / 2, t_iZD / 2)
  end if
  t_rObj.SetRelPos(a_rWall.GetVisual().ScrToRel(a_ptPos) - t_veOff)
  t_rObj.SetParam("SPRITES", t_rBlock.child)
  t_rObj.GetVisual().SetSprites()
  t_rObj.GetVisual().SetBlend(100)
  if the controlDown then
    x = t_rObj.GetAbsPos()
    y = t_rObj.GetRelPos()
    put a_rWall.GetKey() & RETURN & "abs:" && x & RETURN & "rel:" && y & RETURN & "off:" && a_rWall.GetVisual().ScrToRel(a_ptPos)
  end if
end
on FloatAround this, a_ptPos
  t_rObj = this.getObject()
  t_rWall = t_rObj.GetOwner()
  t_iDir = integer(t_rObj.GetParam("DIR"))
  t_iXD = integer(t_rObj.GetParam("XD"))
  t_iYD = integer(t_rObj.GetParam("YD"))
  t_iZD = integer(t_rObj.GetParam("ZD"))
  if t_iDir = 5 then
    t_veOff = vector(1000 - t_iXD / 2, 1000, 1000 - t_iZD / 2)
  else
    t_veOff = vector(1000, 1000 - t_iYD / 2, 1000 - t_iZD / 2)
  end if
  t_rObj.SetRelPos(t_rWall.GetVisual().ScrToRel(a_ptPos) + t_veOff)
  if the controlDown then
    put t_rWall.GetVisual().ScrToRel(a_ptPos) + t_veOff
  end if
  this._Rotate(t_iDir)
  t_rObj.GetVisual().SetBlend(50)
  return 1
end
on CanBeMoved this
  return 1
end
on _Rotate this, a_iDir
  t_rObj = this.getObject()
  t_rObj.SetParam("DIR", string(a_iDir))
  t_rStruct = t_rObj.GetParam("STRUCT")
  repeat with t_rDir in t_rStruct.child
    if integer(t_rDir.param["NUM"]) = a_iDir then
      t_rBlocks = t_rDir.child
      exit repeat
    end if
  end repeat
  t_rBlock = t_rBlocks[1]
  t_rObj.SetParam("XD", t_rBlock.param["XD"])
  t_rObj.SetParam("YD", t_rBlock.param["YD"])
  t_rObj.SetParam("ZD", t_rBlock.param["ZD"])
  t_rObj.SetParam("SPRITES", t_rBlock.child)
  t_rObj.GetVisual().SetSprites()
end