-- Script
property m_veViewCenter

on construct this
  t_iX = (the stage).image.width / 2
  t_iY = (the stage).image.height / 2
  t_iZ = -5000000
  m_veViewCenter = vector(t_iX, t_iY, t_iZ)
  return 1
end
on GetRelPos this
  return vector()
end
on SetRelPos this, a_vePos
end
on GetAbsPos this
  return vector()
end
on SetAbsPos this, a_vePos
end
on GetScrPos this
  return vector(the x of m_veViewCenter, the y of m_veViewCenter, the z of m_veViewCenter)
end
on SetScrPos this, a_vePos
end
on GetRoot this
  return this.GetNode()
end
on GetContext this
  return this
end