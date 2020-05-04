const generateInsights = (users, closestUsers) => {
  const insights = [];

  // Find users with low food, then compare with closest to see if they have more food
  for (const user of users) {
    if (user.stats.food === 'Low') {
      let res = closestUsers.filter((obj) =>
        Object.keys(obj.user).some((key) =>
          obj.user[key].includes(user.userDetails.name)
        )
      );

      let closestUserStats = users.filter((obj) =>
        Object.keys(obj.userDetails).some(
          (key) => obj.userDetails[key] === res[0].userClosestTo
        )
      );

      if (
        closestUserStats[0].stats.food === 'Medium' ||
        closestUserStats[0].stats.food === 'High'
      ) {
        insights.push({
          insightMessage: `${user.userDetails.name} is low on food. ${res[0].userClosestTo} is near by and has a higher amount of food, would you like to send a food parcel request?`,
        });
      }
    }
  }

  return insights;
};

const analyseDistances = (distances) => {
  // Sort each user by closest distance
  for (const user of distances) {
    user.compareUser.sort((a, b) => a.distance - b.distance);
  }

  let nearestUsers = [];

  for (const user of distances) {
    nearestUsers.push({
      user: user,
      userClosestTo: user.compareUser[0].user,
      miles: user.compareUser[0].distance,
    });
  }

  return nearestUsers;
};

const processDistances = (users) => {
  let distances = [];

  for (let i = 0; i < users.length; i++) {
    let firstLocation = [
      users[i].userDetails.location.lat,
      users[i].userDetails.location.long,
    ];
    let firstUser = users[i].userDetails.name;

    distances.push({
      user: firstUser,
      compareUser: [],
    });

    for (let j = 0; j < users.length; j++) {
      let secondLocation = [
        users[j].userDetails.location.lat,
        users[j].userDetails.location.long,
      ];
      if (firstUser != users[j].userDetails.name) {
        distances[i].compareUser.push({
          user: users[j].userDetails.name,
          distance: getDistance(
            firstLocation[0],
            firstLocation[1],
            secondLocation[0],
            secondLocation[1]
          ),
        });
      }
    }
  }

  return distances;
};

/**
 *
 * @param {number} lat1
 * @param {numbder} long1
 * @param {numbder} lat2
 * @param {numbder} long2
 * @param {string} [unit='M'] Miles
 *
 * @return {number} Distance between two locaitons
 *
 * @description Based on the haversine formula which determines the distance between
 * two points on a sphere. In this case we are using it within the Map.
 */
const getDistance = (lat1, long1, lat2, long2, unit = 'M') => {
  // If are in the same locaiton
  if (lat1 == lat2 && long1 == long2) {
    return 0;
  } else {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = long1 - long2; // Get angle
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    // Calculate into Miles - 1.1515
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export default (users) => {
  // Get User Distances
  const userDistances = processDistances(users);

  // Analyse Distances
  const closestUsers = analyseDistances(userDistances);

  // Generate Insights From Data
  const discoverdInsights = generateInsights(users, closestUsers);

  return discoverdInsights;
};
