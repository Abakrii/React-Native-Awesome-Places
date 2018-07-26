import {AsyncStorage} from 'react-native';
import { TRY_AUTH , AUTH_SET_TOKEN , AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from "../../../App";
const API_KEY = "AIzaSyCJarib7IcgK-elIZ0RWkLX2LZAYisnW48";
export const tryAuth = (authData , authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            API_KEY;
        if(authMode==="signup") {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
                API_KEY;
        }
        fetch(
            url,
            {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                dispatch(uiStopLoading());
                console.log(parsedRes);

                if(!parsedRes.idToken){
                    alert("Authentication Failed , Please Try Again");
                }else{
                    dispatch(authStoreToken(
                        parsedRes.idToken,
                        parsedRes.expiresIn,
                        parsedRes.refreshToken
                    ));
                    startMainTabs();
                }

                /* console.log(parsedRes);
                 dispatch(uiStopLoading());*/
            });

    };
};
// store in asynchstorage
export const authStoreToken =( token ,expiresIn , refreshToken )=>{
  return dispatch =>{
      const now = new Date();
      const expiryDate = now.getTime() + expiresIn * 1000;
      dispatch(authSetToken(token , expiryDate));
    //  const expiryDate = now.getTime() + 20 * 1000;
   //   console.log(now , new Date(expiryDate));

      //ap : any unique name identifer we want
        AsyncStorage.setItem("ap:auth:token" , token);
      AsyncStorage.setItem("ap:auth:expiryDate" , expiryDate.toString());
      AsyncStorage.setItem("ap:auth:refreshToken" , refreshToken);

  }
    };

//set token in our redux store
export const authSetToken = (token , expiryDate) => {
    return{
        type: AUTH_SET_TOKEN,
        token : token,
        expiryDate : expiryDate,
    };
};



/*export const authGetToken =()=>{
    return (dispatch , getState) =>{

        const promise = new Promise((resolve , reject)=>{
            const token = getState().auth.token;
            if(!token){
                reject();
            }else {
                resolve(token);
            }
        });
return promise;
    };
};*/
export const authGetToken = () => {
    return (dispatch, getState) => {

        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            //expired date smaller than current date , means okay token is expired bec expiration date 5els
            if (!token ||new Date (expiryDate)<= new Date()) {

            let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                .catch (err=>reject())
                    .then(tokenFromStorage=>{
                        fetchedToken = tokenFromStorage;
                        if(!tokenFromStorage){
                            reject();
                            return;
                        }
                     return   AsyncStorage.getItem("ap:auth:expiryDate");


                    })
                    .then(expiryDate=>{
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if(parsedExpiryDate > now){
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        }else {
                            reject();
                        }

                    })
                .catch (err=> reject());
            } else {
                resolve(token);
            }
        });

      return promise
          .catch(err=>{
//refresh token to get  a new iDToken , note : show it on the consloe
           return AsyncStorage.getItem("ap:auth:refreshToken")
                .then(refreshToken=>{
                    fetch("https://securetoken.googleapis.com/v1/token?key=" +
                        API_KEY,{

                        method:"POST",
                        headers:{
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant-type=refresh_token & refresh_token=" + refreshToken

                        });

                })
                //to see it works or not
                .then(res=>res.json())
                .then(parsedRes=>{
                    if(parsedRes.id_token){

                        console.log("Refresh Token Worked!");
                        dispatch(
                            authStoreToken(
                            parsedRes.id_token ,
                            parsedRes.expires_in ,
                            parsedRes.refresh_token
                        )
                        );
                            return parsedRes.id_token;
                    }else{
                        dispatch(authClearStorage());
                    }
                });


        })
          .then(token=>{
              if(!token) {
                  throw new Error();
              }else{
                  return token;
              }
          });

    };
};


// to atuo singin function with token

export  const authAutoSignIn= ()=>{
    return dispatch=>{
        dispatch(authGetToken())

            .then(token=>{
                startMainTabs();
            })
    .catch(err=>console.log("Failed to fetch token!"));
    };
};

//clean up the async storage if we failed , if we have no token or valid token beacause expired

export const authClearStorage =()=>{

    return dispatch=>{

        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
     return   AsyncStorage.removeItem("ap:auth:refreshToken");
    };

};


export const authLogout = ()=>{
    return dispatch =>{
        dispatch(authClearStorage())
            .then(()=>{
                App();
            });
dispatch(authRemoveToken());
    };
};

export const authRemoveToken = ()=> {
    return {
        type: AUTH_REMOVE_TOKEN
    };

};












/*
const loadImage = (filename) => {
    return new Promise((resolve, reject) => {
        const imageRef = storage.ref('images').child(filename);
        var uri = imageRef.getDownloadURL();
        resolve(uri);
    });*/




/*
export const authSignin = authData=>{
    return dispatch =>
    {
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCJarib7IcgK-elIZ0RWkLX2LZAYisnW48", {
            method: "POST",
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {

                if(parsedRes.error){
                    alert("Authentication Failed , Please Try Again");
                }else{
                    startMainTabs();
                }

                /!* console.log(parsedRes);
                 dispatch(uiStopLoading());*!/
            });
};
*/












