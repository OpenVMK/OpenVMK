-- Behavior
property m_mp_rAvatarImages

on construct this
  m_mp_rAvatarImages = [:]
end
on deconstruct this
  m_mp_rAvatarImages = [:]
end
on getImage this, a_sImageName
  t_iPos = m_mp_rAvatarImages.findPos(a_sImageName)
  if t_iPos > 0 then
    t_mp_rImageData = m_mp_rAvatarImages[t_iPos]
  else
    if memberExists(a_sImageName) then
      t_rMem = getMember(a_sImageName)
      t_rImg = t_rMem.image.duplicate()
      t_mp_rImageData = [#image: t_rImg, #point: t_rMem.regPoint, #alpha: t_rImg.extractAlpha()]
      m_mp_rAvatarImages.setaProp(a_sImageName, t_mp_rImageData)
    end if
  end if
  return t_mp_rImageData
end
on PrintImageCache this
  return m_mp_rAvatarImages
end