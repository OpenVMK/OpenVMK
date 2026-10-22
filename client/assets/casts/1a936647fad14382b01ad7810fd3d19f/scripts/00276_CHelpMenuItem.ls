-- Script
property Caption
property pImg
property pNeedUpdate
property Active
property pColors
property pLineHeight

on construct me
  pLineHeight = 21
  me.Caption = "MENU ITEM"
  pColors = [:]
  me.Active = 0
  me.update()
  pNeedUpdate = 1
  pImg = image(100, pLineHeight, 32)
  return 1
end
on deconstruct me
end
on setCaption me, i_sCaption, i_rMem
  me.Caption = i_sCaption
  i_rMem.text = me.Caption
  pImg = i_rMem.image.duplicate()
end
on Activate me
end
on inActivate me, pMem
  pNeedUpdate = 1
end
on setActive me, t_active
  me.Active = t_active
  if not me.Active then
    me.inActivate()
  else
    me.Activate()
  end if
end
on toggleActive me
  me.Active = not me.Active
  if me.Active then
    me.Activate()
  else
    me.inActivate()
  end if
  pNeedUpdate = 1
  me.update()
end
on update me, pMem
  pNeedUpdate = 0
end
on render me, g, i
  t = (me.pLineHeight - pImg.rect.height) / 2
  tW = pImg.rect.width
  tH = pImg.rect.height
  dy = i * me.pLineHeight + t
  tRect = rect(0, dy, tW, dy + tH)
  g.copyPixels(pImg, tRect, pImg.rect)
end