-- Script
property m_map
property m_offset
property m_tilesize

on construct me
  m_map = []
  m_tilesize = 1
  m_offset = point(0, 0)
  return 1
end
on deconstruct me
  return 1
end
on ReadMap me, i_sText
  m_tilesize = value(i_sText.line[1])
  m_offset = point(value(i_sText.line[2]), value(i_sText.line[3]))
  repeat with l = 4 to the number of lines in i_sText
    tdata = []
    tLine = i_sText.line[l]
    repeat with c = 1 to the number of chars in tLine
      tdata.append(value(tLine.char[c]))
    end repeat
    m_map.append(tdata)
  end repeat
end
on GetMapAt me, i_iX, i_iY
  if i_iY >= 1 and i_iY <= m_map.count then
    if i_iX >= 1 and i_iX <= m_map[i_iY].count then
      return m_map[i_iY][i_iX]
    end if
  end if
  return 3
end
on InitMap me, i_width, i_height
  m_map = []
  repeat with l = 1 to i_height
    tdata = []
    repeat with c = 1 to i_width
      tdata.append(0)
    end repeat
    m_map.append(tdata)
  end repeat
end
on TestPointToCMap me, i_pPoint
  heightMapTileSize = m_tilesize
  heightMapOffsetX = m_offset.locH
  heightMapOffsetY = m_offset.locV
  tPos = i_pPoint
  heightMapX = (integer(tPos.locH) - heightMapOffsetX + heightMapTileSize) / heightMapTileSize
  heightMapY = (integer(tPos.locV) - heightMapOffsetY + heightMapTileSize) / heightMapTileSize
  return me.GetMapAt(heightMapX, heightMapY)
end
on SetMapAt me, i_x, i_y, i_value
  m_map[i_y][i_x] = i_value
end
on SetTileSize me, i_tilesize
  m_tilesize = i_tilesize
end
on SetOffset me, i_offsetX, i_offsetY
  m_offset = point(i_offsetX, i_offsetY)
end
on SetMap me, a_ar_ar_map
  m_map = a_ar_ar_map.duplicate()
end
on Serialize me
  fileio = new xtra("fileio")
  tFileName = fileio.displaySave("Save map as...", "collisionmap.txt")
  fileio.createFile(tFileName)
  fileio.openfile(tFileName, 2)
  fileio.writeString(string(m_tilesize) & RETURN)
  fileio.writeString(string(m_offset.locH) & RETURN)
  fileio.writeString(string(m_offset.locV) & RETURN)
  repeat with tLine in m_map
    tString = EMPTY
    repeat with tItem in tLine
      tString = tString & tItem
    end repeat
    fileio.writeString(tString & RETURN)
  end repeat
  fileio.closeFile()
end