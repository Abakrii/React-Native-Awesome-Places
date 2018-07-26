//import {ADD_PLACE , DELETE_PLACE} from '../actions/actionTypes';
import { SET_PLACES, REMOVE_PLACE , PLACE_ADDED , START_ADD_PLACE, ADD_PLACE } from "../actions/actionTypes";
//import {SET_PLACES} from "../actions/actionTypes";
// import {ADD_PLACE , DELETE_PLACE, SELECT_PLACE , UNSELECT_PLACE } from '../actions/actionTypes';
const initialState={
        places: [],
    placeAdded : false,
    //    selectedPlace: null,
    };

const reducer =(state = initialState , action)=>{

    switch (action.type){

        case SET_PLACES:
            return {
                ...state,
                places: action.places,

            };


        // case SET_PLACES:
        //     return{
        //         ...state,
        //         places: state.places.concat({
        //             key: Math.random() ,
        //             name :action.placeName,
        //             image: {
        //                 uri: action.image.uri
        //             },
        //             location: action.location,
        //         })
        //     };


        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key;
                })
            };

        case START_ADD_PLACE:
            return{
                ...state,
                placeAdded : false,
            };

        case PLACE_ADDED:
            return{
                ...state,
                placeAdded:  true
            };

        default:
            return state;

        // case ADD_PLACE:
        //     return{
        //         ...state,
        //         places: state.places.concat({
        //             key: Math.random() ,
        //             name :action.placeName,
        //             image: {
        //                 uri: action.image.uri
        //             },
        //             location: action.location,
        //         })
        //     };

        // case DELETE_PLACE:
        //     return{
        //         ...state,
        //         places: state.places.filter(place => {
        //             return place.key !== action.placeKey;
        //         }),
        //       //  selectedPlace : null
        //     };

        // case SELECT_PLACE:
        //     return{
        //         ...state,
        //         selectedPlace: state.places.find(place=>{
        //             return place.key === action.placeKey;
        //         })
        //     };
        //
        // case UNSELECT_PLACE:
        //     return{
        //         ...state,
        //         selectedPlace : null,
        //     };


    }

};


export default reducer;