import {auth, provider,storage} from '../firebase.js';
import {SET_USER,SET_LOADING_STATUS,GET_ARTICLES} from './actionType';
import {db} from '../firebase.js';
import firebase from 'firebase/compat/app';

export const setUser=(payload)=>({
    type: SET_USER,
    user: payload,
});
export const setLoadingStatus=(payload)=>({
    type: SET_LOADING_STATUS,
    loading: payload,
});
export const getArticles=(payload)=>({
    type: GET_ARTICLES,
    payload: payload,
});


export function signInAPI(){
    return (dispatch)=>{
        auth.signInWithPopup(provider)
        .then((payload)=>{
            dispatch(setUser(payload.user));
            try {
                firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                    // User is signed in.
                    var userId = user.uid;
                    var name = user.displayName;
                    var email = user.email;
                    var photoUrl = user.photoURL;
                    // Create a new document in the users collection
                    firebase.firestore().collection("users").doc(userId).set({
                        userid: userId,
                        name: name,
                        email: email,
                        photoUrl: photoUrl
                    })
                    .then(function() {
                        console.log("User details added to the database!");
                    })
                    .catch(function(error) {
                        console.error("Error adding user details to the database: ", error);
                    });
                  } else {
                    // No user is signed in.
                    console.log("No user is signed in");
                  }
                });
            } catch (error) {
                console.log(error);
            }
        }
        ).catch((error)=>alert(error.message));
    }
}

export function getUserAuth(){
    return (dispatch)=>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUser(user));
            }
        })
    }
}
export function signOutAPI(){
    return (dispatch)=>{
        auth.signOut().then(()=>{
            dispatch(setUser(null));
        }).catch((error)=>alert(error.message));
    }
}
export function postArticleAPI(payload){
    return (dispatch)=>{
        dispatch(setLoadingStatus(true));
        if(payload.image!=null){
            const upload=storage.ref(`images/${payload.image.name}`).put(payload.image);
            upload.on("state_changed",snapshot=>{},error=>{console.log(error)},()=>{
                storage.ref("images").child(payload.image.name).getDownloadURL().then(url=>{
                    db.collection("articles").add({
                        actor:{
                            description:payload.user.email,
                            title:payload.user.displayName,
                            date:payload.timestamp,
                            image:payload.user.photoURL,
                        },
                        userId:payload.user.uid,
                        video:payload.video,
                        sharedImg: url,
                        comments:0,
                        description:payload.description,
                    });
                    dispatch(setLoadingStatus(false));
                })
            })
        }else if(payload.video){
            db.collection("articles").add({
                actor:{
                    description:payload.user.email,
                    title:payload.user.displayName,
                    date:payload.timestamp,
                    image:payload.user.photoURL,
                },
                video:payload.video,
                sharedImg: "",
                comments:0,
                description:payload.description,
            });
            dispatch(setLoadingStatus(false));
        }
    }
}


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
