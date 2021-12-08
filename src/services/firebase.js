import {FieldValue, firebase} from "../lib/firebase"

export async function doesUsernameExists(username) {
    const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

    return result.docs.length > 0
}

export async function getAllFollowedUsersProfiles (userId, following) {
  let query = firebase.firestore().collection('users');
    if (following.length > 0) {
      query = query.where('userId', 'in', [...following] || []);
    } else {
      query = query.where('userId', '==', userId);
    }
    const result = await query.limit(10).get();
  
    const profiles = result.docs.map((user) => ({
      ...user.data(),
      docId: user.id
    }));
  
    return profiles;
}


export async function getUserByUserId (userId) {
    const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

    const user = result.docs.map((item) => ({...item.data(),docId: item.id}))

    return user
}

// check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');
    if (following.length > 0) {
      query = query.where('userId', 'not-in', [...following, userId]);
    } else {
      query = query.where('userId', '!=', userId);
    }
    const result = await query.limit(10).get();
  
    const profiles = result.docs.map((user) => ({
      ...user.data(),
      docId: user.id
    }));
  
    return profiles;
  }

  

  export async function getPhotos(userId,following){
    const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in",  following)
    .get()

    const userFollowedPhotos = result.docs.map ((photo) => ({ 
      ...photo.data(), 
      docId: photo.id
    }))
    const photosWithUserDetails = await Promise.all(userFollowedPhotos.map(async (photo) => {
        let userLikedPhoto = false
        if(photo.likes.includes(userId)) {
          userLikedPhoto = true
        }
        const user = await getUserByUserId(photo.userId)
        const { username } = user[0]
        return { username, ...photo, userLikedPhoto}
      })
    )
    return photosWithUserDetails
  }
  
export async function getUserPhotosByUserId(userId) {
  const result = await firebase
  .firestore()
  .collection("photos")
  .where("userId", "==" ,userId)
  .get()
  const userPhotos = result.docs.map ((photo) => ({...photo.data(), docId: photo.id}))


  return userPhotos || []
}

export async function isUserFollowingProfile (loggedInUserUsername, profileUserId) {
  const result = await firebase
  .firestore()
  .collection("users")
  .where('username' , "==", loggedInUserUsername)
  .where("following", "array-contains", profileUserId)
  .get()

  const response = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
  return response?.length >= 1 ? true : false
}

export async function getUserByUsername (username) {

const result = await firebase
  .firestore()
  .collection("users")
  .where('username' , "==", username)
  .get()
  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
  return response
}

export async function toggleFollow(
  isFollowingProfile,
  visitedProfileDocId,
  visitedProfileUserId,
  activeUserDocId,
  activeUserUserId
) {
  
  // 1st param: YOUR user id
  // 2nd param: FOLLOWED USER doc id
  // 3rd param: is the user following this profile?
  await updateLoggedInUserFollowing(activeUserDocId, visitedProfileUserId, isFollowingProfile);

  // 1st param: YOUR user id
  // 2nd param: FOLLOWED USER doc id
  // 3rd param: is the user following this profile?
  await updateFollowedUserFollowers(visitedProfileDocId, activeUserUserId, isFollowingProfile);
}

export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  visitedProfileId, // the user that YOU requests to follow
  isFollowingProfile // true/false 
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile ?
        FieldValue.arrayRemove(visitedProfileId) :
        FieldValue.arrayUnion(visitedProfileId)
    });
}

export async function updateFollowedUserFollowers(
  visitedProfileDocId, // the user that YOU requests to follow
  loggedInUserId, // currently logged in user id
  isFollowingProfile // true/false 
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(visitedProfileDocId)
    .update({
      followers: isFollowingProfile ?
        FieldValue.arrayRemove(loggedInUserId) :
        FieldValue.arrayUnion(loggedInUserId)
    });
}