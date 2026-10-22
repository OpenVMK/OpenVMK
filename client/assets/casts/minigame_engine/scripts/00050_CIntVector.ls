-- Script
property x
property y
property z

on new me, a_iX, a_iY, a_iZ
  x = integer(a_iX)
  y = integer(a_iY)
  z = integer(a_iZ)
  return me
end
on ilk me
  return #intvector
end
on length me
  return (abs(x) + abs(y) + abs(z)) / 3
end
on add me, a_rVec
  return intvector(x + the x of a_rVec, y + the y of a_rVec, z + the z of a_rVec)
end
on substract me, a_rVec
  return intvector(x - the x of a_rVec, y - the y of a_rVec, z - the z of a_rVec)
end
on multiply me, a_rScalar
  return intvector(x * a_rScalar, y * a_rScalar, z * a_rScalar)
end
on divide me, a_rScalar
  return intvector(x / a_rScalar, y / a_rScalar, z / a_rScalar)
end
on dot me, a_rVec
  return x * the x of a_rVec + y * the y of a_rVec + z * the z of a_rVec
end
on cross me, a_rVec
  return intvector(y * the z of a_rVec - z * the y of a_rVec, z * the x of a_rVec - x * the z of a_rVec, x * the y of a_rVec - y * the x of a_rVec)
end