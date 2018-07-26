import {SET_PLACES, REMOVE_PLACE, PLACE_ADDED , START_ADD_PLACE, ADD_PLACE} from './actionTypes';
//import {ADD_PLACE , DELETE_PLACE , SET_PLACES } from './actionTypes';
// import {ADD_PLACE , DELETE_PLACE , SELECT_PLACE , UNSELECT_PLACE } from './actionTypes';
import {uiStartLoading, uiStopLoading, authGetToken} from "./index";

export  const startAddPlace = ()=>{
  return{
      type: START_ADD_PLACE,
  };
};


export const addPlace = (placeName, location, image) => {
    return dispatch => {

        let authToken;

        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert("Ya3m Mafish TOKEN Wallahy! :D ");
            })
            .then(token => {

                authToken = token;

                return fetch("https://us-central1-awesome-places-bee72.cloudfunctions.net/storeImage", {

                  /*  "https://us-central1-awesome-places-bee72.cloudfunctions.net/storeImage",
                    {*/
                        method: "POST",
                        body: JSON.stringify({
                            image: image.base64
                        }),

                        headers:{

                               Authorization : "Bearer " + authToken

                    }}
                );
            })
            .catch(err => {
                console.log(err);
                alert("moshkela fel token lel share code !");
                dispatch(uiStopLoading());
            })
            //improving HTTP Requests:
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl,
                    imagePath: parsedRes.imagePath
                };
                return fetch(
                    "https://awesome-places-bee72.firebaseio.com/places.json?auth=" +
                    authToken,
                    {
                        method: "POST",
                        body: JSON.stringify(placeData)

                    }
                );
            })
            // to imroving HTTP requests
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
                dispatch(placeAdded());
            })
            // this catch to catch the error on network requests not error in the code
            .catch(err => {
                console.log(err);
                alert("network problem!");
                dispatch(uiStopLoading());
            });
    };
};

/*
export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch( "https://us-central1-awesome-places-bee72.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                const placeData = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl
                };
                return fetch("https://awesome-places-bee72.firebaseio.com/places.json", {
                    method: "POST",
                    body: JSON.stringify(placeData)
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong, please try again!");
                dispatch(uiStopLoading());
            });
    };
};*/



export  const placeAdded = ()=>{
  return{
      type : PLACE_ADDED,

  };
};




export const getPlaces = () => {
    return (dispatch /*,/!*getState*!/)*/ => {
        dispatch(authGetToken())
            .then(token => {
                    return fetch("https://awesome-places-bee72.firebaseio.com/places.json?auth=" + token)
                }
            )
            .catch(() => {
                alert("Ya3m Mafish TOKEN Wallahy! :D ");
            })
            // to imprioving HTTP REUESTS TOO :D
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {
                    places.push({
                        ...parsedRes[key],
                        image: {
                            uri: parsedRes[key].image
                        },
                        key: key
                    });
                }
                dispatch(setPlaces(places));
            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
        /* const token = getState().auth.token;

         if(!token){
             return;
         }*/

    });
};
export const setPlaces = (palces) => {
    return {
        type: SET_PLACES,
        places: palces,
        //   placeName: placeName,

        /*  location: location,
          image: image,*!/*/
    }
};
/* Delete from find places */
export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch(() => {
                alert("Ya3m Mafish TOKEN Wallahy! :D ");
            })
            .then(token => {
                dispatch(removePlace(key));

                   dispatch(removePlace(key));
                return fetch("https://awesome-places-bee72.firebaseio.com/places/" + key + ".json?auth=" + token, {
                    method: "DELETE"
                })
            })
            //to imroving HTTP requests
            .then(res => {
                if (res.ok){
                    return res.json();
                }else{
                    throw(new Error());
                }
            })
            .then(parsedRes => {
                console.log("Done!");
            })
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            });
    };
};

/* Remove from UI */
/**
 *
 * @param key Place key to remove the place array
 * @returns {{type, key: *}}
 */
export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};