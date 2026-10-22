-- Script
property pages
property name
property activePage
property m_pBgImg

on construct me
  me.name = EMPTY
  me.pages = []
  activePage = 1
  m_pBgImg = VOID
  return me
end
on deconstuct me
end
on setData me, node, i_rMem
  me.name = node.param.getaProp("NAME")
  me.setCaption(node.param.getaProp("CAPTION"), i_rMem)
end
on ResolveImage me
  case me.Active of
    0:
      m_pBgImg = member("field.hlp2.active").image.duplicate()
    1:
      m_pBgImg = member("field.hlp2.selected").image.duplicate()

  end case
end
on render me, g, i
  me.ResolveImage()
  t_Img = image(m_pBgImg.width, m_pBgImg.height, 32)
  t_Img.copyPixels(m_pBgImg, m_pBgImg.rect, m_pBgImg.rect)
  t = (me.pLineHeight - m_pBgImg.rect.height) / 2
  tW = t_Img.rect.width
  tH = t_Img.rect.height
  dy = i * me.pLineHeight + t
  tRect = rect(0, dy, tW, dy + tH)
  t_Img.copyPixels(me.pImg, me.pImg.rect + rect(8, 3, 8, 3), me.pImg.rect)
  t_x = 41
  t_offset = rect(t_x, 0, t_x, 0)
  g.copyPixels(t_Img, tRect + t_offset, t_Img.rect)
end
on update me
end
on addPages me, parentNode
  repeat with node in parentNode.child
    if node.type = "PAGE" then
      pages.append(node.value)
    end if
  end repeat
end
on nextPage me
  if activePage < pages.count then
    activePage = activePage + 1
  end if
end
on previousPage me
  if activePage > 1 then
    activePage = activePage - 1
  end if
end
on setActivePage me, i
  if voidp(i) then
    i = 1
  end if
  if i > pages.count then
    i = pages.count
  end if
  activePage = i
end
on getText me
  return pages[activePage]
end
on showPage me, i
  if voidp(i) then
    i = 1
  end if
  if i > pages.count then
    i = pages.count
  end if
end