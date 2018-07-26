import React ,{Component} from 'react';
import {View,Text , TouchableOpacity , StyleSheet , Animated} from 'react-native';
import {connect} from 'react-redux';
import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from "../../store/actions/index";

class FindPlaceScreen extends Component{
    static navigatorStyle ={
        navBarButtonColor : "orange"
    };

    state={
        placesLoaded : false,
        removeAnim : new Animated.Value(1), // el valu hna bm3na en da el animy number 1 mwgood lw hn3ml anmy tany hndelo value tanya momken 2 or anything
        placeAnim : new Animated.Value(0)

    };

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

   /* componentDidMount() {
        this.props.onLoadPlaces();
    }*/

/*    componentDidUpdate(){

this.props.onLoadPlaces();

    }*/

    onNavigatorEvent = event =>{

// to load places all the time but it's access the find place button
        if(event.type==="ScreenChangedEvent"){
            if(event.id==="willAppear"){
                this.props.onLoadPlaces();
                //this state to show find place animated button after we share place ,, and after delete too
                this.setState({
                    placesLoaded : false,
                })

            }
        }

        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:"left"
                });
            }
        }
    };




    placeLoadedHandler=()=> {
        Animated.timing(this.state.placeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,

        }).start();

    };
    placesSearchHandler=()=>{
        Animated.timing(this.state.removeAnim,{
            toValue:0, //equal zero 3lshan y5tfy b3d lma a press 3aleh lw edetlo 1 hyrg3 lnfso tany w msh hy5tfy
            duration: 500 ,// milly secounds da el time bta3o mn l7zet mdost 3aleh l7d lma y5tfy
            useNativeDriver: true, // more perfomance in JS

        }).start(()=>{
            this.setState({
                placesLoaded: true
            });
            this.placeLoadedHandler();
        }); // start the animtion

    //
    // this.setState({
    // placesLoaded: true,

    // });
    };




    itemSelectedHandler=key=>{
    const selPlace = this.props.places.find(place=> {

        return place.key === key;
    });

        this.props.navigator.push({
            screen :"awesome-places.PlaceDetailScreen",
            title : selPlace.name ,

            passProps:{
                selectedPlace : selPlace
            }
    });
    };
    render(){
        let content=(
            <Animated.View
                style={{
                    opacity: this.state.removeAnim,
                    transform:[
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange:[0,1],
                                outputRange:[12 , 1]
                            })
                        }
                    ]
                }}>

            <TouchableOpacity onPress={this.placesSearchHandler} >
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>
                        Find Places
                    </Text>
                </View>
            </TouchableOpacity>

            </Animated.View>
        );
        if(this.state.placesLoaded){
            content =(
                <Animated.View
                style={{
                    opacity:this.state.placeAnim
                }
                }

                >
                <PlaceList places={this.props.places}
                           onItemSelected={this.itemSelectedHandler}/>
                </Animated.View>
            );
        }
        return (
            <View style={this.state.placesLoaded ? null :styles.buttonContainer}>
            {content}
        </View>
        );




    }
}



const styles= StyleSheet.create({
    buttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },

    searchButton:{
        borderColor:"orange",
        borderWidth: 3,
        borderRadius:50,
        padding:20,
    },
    searchButtonText:{
        color:"orange",
        fontWeight:"bold",
        fontSize :26,
    },
});

const mapStateToProps = state=>{
    return{
        places : state.places.places
    };
};

const mapDispatchToProps = dispatch=>{
    return{
        onLoadPlaces :()=> dispatch(getPlaces())
    };
};
export default connect(mapStateToProps , mapDispatchToProps) (FindPlaceScreen);