-- Script
property iRows
property iCols
property vData
property m_rMtxSrc

on new me, t_iRows, t_iCols, t_vData
  m_rMtxSrc = me.script
  vData = []
  iRows = t_iRows
  iCols = t_iCols
  if voidp(t_vData) then
    repeat with i = 1 to iRows
      vData[i] = []
      repeat with j = 1 to iCols
        vData[i][j] = 0
      end repeat
    end repeat
  else
    repeat with i = 1 to iRows
      vData[i] = []
      repeat with j = 1 to iCols
        vData[i][j] = t_vData[i][j]
      end repeat
    end repeat
  end if
  return me
end
on loadIdentity me
  if iRows <> iCols then
    put "Matrix Class : loadIdentity() : Nonsymmetric matrices can't be loaded with identity matrix"
    return 0
  end if
  repeat with i = 1 to iRows
    repeat with j = 1 to iCols
      if i = j then
        vData[i][j] = 1
        next repeat
      end if
      vData[i][j] = 0
    end repeat
  end repeat
  return 1
end
on loadZero me
  repeat with i = 1 to iRows
    repeat with j = 1 to iCols
      vData[i][j] = 0
    end repeat
  end repeat
  return 1
end
on loadRotateX me, angle
  vData[1] = [1, 0, 0, 0]
  vData[2] = [0, cos(angle), sin(angle), 0]
  vData[3] = [0, -sin(angle), cos(angle), 0]
  vData[4] = [0, 0, 0, 1]
end
on loadRotateY me, angle
  vData[1] = [cos(angle), 0, -sin(angle), 0]
  vData[2] = [0, 1, 0, 0]
  vData[3] = [sin(angle), 0, cos(angle), 0]
  vData[4] = [0, 0, 0, 1]
end
on loadRotateZ me, angle
  vData[1] = [cos(angle), sin(angle), 0, 0]
  vData[2] = [-sin(angle), cos(angle), 0, 0]
  vData[3] = [0, 0, 1, 0]
  vData[4] = [0, 0, 0, 1]
end
on orthonormalize me, keep
  case keep of
    #right, VOID:
      tX = me.getRight()
      tY = me.getUp()
      tY = tY - tX * tY.dot(tX)
      tY.normalize()
      tZ = me.getForward()
      tZ = tZ - tX * tZ.dot(tX) - tY * tZ.dot(tY)
      tZ.normalize()
      me.setRight(tX)
      me.setup(tY)
      me.setForward(tZ)
    #up:
      tY = me.getUp()
      tZ = me.getForward()
      tZ = tZ - tY * tZ.dot(tY)
      tZ.normalize()
      tX = me.getRight()
      tX = tX - tY * tX.dot(tY) - tZ * tX.dot(tZ)
      tX.normalize()
      me.setRight(tX)
      me.setup(tY)
      me.setForward(tZ)
    #forward:
      tZ = me.getForward()
      tX = me.getRight()
      tX = tX - tZ * tX.dot(tZ)
      tX.normalize()
      tY = me.getUp()
      tY = tY - tZ * tY.dot(tZ) - tX * tY.dot(tX)
      tY.normalize()
      me.setRight(tX)
      me.setup(tY)
      me.setForward(tZ)

  end case
end
on normalize me
  t_rightVector = vector(vData[1][1], vData[2][1], vData[3][1])
  t_upVector = vector(vData[1][2], vData[2][2], vData[3][2])
  t_frontVector = vector(vData[1][3], vData[2][3], vData[3][3])
  t_rightVector.normalize()
  t_upVector.normalize()
  t_frontVector.normalize()
  vData[1][1] = t_rightVector.x
  vData[2][1] = t_rightVector.y
  vData[3][1] = t_rightVector.z
  vData[1][2] = t_upVector.x
  vData[2][2] = t_upVector.y
  vData[3][2] = t_upVector.z
  vData[1][3] = t_frontVector.x
  vData[2][3] = t_frontVector.y
  vData[3][3] = t_frontVector.z
end
on duplicate me
  return m_rMtxSrc.new(iRows, iCols, vData)
end
on add me, p_otherMatrix, pOutputMatrix
  if p_otherMatrix.getNRows() <> iRows or p_otherMatrix.getNColumns() <> iCols then
    put "Matrix Class : add() : can't add two matrices of different size"
    return 0
  end if
  t_vOtherData = p_otherMatrix.GetData()
  t_newData = []
  repeat with i = 1 to iRows
    t_newData[i] = []
    repeat with j = 1 to iCols
      t_newData[i][j] = vData[i][j] + t_vOtherData[i][j]
    end repeat
  end repeat
  pOutputMatrix.setData(t_newData)
  return 1
end
on multiply me, p_otherMatrix, pOutputMatrix
  if iCols <> p_otherMatrix.getNRows() then
    put "Matrix Class : multiply() : multiplication of matrices is not defined ( num of columns of this must match num of rows of the other )"
    return VOID
  end if
  t_iCols = p_otherMatrix.getNColumns()
  t_newData = []
  repeat with i = 1 to iRows
    t_newData[i] = []
    repeat with j = 1 to t_iCols
      t_lThisRow = me.getRow(i)
      t_lOtherColumn = p_otherMatrix.getColumn(j)
      t_newData[i][j] = 0
      repeat with n = 1 to t_iCols
        t_newData[i][j] = t_newData[i][j] + t_lThisRow[n] * t_lOtherColumn[n]
      end repeat
    end repeat
  end repeat
  pOutputMatrix.setData(t_newData)
  return 1
end
on scale me, t_scale, pOutputMatrix
  t_newData = []
  repeat with i = 1 to iRows
    t_newData[i] = []
    repeat with j = 1 to iCols
      t_newData[i][j] = vData[i][j] * t_scale
    end repeat
  end repeat
  pOutputMatrix.setData(t_newData)
  return 1
end
on transform me, t_vector
  t_x = t_vector.x * vData[1][1] + t_vector.y * vData[2][1] + t_vector.z * vData[3][1] + vData[4][1]
  t_y = t_vector.x * vData[1][2] + t_vector.y * vData[2][2] + t_vector.z * vData[3][2] + vData[4][2]
  t_z = t_vector.x * vData[1][3] + t_vector.y * vData[2][3] + t_vector.z * vData[3][3] + vData[4][3]
  return vector(t_x, t_y, t_z)
end
on getNRows me
  return iRows
end
on getNColumns me
  return iCols
end
on getRow me, n
  return vData[n]
end
on getColumn me, n
  t_lColumn = []
  repeat with i = 1 to iRows
    t_lColumn[i] = vData[i][n]
  end repeat
  return t_lColumn
end
on GetData me
  return vData
end
on set me, row, column, data
  if row < 1 or row > iRows then
    put "Matrix Class : set() : row out of range"
    return 0
  end if
  if column < 1 or column > iCols then
    put "Matrix Class : set() : column out of range"
    return 0
  end if
  if not data then
    put "Matrix Class : set() : data invalid"
    return 0
  end if
  vData[row][column] = data
  return 1
end
on setRow me, n, data
  if n < 1 or n > iRows then
    put "Matrix Class : setRow() : row out of range"
    return 0
  end if
  if not data then
    put "Matrix Class : setRow() : data invalid"
    return 0
  end if
  if data.count() <> iCols then
    put "Matrix Class : setRow() : data wrong size"
    return 0
  end if
  vData[n] = data
  return 1
end
on setColumn me, n, data
  if n < 1 or n > iCols then
    put "Matrix Class : setColumn() : column out of range"
    return 0
  end if
  if not data then
    put "Matrix Class : setColumn() : data invalid"
    return 0
  end if
  if data.count() <> iRows then
    put "Matrix Class : setColum() : data wrong size"
    return 0
  end if
  repeat with i = 1 to iRows
    vData[i][n] = data[i]
  end repeat
  return 1
end
on setData me, data
  if not data or not ilk(data, #linearList) then
    put "Matrix Class : setData() : data invalid"
    return 0
  end if
  vData = data
  return 1
end
on setForward me, i_vForward
  vData[1][3] = i_vForward.x
  vData[2][3] = i_vForward.y
  vData[3][3] = i_vForward.z
end
on setup me, i_vUp
  vData[1][2] = i_vUp.x
  vData[2][2] = i_vUp.y
  vData[3][2] = i_vUp.z
end
on setRight me, i_vRight
  vData[1][1] = i_vRight.x
  vData[2][1] = i_vRight.y
  vData[3][1] = i_vRight.z
end
on getRight me
  return vector(vData[1][1], vData[2][1], vData[3][1])
end
on getUp me
  return vector(vData[1][2], vData[2][2], vData[3][2])
end
on getForward me
  return vector(vData[1][3], vData[2][3], vData[3][3])
end