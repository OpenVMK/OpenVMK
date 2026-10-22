-- Script
on SetObject this, a_rObj
  callAncestor(#SetObject, this, a_rObj)
  t_iXD = integer(a_rObj.GetParam("XD"))
  t_iYD = integer(a_rObj.GetParam("YD"))
  if t_iXD < t_iYD then
    a_rObj.SetParam("DIR", "3")
  else
    a_rObj.SetParam("DIR", "5")
  end if
end