import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (






     <DefaultInput
         placeholder="Place Name"
                   value={props.placeName}

                   onChangeText={props.onChangeText}
     />
 );
export default placeInput;
    // state = {
    //     placeName: ""
    // };

   // componentDidMount(){}

    // el method dy 3lshan lma ados 3la add ytl3 esm gded bel seState

    // placeNameChangedHandler = val => {
    //     this.setState({
    //         placeName: val
    //     });
    // };
//el method dy 3lshan lma agy a3ml add t3ml compare lw ana msh kateb 7aga fel input msh hyreturn anything
    //laken lw ana kateb hytl3 qema bel setState

    // placeSubmitHandler = () => {
    //     if (this.state.placeName.trim() === "") {
    //         return;
    //     }
    //
    //     this.props.onPlaceAdded(this.state.placeName);
    // };

//     render() {
//
//         return (
//
//
//
//
//           //  {/*<View style={styles.inputContainer}>*/}
//           //      {/*<TextInput*/}
//                 //    {/*placeholder="An awesome place"*/}
//                 //    {/*value={this.state.placeName}*/}
//               //      {/*onChangeText={this.placeNameChangedHandler}*/}
//                //     {/*style={styles.placeInput}*/}
//           //      {/*/>*/}
//            //     {/*<Button*/}
//               //      {/*title="Add"*/}
//                  //   {/*style={styles.placeButton}*/}
//                   //  {/*onPress={this.placeSubmitHandler}*/}
//                 //{/*/>*///}
//             // </View>
//         );
//     }
// }


