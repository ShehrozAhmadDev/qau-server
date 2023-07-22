function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Nearest Neighbor Algorithm for TSP
export function nearestNeighborTSP(points, start) {
  const unvisitedPoints = new Set(points);
  const optimizedPath = [start];
  let currentPoint = start;

  unvisitedPoints.delete(start);

  while (unvisitedPoints.size > 0) {
    let nearestPoint;
    let nearestDistance = Infinity;

    for (const point of unvisitedPoints) {
      const distance = haversineDistance(
        currentPoint.latitude,
        currentPoint.longitude,
        point.latitude,
        point.longitude
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPoint = point;
      }
    }

    currentPoint = nearestPoint;
    unvisitedPoints.delete(nearestPoint);
    optimizedPath.push(nearestPoint);
  }

  return optimizedPath;
}
