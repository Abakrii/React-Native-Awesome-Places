import React from 'react';
import {  StyleSheet , FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = props => {
    // const placesOutput = props.places.map((place, i) => (
    //
    // )); // we dont need the map method because flat list handel the loop of the array
    return (
        <FlatList
            style={styles.listContainer}
            data={props.places}
            renderItem={(info)=>(
            <ListItem
                placeName={info.item.name}
                placeImage ={info.item.image}
                onItemPressed ={()=> props.onItemSelected(info.item.key)}
            />

        ) }


        />

    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
});

export default placeList;