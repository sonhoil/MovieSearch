import React from 'react';
import axios from 'axios';
import {StyleSheet, Text, View,Image, ScrollView,Dimensions, TouchableHighlight} from 'react-native'
import { FontAwesome} from '@expo/vector-icons';


const API_KEY = '054e81eb56d56dcc19b15dff8120f2e9';
const BASE_URL = `https://api.themoviedb.org/3`;



export default class Tv extends React.Component {
    state = {
        isLoading: true,
        tvAriringTo:[],
        tvAriringWe:[],
        tvTopRated:[],
        
        
      };
      getTv = async () => {
        const AiringTo = await axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`);
        const AiringWe = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`);
        const TopRated = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const tvAriringTo = AiringTo.data.results
        const tvAriringWe = AiringWe.data.results
        const tvTopRated = TopRated.data.results
        try{
        this.setState({
          isLoading: false, 
          tvAriringTo, //: this.state.refreshing? data: this.state.movies.concat(movies) , 
          tvAriringWe,
          tvTopRated,
          
          })
        
        } catch(error) {
         console.log("Have some error")
        }
        
        }

      
     
      getTvData = async () => {
        try {
          this.getTv()
          console.log("ok1")
          
        } catch (error) {
          Alert.alert("i can't") 
        }
       
      };
      componentDidMount() {
        this.getTvData();
      }
      
    render() {
        const {tvAriringTo, tvAriringWe, tvTopRated} = this.state;
        

          const AiringTos = () => {
             return (tvAriringTo.map((item) => 
                                     <TouchableHighlight  onPress={() => this.props.navigation.navigate('TvDetail',{item})}>
                                    <View key={item.id} style={{alignItems:'center', justifyContent:'center', paddingLeft:10, paddingRight:10}}><Image style={{borderRadius:10,width:'100%', height:Height/4, resizeMode:'contain'}}  source={{uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                                     <Text style={{color:'white', width:100, paddingLeft:15}} numberOfLines={1}>{item.original_name}</Text>
                                     <Text style={styles.ratingColumn}>{"\n"}
                                      <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                                     </View>
                                     </TouchableHighlight>))
          }


            const AiringWeeks = () => {
                return (tvAriringWe.map((item) => 
                                            <TouchableHighlight  onPress={() => this.props.navigation.navigate('TvDetail',{item})}>
                                           <View key={item.id} style={{alignItems:'center', justifyContent:'center', paddingLeft:10, paddingRight:10}}><Image style={{borderRadius:10,width:'100%', height:Height/4, resizeMode:'contain'}}  source={{uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                                           <Text style={{color:'white', width:100, paddingLeft:15}} numberOfLines={1}>{item.original_name}</Text>
                                           <Text style={styles.ratingColumn}>{"\n"}
                                            <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                                           </View>
                                           </TouchableHighlight>))
                }
              
            const TopRateds = () => {
            return (tvTopRated.map((item) => 
            <TouchableHighlight  onPress={() => this.props.navigation.navigate('TvDetail',{item})}>
            <View  key={item.id} style={{padding:15, flexDirection:'row', backgroundColor:'black'}}>
                <Image style={{width:Width/3, height:Height/4, resizeMode:'cover', borderRadius:10}}  source={{uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
            <View style={{paddingLeft:10}}>
            <Text style={{width:Width/1.8, fontSize:15, fontWeight:'bold', color:'white'}}  numberOfLines={1}>{item.original_name}</Text>
            <Text style={{fontSize:13, fontWeight:'900', color:'#7E7D7B'}}>{"\n"}{item.first_air_date}</Text>
            <Text style={{width:Width/1.8, fontWeight:'900', color:'#7E7D7B'}} numberOfLines={7}>{"\n"}{item.overview}</Text>
            </View>
            </View>
            </TouchableHighlight>))
            }
                const  Width = Dimensions.get('window').width
                const  Height = Dimensions.get('window').height
      return ( <View style={{flex:1}}>
        
        <View style={{flex:0.1, backgroundColor:'black'}}><Text style={styles.mainBar}>TV</Text></View>
     
        <View style={{flex:1, backgroundColor:'black'}}> 
        <ScrollView>
        <View style={{flex:0.15, backgroundColor:'black', paddingLeft:10,paddingTop:25}}><Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Airing Today</Text></View>
        <ScrollView horizontal={true} contentContainerStyle={{justifyContent: 'space-between'}}>{AiringTos()}</ScrollView>
        <View style={{flex:0.15, backgroundColor:'black', paddingLeft:10,paddingTop:25}}><Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Airing This Week</Text></View>
        <ScrollView horizontal={true} contentContainerStyle={{justifyContent: 'space-between'}}>{AiringWeeks()}</ScrollView>
        <View style={{flex:0.15, backgroundColor:'black', padding:10}}><Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Top Rated</Text></View>
        {TopRateds()}
        </ScrollView>
        
       </View>
        
        </View>
       
    );
    } 
}
 const styles = StyleSheet.create({
        mainBar: {
            backgroundColor: "black",
            fontSize: 25,
            fontWeight:"bold",
            padding: 10,
            color: 'white',
            flexDirection:'row'
        },
        mainBar2: {
            backgroundColor: "black",
            fontSize: 25,
            fontWeight:"bold",
            padding: 10,
            color: 'white',
            flexDirection:'row'
        },
        allColor: {
            
            backgroundColor:"black",
            color:"white",
            fontWeight:"bold",
            paddingLeft:10
            
        },
        setBottomButton: {
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: "#FFFFFF",
           
            
        },
        flatContainer: {
            flexDirection:'row',
            paddingTop:10
        },
        flatContainerColumn: {
            flexDirection:'column',
            paddingTop:10,
            paddingLeft:10,paddingRight:10,
            alignItems:'center'
        },
        title: {
         color: 'white',
         fontSize: 15,
         fontWeight: "bold",
         width:290
        },
        titleColumn: {
            color:'white',
            fontWeight:'bold',
            fontSize:15,
            width:120
        },
        ratingColumn: {
            color:'white',
            fontWeight:'bold',
            fontSize:10,
            
            
        },
        setCenter:{
            justifyContent:'center',
            alignItems:'center'
        },
        tinyLogo: {
            borderRadius: 10,
            width: 100,
            height: 180,
          }
       
      });
    
 