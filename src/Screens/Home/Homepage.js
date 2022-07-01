import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList,Image , BackHandler, Alert,TouchableOpacity} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Homelist from './Feed/Homelist';
import HomeOfferlist from './Feed/HomeOfferlist';
import restaurantimg from '../../assets/icons/restaurant.png';
import SideMenuPage from '../Nav/SideMenuPage';

const Homepage = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const user_id = props.route.params.user_id;
    const user_name = props.route.params.user_name;
    console.log("username::", props)
    useEffect(() => {
        const backAction = () => {
          return true;
        };    
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
      }, []);
      
    const positionlist = [
        {name: 'Restaurants', count: '12', fav: '3', imgurl:restaurantimg, id:0},
        {name: 'Coffee', count: '13', fav: '4', imgurl:restaurantimg, id:1},
        {name: 'Bars', count: '14', fav: '5', imgurl:restaurantimg, id:2},
        {name: 'Hotels', count: '15', fav: '7', imgurl:restaurantimg, id:3},
        {name: 'Attractions', count: '16', fav: '9', imgurl:restaurantimg, id:4},
        {name: 'Parkings', count: '17', fav: '11', imgurl:restaurantimg, id:5},
    ];
    
    const positionlistItem = ({ item, index }) => (
        <Homelist
          key={item.id}
          item={item}
          index={index}
        />
    );
    
    const positionofferlistItem = ({ item, index }) => (
        <HomeOfferlist
          key={item.id}
          item={item}
          index={index}
        />
    );

    const onHamburgerClick=()=>{
        console.log("hamb")
        setIsOpen(true)
    }

    return (
        <SideMenu
            menu={<SideMenuPage/>}
            isOpen={isOpen}
            onChange={is_Open => setIsOpen(is_Open)}
        >
            <View style={styles.contain} >
                <View style={styles.topbar}>
                    <TouchableOpacity onPress={()=>onHamburgerClick()}>
                        <Icon name='menu' size={30} color="#000"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Dashboard</Text>
                    <View></View>
                </View>

                <View style={styles.toparea}>
                    <Image style={styles.logo} source={restaurantimg}/>
                    <View style={styles.nameare}>
                        <Text>Welcome,</Text>
                        <Text>{user_name}</Text>
                    </View>
                </View>

                <View style={styles.mainpage}>
                    <Text style={styles.listTitle}> Product List</Text>
                    <FlatList
                        data={positionlist}
                        renderItem={positionlistItem}
                        keyExtractor={(item) =>item.id}
                    />
                </View>
                <View style={styles.offerarea}>
                    <Text style={styles.listTitle}> Offers List</Text>
                    <FlatList
                        data={positionlist}
                        renderItem={positionofferlistItem}
                        keyExtractor={(item) =>item.id}
                        horizontal={true}
                    />
                </View>
            </View>
        </SideMenu>
        
    );
};

const styles = StyleSheet.create({
    contain:{
        flex: 1,
        backgroundColor:"#fff"
    },
    topbar: {
        height:40,        
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10,
        marginTop:15
    },
    toparea:{
        flexDirection:'row',
        height:60, 
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 10
    },
    nameare:{
        marginLeft:15,
        justifyContent: 'center',
    },
    title:{
        flex:1,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    favorite:{
        fontSize: 15,
        color:'#2459A8'
    },
    mainpage: {
        flex: 1,
        marginTop: 20,
    },
    logo:{
        height:50,
        width:50,
    },
    offerarea:{
        height: 200
    },
    listTitle:{
        margin:10,
        fontSize:20,
        fontWeight:'bold'
    }
});

export default Homepage;