import { auth, provider, provider2, storage, realTimeDb } from '../firebase.js';
import moment from 'moment';
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
  GET_CONNECTIONS,
  GET_PROFILES,
  DELETE_ARTICLE,
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
export const getConnections = (payload) => ({
  type: GET_CONNECTIONS,
  payload: payload,
});
export const getProfiles = (payload) => ({
  type: GET_PROFILES,
  payload: payload,
});
export const deleteArticle = (payload) => ({
  type: DELETE_ARTICLE,
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
                  time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
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
          time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
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
          time: new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),
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
export function connectionArticlesx(userId){
  let payload;
  realTimeDb.ref(`articles/${userId}`).on('value', (snapshot) => {
    payload = snapshot.val();
    if (payload) {
      const keys = Object.keys(payload);
      const payloadList = [];
      for (let i = 0; i < keys.length; i++) {
        payloadList.push(payload[keys[i]]);
      }
      payloadList.reverse();
      console.log(payloadList);
      return payloadList;
    } else {
      return null;
    }
  });
}

export function getUserDetailsAPI(userId) {
  return (dispatch) => {
    let payload;
    realTimeDb.ref(`users/${userId}`).on('value', (snapshot) => {
      payload = snapshot.val();
      dispatch(getUserDetails(payload));
    });
  };
}

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

export function handleCommentAPI(postId, userId, ownerId, comment) {
  return (dispatch) => {
    const commentsRef = realTimeDb.ref(`articles/${ownerId}/${postId}/comments`);
    commentsRef
      .transaction((comments) => {
        if (!comments) {
          comments = [];
        }
        comments.push({
          userId: userId,
          comment: comment,
        });
        return comments;
      })
      .then(() => {
        dispatch(handleComment(postId, userId, comment));
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };
}

export function getCommentsAPI(postId, ownerId) {
  return (dispatch) => {
    const commentsRef = realTimeDb.ref(`articles/${ownerId}/${postId}/comments`);
    commentsRef.on('value', (snapshot) => {
      dispatch(getComments(snapshot.val()));
    });
  };
}

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
export function handleFollowAPI(ownerId, userId) {
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
  return (dispatch) => {
    const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
    connectionsRef.on('value', (snapshot) => {
      dispatch(retrieveConnections(snapshot.val()));
    });
  };
}

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
            }),
          );
        });
      }
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
            return payloadList;
          }
        }),
      );
      Promise.all(articlesPromises).then((articles) => {
        articles = articles.flat();
        articles.sort((a, b) => {
          const aDate = new Date(a.actor.date);
          const bDate = new Date(b.actor.date);
          return bDate - aDate;
        });  
        dispatch(getCommunityArticles(articles));
      });
    });
  };
}

// create the function to get connections articles with real time updates based on time which is in actor/date in realTimeDb and also get the articles of the current login user also and if i like it show the count in frontedn

// export function getCommunityArticlesAPI(userId) {
//   console.log('userId:', userId);
//   return (dispatch) => {
//     const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
//     connectionsRef.on('value', async (snapshot) => {
//       const connectionIds = snapshot.val();
//       if (!connectionIds || connectionIds.length === 0) {
//         dispatch(getCommunityArticles([]));
//         return;
//       }

//       const promises = connectionIds.map((connectionId) => {
//         return new Promise((resolve, reject) => {
//           const articlesRef = realTimeDb.ref(`articles/${connectionId}`);
//           articlesRef.on('value', (snapshot) => {
//             const payload = snapshot.val();
//             if (payload) {
//               const articles = Object.values(payload).reverse();
//               resolve(articles);
//             } else {
//               resolve([]);
//             }
//           });
//         });
//       });

//       Promise.all(promises).then((articlesList) => {
//         const articles = articlesList.flat();
//         dispatch(getCommunityArticles(articles));
//       });
//     });
//   };
// }

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
// function which get the connections array in user/userid/connections and then get the user details of each user in connections array and store in redux store



export function getConnectionsAPI(userId) {
  return (dispatch) => {
    const connectionsRef = realTimeDb.ref(`users/${userId}/connections`);
    connectionsRef.on('value', (snapshot) => {
      let payload = snapshot.val();
      if (payload) {
        const promises = payload.map((id) => {
          return new Promise((resolve, reject) => {
            const userRef = realTimeDb.ref(`users/${id}`);
            userRef.on('value', (snapshot) => {
              let payload = snapshot.val();
              if (payload) {
                resolve(payload);
              } else {
                reject();
              }
            });
          });
        });
        Promise.all(promises).then((users) => {
          console.log('users:', users)
          dispatch(getConnections(users));
        });
      }
    });
  };
}


export function getProfilesAPI(userId) {
  return (dispatch) => {
    const usersRef = realTimeDb.ref('users');
    usersRef.on('value', (snapshot) => {
      let payload = snapshot.val();
      if (payload) {
        const keys = Object.keys(payload);
        const users = [];
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== userId) {
            users.push(payload[keys[i]]);
          }
        }
        dispatch(getProfiles(users));
      }
    });
  };
}

export function deleteArticleAPI(articleId, userId) {
  return (dispatch) => {
    const articleRef = realTimeDb.ref(`articles/${userId}/${articleId}`);
    articleRef.remove();
    dispatch(deleteArticle(articleId));
  };
}
