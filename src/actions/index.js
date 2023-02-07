import {auth, provider,storage} from '../firebase.js';
import {SET_USER,SET_LOADING_STATUS,GET_ARTICLES,GET_USER_DETAILS,UPLOAD_IMAGE} from './actionType';
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
export const getUserDetails=(payload)=>({
    type: GET_USER_DETAILS,
    payload: payload,
});

export const uploadImage=(payload)=>({
    type: UPLOAD_IMAGE,
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
                    
                    firebase.firestore().collection("users").doc(userId).get().then(function(doc) {
                        if (doc.exists) {
                            console.log("User details already exist in the database");
                        } else {
                            // Create a new document in the users collection
                            firebase.firestore().collection("users").doc(userId).set({
                                userid: userId,
                                name: name,
                                email: email,
                                photoUrl: photoUrl,
                                backGroundImageURL:"",
                                bio:"",
                            })
                            .then(function() {
                                console.log("User details added to the database!");
                            })
                            .catch(function(error) {
                                console.error("Error adding user details to the database: ", error);
                            });
                        }
                    }).catch(function(error) {
                        console.error("Error getting user details from the database: ", error);
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
                console.log(payload.video);
                    db.collection("articles").add({
                        actor:{
                            description:payload.user.email,
                            title:payload.user.displayName,
                            date:payload.timestamp,
                            image:payload.user.photoURL,
                        },
                        userId:payload.user.uid,
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

export function uploadImageAPI(image,userId,imageType){
        return (dispatch)=>{
            const upload=storage.ref(`images/${image.name}`).put(image);
            upload.on("state_changed",snapshot=>{},error=>{console.log(error)},()=>{
                storage.ref("images").child(image.name).getDownloadURL().then(url=>{
                    if(imageType==='profile'){
                        db.collection("users").doc(userId).update({
                            photoUrl:url,
                        });
                    }
                    else{
                        db.collection("users").doc(userId).update({
                            backGroundImageURL:url,
                        });
                    }
                    dispatch(uploadImage(url));
                })
            })
        }    
};


export function getUserDetailsAPI(userId){
    return (dispatch)=>{
        let payload;
        db.collection("users").doc(userId).onSnapshot((snapshot)=>{
            payload=snapshot.data();
            dispatch(getUserDetails(payload));
        })
    }
}