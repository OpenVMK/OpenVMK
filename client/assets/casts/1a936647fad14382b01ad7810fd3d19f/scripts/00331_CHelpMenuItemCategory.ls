-- Script
property helps
property m_pBgImg

on construct me
  me.helps = []
  m_pBgImg = VOID
  return 1
end
on deconstruct me
  repeat with Help in helps
    removeObject(Help.getID())
  end repeat
  me.helps = []
end
on addHelps me, parentNode, i_rMem
  me.setCaption(parentNode.param.getaProp("CAPTION"), i_rMem)
  repeat with node in parentNode.child
    t_clsList = GetClsVariable("help.menu.item.topic")
    Help = createObject(#random, t_clsList)
    Help.setData(node, i_rMem)
    Help.addPages(node)
    helps.append(Help)
  end repeat
end
on render me, g, i
  case me.Active of
    0:
      m_pBgImg = member("field.hlp.active").image.duplicate()
    1:
      m_pBgImg = member("field.hlp.selected").image.duplicate()

  end case
  t_Img = image(m_pBgImg.width, m_pBgImg.height, 32)
  t_Img.copyPixels(m_pBgImg, m_pBgImg.rect, m_pBgImg.rect)
  t = (me.pLineHeight - m_pBgImg.rect.height) / 2
  tW = t_Img.rect.width
  tH = t_Img.rect.height
  dy = i * me.pLineHeight + t
  tRect = rect(0, dy, tW, dy + tH)
  t_Img.copyPixels(me.pImg, me.pImg.rect + rect(8, 3, 8, 3), me.pImg.rect)
  g.copyPixels(t_Img, tRect, t_Img.rect)
end