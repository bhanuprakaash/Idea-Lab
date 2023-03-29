import { auth, provider, provider2, storage, realTimeDb } from '../firebase.js';
import {
  SET_USER,
  SET_LOADING_STATUS,
  GET_ARTICLES,
  GET_USER_DETAILS,
  UPLOAD_IMAGE,
  HANDLE_COMMENTS,
  HANDLE_LIKES,
  GET_LIKES,
  GET_COMMENTS,
  SEARCH_USERS,
  SAVE_PROFILE_CHANGES,
  HANDLE_FOLLOW,
  RETRIEVE_CONNECTIONS,
  COMMUNITY_ARTICLES,
} from './actionType';
import { db } from '../firebase.js';
import firebase from 'firebase/compat/app';

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});
export const setLoadingStatus = (payload) => ({
  type: SET_LOADING_STATUS,
  loading: payload,
});
export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});
export const getUserDetails = (payload) => ({
  type: GET_USER_DETAILS,
  payload: payload,
});

export const uploadImage = (payload) => ({
  type: UPLOAD_IMAGE,
  payload: payload,
});

export const handleLike = (payload) => ({
  type: HANDLE_LIKES,
  payload: payload,
});

export const handleComment = (payload) => ({
  type: HANDLE_COMMENTS,
  payload: payload,
});

export const getLikes = (payload) => ({
  type: GET_LIKES,
  payload: payload,
});

export const getComments = (payload) => ({
  type: GET_COMMENTS,
  payload: payload,
});
export const searchUsers = (payload) => ({
  type: SEARCH_USERS,
  payload: payload,
});
export const saveProfileChanges = (payload) => ({
  type: SAVE_PROFILE_CHANGES,
  payload: payload,
});
export const handleFollow = (payload) => ({
  type: HANDLE_FOLLOW,
  payload: payload,
});
export const retrieveConnections = (payload) => ({
  type: RETRIEVE_CONNECTIONS,
  payload: payload,
});
export const getCommunityArticles = (payload) => ({
  type: COMMUNITY_ARTICLES,
  payload: payload,
});

export function signInAPI(providerName) {
  let providerx;
  if (providerName === 'google') {
    providerx = provider;
  } else if (providerName === 'github') {
    providerx = provider2;
  }
  return (dispatch) => {
    auth
      .signInWithPopup(providerx)
      .then((payload) => {
        dispatch(setUser(payload.user));
        try {
          firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
              // User is signed in.
              var userId = user.uid;
              var name = user.displayName;
              var email = user.email;
              var photoUrl = user.photoURL;

              // firebase
              //   .firestore()
              //   .collection('users')
              //   .doc(userId)
              //   .get()
              //   .then(function (doc) {
              //     if (doc.exists) {
              //       console.log('User details already exist in the database');
              //     } else {
              // Create a new document in the users collection
              //     firebase
              //       .firestore()
              //       .collection('users')
              //       .doc(userId)
              //       .set({
              //         userid: userId,
              //         name: name,
              //         email: email,
              //         photoUrl: photoUrl,
              //         backGroundImageURL: '',
              //         bio: '',
              //       })
              //       .then(function () {
              //         console.log('User details added to the database!');
              //       })
              //       .catch(function (error) {
              //         console.error('Error adding user details to the database: ', error);
              //       });
              //   }
              // })
              // .catch(function (error) {
              //   console.error('Error getting user details from the database: ', error);
              // });
              realTimeDb.ref(`users/${userId}`).once('value', (snapshot) => {
                if (snapshot.exists()) {
                  console.log('User details already exist in the database');
                } else {
                  realTimeDb
                    .ref(`users/${userId}`)
                    .set({
                      userid: userId,
                      name: name,
                      email: email,
                      photoUrl: photoUrl,
                      backGroundImageURL: '',
                      bio: 'Your Bio',
                      currentRole: 'Your Current Role',
                      location: 'Location',
                      skills: 'Your Skills',
                      education: 'Your Education',
                    })
                    .then(function () {
                      console.log('User details added to the database!');
                    })
                    .catch(function (error) {
                      console.error('Error adding user details to the database: ', error);
                    });
                }
              });
            } else {
              // No user is signed in.
              console.log('No user is signed in');
            }
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => alert(error.message));
  };
}

export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}
export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => alert(error.message));
  };
}
export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoadingStatus(true));
    const userId = payload.user.uid;
    const postId = realTimeDb.ref(`articles/${userId}`).push().key; // generate unique ID
    const postRef = realTimeDb.ref(`articles/${userId}/${postId}`);
    const timestamp = payload.timestamp;
    console.log(timestamp);
    const newDate = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000,
    ).toLocaleDateString('en-US');
    if (payload.image && payload.video === '') {
      const upload = storage.ref(`images/${payload.image.name}`).put(payload.image);
      upload.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images')
            .child(payload.image.name)
            .getDownloadURL()
            .then((url) => {
              postRef.set({
                pid: postId,
                actor: {
                  description: payload.user.email,
                  title: payload.user.displayName,
                  date: newDate,
                  image: payload.user.photoURL,
                },
                userId: userId,
                video: payload.video,
                sharedImg: url,
                likes: 0,
                comments: 0,
                test: 'image',
                description: payload.description,
              });
              dispatch(setLoadingStatus(false));
            });
        },
      );
    } else if (payload.video && payload.image === '') {
      console.log(payload.video);
      postRef.set({
        pid: postId,
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: newDate,
          image: payload.user.photoURL,
        },
        userId: userId,
        video: payload.video,
        sharedImg: '',
        likes: 0,
        comments: 0,
        test: 'video',
        description: payload.description,
      });

      dispatch(setLoadingStatus(false));
    } else if (payload.video === '' && payload.image === '') {
      postRef.set({
        pid: postId,
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: newDate,
          image: payload.user.photoURL,
        },
        userId: userId,
        video: payload.video,
        sharedImg: '',
        likes: 0,
        comments: 0,
        test: 'text',
        description: payload.description,
      });

      dispatch(setLoadingStatus(false));
    }
  };
}

/* export function postArticleAPI(payload){
    return (dispatch)=>{
        dispatch(setLoadingStatus(true));
        const postRef = db.collection("articles").doc();
        const postId = postRef.id;
        if(payload.image && payload.video===""){
            const upload=storage.ref(`images/${payload.image.name}`).put(payload.image);
            upload.on("state_changed",snapshot=>{},error=>{console.log(error)},()=>{
                storage.ref("images").child(payload.image.name).getDownloadURL().then(url=>{
                    postRef.set({
                        pid:postId,
                        actor:{
                            description:payload.user.email,
                            title:payload.user.displayName,
                            date:payload.timestamp,
                            image:payload.user.photoURL,
                        },
                        userId:payload.user.uid,
                        video:payload.video,
                        sharedImg: url,
                        likes:0,
                        comments:0,
                        test:"image",
                        description:payload.description,
                    });
                    dispatch(setLoadingStatus(false));
                })
            })
        }else if(payload.video && payload.image===""){
                console.log(payload.video);
                    postRef.set({
                        pid:postId,
                        actor:{
                            description:payload.user.email,
                            title:payload.user.displayName,
                            date:payload.timestamp,
                            image:payload.user.photoURL,
                        },
                        userId:payload.user.uid,
                        video:payload.video,
                        sharedImg: "",
                        likes:0,
                        comments:0,
                        test:"video",
                        description:payload.description,
                    });
                
            dispatch(setLoadingStatus(false));
        }
        else if(payload.video==="" && payload.image===""){
            postRef.set({
                pid:postId,
                actor:{
                    description:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL,
                },
                userId:payload.user.uid,
                video:payload.video,
                sharedImg: "",
                likes:0,
                comments:0,
                test:"text",
                description:payload.description,
            });
        
    dispatch(setLoadingStatus(false));
        }
    }
} 
*/

/*
export function getArticlesAPI(userId){
    return (dispatch)=>{
        let payload;
        db.collection("articles").orderBy("actor.date","desc").onSnapshot((snapshot)=>{
            payload=snapshot.docs.map((doc)=>{
                if(doc.data().userId===userId){
                    return doc.data();
                }
            });
            dispatch(getArticles(payload));
        })
    }
}
*/

// export function getArticlesAPI(userId) {
//   let payload;
//   return (dispatch) => {
//     realTimeDb.ref(`articles/${userId}`).on('value', (snapshot) => {
//       console.log(userId);
//       payload = snapshot.val();
//       const keys = Object.keys(payload);
//       const payloadList = [];
//       for (let i = 0; i < keys.length; i++) {
//         payloadList.push(payload[keys[i]]);
//       }
//       payloadList.reverse();
//       dispatch(getArticles(payloadList));
//     });
//   };
// }

// write a function to fetch the articles of the particular id only in realtimedb and structure is articles -> userid -> pid -> data . if the user is not found it just returns null
export function getArticlesAPI(userId) {
  let payload;
  return (dispatch) => {
    realTimeDb.ref(`articles/${userId}`).on('value', (snapshot) => {
      payload = snapshot.val();
      if (payload) {
        const keys = Object.keys(payload);
        const payloadList = [];
        for (let i = 0; i < keys.length; i++) {
          payloadList.push(payload[keys[i]]);
        }
        payloadList.reverse();
        dispatch(getArticles(payloadList));
      } else {
        dispatch(getArticles(null));
      }
    });
  };
}

// export function getUserDetailsAPI(userId){
//     return (dispatch)=>{
//         let payload;
//         db.collection("users").doc(userId).onSnapshot((snapshot)=>{
//             payload=snapshot.data();
//             dispatch(getUserDetails(payload));
//         })
//     }
// }

//getUserDetailsAPI for realTimeDb
export function getUserDetailsAPI(userId) {
  return (dispatch) => {
    let payload;
    realTimeDb.ref(`users/${userId}`).on('value', (snapshot) => {
      payload = snapshot.val();
      dispatch(getUserDetails(payload));
    });
  };
}

/*
    export function handleLikeAPI(postId, userId,ownerId) {
        return (dispatch) => {
        db.collection("likes")
            .where("postId", "==", postId)
            .where("userId", "==", userId)
            .get()
            .then((snapshot) => {
            if (snapshot.empty) {
                db.collection("likes").doc(postId).set({
                postId: postId,
                userId: userId,
                });
                db.collection("articles")
                .doc(postId)
                .get()
                .then((snapshot) => {
                    db.collection("articles")
                    .doc(postId)
                    .update({
                        likes: snapshot.data().likes + 1,
                    });
                });
                dispatch(handleLike(postId, userId));
            } else {
                snapshot.forEach((doc) => {
                doc.ref.delete();
                });
                db.collection("articles")
                .doc(postId)
                .get()
                .then((snapshot) => {
                    db.collection("articles")
                    .doc(postId)
                    .update({
                        likes: snapshot.data().likes - 1,
                    });
                });
                dispatch(handleLike(postId, userId));
            }
            });
        };
    }
    
*/
export function handleLikeAPI(postId, userId, ownerId) {
  return (dispatch) => {
    const likesRef = realTimeDb.ref(`likes/${postId}`);
    likesRef.once('value', (snapshot) => {
      let payload = snapshot.val();
      if (payload) {
        if (payload.userId === userId) {
          likesRef.remove();
          realTimeDb.ref(`articles/${ownerId}/${postId}/likes`).transaction((likes) => {
            return likes - 1;
          });
        } else {
          likesRef.set({
            userId: userId,
          });
          realTimeDb.ref(`articles/${ownerId}/${postId}/likes`).transaction((likes) => {
            return likes + 1;
          });
        }
      } else {
        likesRef.set({
          userId: userId,
        });
        realTimeDb.ref(`articles/${ownerId}/${postId}/likes`).transaction((likes) => {
          return likes + 1;
        });
      }
      dispatch(handleLike(postId, userId, ownerId));
    });
  };
}

//create handleCommentAPI function to add comment to firebase realtime database which in articles/userid/postid/comments array
export function handleCommentAPI(postId, userId, ownerId, comment) {
  return (dispatch) => {
    const commentsRef = realTimeDb.ref(`articles/${ownerId}/${postId}/comments`);
    commentsRef
      .transaction((comments) => {
        if (!comments) {
          // If there are no comments yet, initialize an empty array
          comments = [];
        }
        // Add the new comment to the array
        comments.push({
          userId: userId,
          comment: comment,
        });
        return comments;
      })
      .then(() => {
        // Dispatch the action after the transaction completes successfully
        dispatch(handleComment(postId, userId, comment));
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };
}

/*
export function handleCommentAPI(postId,userId,comment){
    return (dispatch)=>{
        db.collection("articles").doc(postId).update({
            comments:firebase.firestore.FieldValue.arrayUnion({
                userId:userId,
                comment:comment,
            })
        }).then(()=>{
            dispatch(handleComment(postId,userId,comment));
        })
    }
};
*/

//create getCommentsAPI function to get comments from firebase realtime database which is in articles/userid/postid/comments array
export function getCommentsAPI(postId, ownerId) {
  return (dispatch) => {
    const commentsRef = realTimeDb.ref(`articles/${ownerId}/${postId}/comments`);
    commentsRef.on('value', (snapshot) => {
      dispatch(getComments(snapshot.val()));
    });
  };
}

//create getLikesAPI function to get comments from firebase realtime database which is in articles/userid/postid/likes count
export function getLikesAPI(postId, ownerId) {
  return (dispatch) => {
    const likesRef = realTimeDb.ref(`articles/${ownerId}/${postId}/likes`);
    likesRef.on('value', (snapshot) => {
      dispatch(getLikes(snapshot.val()));
    });

  };
}


export function searchUserAPI(searchTerm) {
  return (dispatch) => {
    let payload;
    realTimeDb.ref(`users`).once('value', (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        let userData = doc.val();
        if (userData.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(userData);
        }
      });
      payload = results;
      dispatch(searchUsers(payload));
    });
  };
}
//saveProfileChangesAPI for realTimeDb
export function saveProfileChangesAPI(
  userId,
  name,
  bio,
  email,
  education,
  skills,
  location,
  currentRole,
) {
  return (dispatch) => {
    const updates = {};
    if (name) updates.name = name;
    if (bio) updates.bio = bio;
    if (email) updates.email = email;
    if (education) updates.education = education;
    if (skills) updates.skills = skills;
    if (location) updates.location = location;
    if (currentRole) updates.currentRole = currentRole;

    console.log('userId:', userId);
    realTimeDb
      .ref(`users/${userId}`)
      .update(updates)
      .then(() => {
        dispatch(saveProfileChanges(name, bio, email, education, skills, location, currentRole));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
// uploadImageAPI for realTimeDb which first store in firestore db and then get the url and store in realTimeDb, which have last param based on profile or background
export function uploadImageAPI(userId, image, type) {
  return (dispatch) => {
    const storageRef = storage.ref();
    const imageRef = storageRef.child(`images/${userId}/${image.name}`);
    imageRef.put(image).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        if (type === 'profile') {
          realTimeDb.ref(`users/${userId}`).update({
            photoUrl: url,
          });
        } else {
          realTimeDb.ref(`users/${userId}`).update({
            backGroundImageURL: url,
          });
        }
      });
    });
  };
}
// handleFollowAPI for realTimeDb. OwnerId is the current login userId and userId is the user to follow. Only we have user/userid/connections array. So we have to check if the userId is already in connections array or not. If not then add it to connections array and if it is already there then remove it from connections array and also add following array in user/userid/following array
export function handleFollowAPI(ownerId, userId) {
  console.log('ownerId:', ownerId);
  console.log('userId:', userId);
  return (dispatch) => {
    const connectionsRef = realTimeDb.ref(`users/${ownerId}/connections`);
    const followersRef = realTimeDb.ref(`users/${userId}/followers`);
    connectionsRef.once('value', (snapshot) => {
      let payload = snapshot.val();
      if (payload) {
        if (payload.includes(userId)) {
          connectionsRef.set(payload.filter((id) => id !== userId));
        } else {
          connectionsRef.set([...payload, userId]);
        }
      } else {
        connectionsRef.set([userId]);
      }

      followersRef.once('value', (snapshot) => {
        let followersPayload = snapshot.val();
        if (followersPayload) {
          if (followersPayload.includes(ownerId)) {
            followersRef.set(followersPayload.filter((id) => id !== ownerId));
          } else {
            followersRef.set([...followersPayload, ownerId]);
          }
        } else {
          followersRef.set([ownerId]);
        }
        dispatch(handleFollow(userId));
      });
    });
  };
}

export function retrieveConnectionsAPI(userId) {
  console.log('Inside the api : userId:', userId);
  return (dispatch) => {
    const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
    connectionsRef.on('value', (snapshot) => {
      dispatch(retrieveConnections(snapshot.val()));
    });
  };
}

// create the function connectionsArticlesAPI to get the articles of the connections of the current login user and himself also.

export function getCommunityArticlesAPI(userId) {
  let payload;
  return (dispatch) => {
    const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
    connectionsRef.once('value').then((snapshot) => {
      payload = snapshot.val();
      let articlesPromises = [];
      if (payload) {
        payload.forEach((id) => {
          const articlesRef = realTimeDb.ref(`articles/${id}`);
          articlesPromises.push(
            articlesRef.once('value').then((snapshot) => {
              let payload2 = snapshot.val();
              if (payload2) {
                const keys = Object.keys(payload2);
                const payloadList = [];
                for (let i = 0; i < keys.length; i++) {
                  payloadList.push(payload2[keys[i]]);
                }
                return payloadList;
              }
            })
          );
        });
      }
      // Add code to fetch your own articles
      const myArticlesRef = realTimeDb.ref(`articles/${userId}`);
      articlesPromises.push(
        myArticlesRef.once('value').then((snapshot) => {
          let payload2 = snapshot.val();
          if (payload2) {
            const keys = Object.keys(payload2);
            const payloadList = [];
            for (let i = 0; i < keys.length; i++) {
              payloadList.push(payload2[keys[i]]);
            }
            return payloadList.reverse();
          }
        })
      );
      Promise.all(articlesPromises).then((articles) => {
        articles = articles.flat();
        dispatch(getCommunityArticles(articles));
      });
    });
  };
}



// export function getCommunityArticlesAPI(userId) {
//   return (dispatch) => {
//     const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
//     connectionsRef.on('value', async (snapshot) => {
//       let payload = snapshot.val();
//       let articles = [];
//       if (payload) {
//         const promises = payload.map((id) => {
//           return new Promise((resolve, reject) => {
//             const articlesRef = realTimeDb.ref(`articles/${id}`);
//             articlesRef.on('value', (snapshot) => {
//               let payload = snapshot.val();
//               if (payload) {
//                 const keys = Object.keys(payload);
//                 const payloadList = [];
//                 for (let i = 0; i < keys.length; i++) {
//                   payloadList.push(payload[keys[i]]);
//                 }
//                 payloadList.reverse();
//                 articles = [...articles, ...payloadList];
//                 resolve();
//               } else {
//                 reject();
//               }
//             });
//           });
//         });
//         try {
//           await Promise.all(promises);
//           console.log('articles:', articles);
//           dispatch(getCommunityArticles(articles));
//         } catch (error) {
//           console.log('Error fetching articles:', error);
//         }
//       }
//     });
//   };
// }
