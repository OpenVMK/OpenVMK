-- Script
on GetRelPos this
  t_iX = integer(this.GetParam("X"))
  t_iY = integer(this.GetParam("Y"))
  t_iZ = integer(this.GetParam("Z"))
  return vector(t_iX, t_iY, t_iZ)
end
on SetRelPos this, a_vePos
  this.SetParam("X", string(integer(a_vePos.x)))
  this.SetParam("Y", string(integer(a_vePos.y)))
  this.SetParam("Z", string(integer(a_vePos.z)))
end
on GetAbsPos this
  return this.GetOwner().GetAbsPos() + this.GetRelPos()
end
on SetAbsPos this, a_vePos
  t_veOff = a_vePos - this.GetOwner().GetAbsPos()
  this.SetParam("X", string(integer(t_veOff.x)))
  this.SetParam("Y", string(integer(t_veOff.y)))
  this.SetParam("Z", string(integer(t_veOff.z)))
end
on GetScrPos this
  t_veAbs = this.GetOwner().GetAbsPos() + this.GetRelPos()
  t_veOff = this.GetContext().GetScrPos()
  t_fX = t_veAbs.x
  t_fY = t_veAbs.y
  t_fZ = t_veAbs.z
  t_fXs = t_fX - t_fY + t_veOff.x
  t_fYs = -t_fZ + 0.5 * (t_fX + t_fY) + t_veOff.y
  t_fZs = t_fX * 10 + t_fY * 10 + t_fZ * 5 + t_veOff.z
  return vector(t_fXs, t_fYs, t_fZs)
end
on SetScrPos this, a_vePos
  t_veScr = this.GetScrPos()
  t_veAbs = this.GetAbsPos()
  t_fOffX = a_vePos.x - t_veScr.x
  t_fOffY = (a_vePos.y - t_veScr.y) * 2
  this.SetAbsPos(vector(t_veAbs.x + t_fOffX, t_veAbs.y + t_fOffY, t_veAbs.z))
end