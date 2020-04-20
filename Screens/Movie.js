import React from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, View,Image, ScrollView,TouchableOpacity,Dimensions, TouchableHighlight} from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import Carousel from 'react-native-banner-carousel';


const API_KEY = '054e81eb56d56dcc19b15dff8120f2e9';
const BASE_URL = `https://api.themoviedb.org/3`;
const  Width = Dimensions.get('window').width
const  Height = Dimensions.get('window').height


export default class Movie extends React.Component {
    state = {
        isLoading: true,
        movies:[],
        movie:[],
        rescent:[],
        page: 1, 
        refreshing: false
      };
      getMovie = async () => {
        const Popularmovies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        const movieList = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        const movieListRescent = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
        const movie = movieList.data.results
        const rescent= movieListRescent.data.results
        const movies = Popularmovies.data.results
        try{
        this.setState({
          isLoading: false, 
          movies, //: this.state.refreshing? data: this.state.movies.concat(movies) , 
          movie,
          rescent,
          page: this.state.page+1})
          
        } catch(error) {
         console.log("Have some error")
        }
        
        }
      _handleLoadMore = () => {
        this.getMovie(); 
        }
      _handleRefresh = () => {
            this.setState({
              refreshing: false,
              page: 1,
            }, this.getMovie());
          } 
      getMovieData = async () => {
        try {
          this.getMovie()
        } catch (error) {
          Alert.alert("i can't") 
        }
       
      };
      componentDidMount() {
        this.getMovieData();
      }

     

      
      
    render() {
        const {movies, movie, rescent} = this.state;
        
        const titlemap = () => {
            return (rescent.map((item) => 
            
           <TouchableHighlight  onPress={() => this.props.navigation.navigate('Detail',{item})}>
            <View key={item.id} style={{padding:15, flexDirection:'row', backgroundColor:'black'}}>
                <Image style={{width:Width/3, height:Height/4, resizeMode:'cover', borderRadius:10}}  source={{uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
            <View style={{paddingLeft:10}}>
            <Text style={{width:Width/1.8, fontSize:15, fontWeight:'bold', color:'white'}}  numberOfLines={1}>{item.original_title}</Text>
            <Text style={{fontSize:13, fontWeight:'900', color:'#7E7D7B'}}>{"\n"}{item.release_date}</Text>
            <Text style={{width:Width/1.8, fontWeight:'900', color:'#7E7D7B'}} numberOfLines={7}>{"\n"}{item.overview}</Text>
            </View>
            </View>
            </TouchableHighlight> 
           
           ))
            }
        const titlemap2 = () => {
              return (movie.map((item) => 
                  <TouchableHighlight  onPress={() => this.props.navigation.navigate('Detail',{item})}>
                   <View key={item.id} style={{alignItems:'center', justifyContent:'center', paddingLeft:10, paddingRight:10}}>
                    <Image style={{borderRadius:10,width:'100%', height:Height/4, resizeMode:'contain'}}  
                           source={{uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`}}/>
                    <Text style={{color:'white', width:100, paddingLeft:15}} numberOfLines={1}>{item.original_title}</Text>
                    <Text style={styles.ratingColumn}>{"\n"}
                      <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                   </View>
                   </TouchableHighlight>))
                }
             const Slider = () => {
                return  ( 
                         <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={Width}
                            showsPageIndicator={false}>
                            {movies.map((item) => 
                            <ImageBackground imageStyle={{resizeMode:'stretch', opacity:0.7}} style={{width:Width, height:Height/2.5, backgroundColor:'black'}}
                                             source={{uri: `http://image.tmdb.org/t/p/w500/${item.backdrop_path}`}}>
                                <View style={{flexDirection:'row',position:'relative',top:45,left:25}}>
                                <Image key={item.id} style={{width:Width/2.7, height:Height/3.7, resizeMode:'stretch',borderRadius:5}}
                                       source={{uri:  `http://image.tmdb.org/t/p/w500/${item.poster_path}`}} />
                                <View style={{paddingLeft:20}}>
                                <Text style={{color:'white', width:Width/2.2}} numberOfLines={2}>{item.original_title}</Text>
                                <Text style={styles.ratingColumn}>{"\n"}
                                <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                                <Text style={{width:Width/2, fontWeight:'900', color:'white'}} numberOfLines={7}>{"\n"}{item.overview}</Text>
                               <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail',{item})} style={{marginTop:10,backgroundColor:'#FF4000', width:80, height:35, borderRadius:5, alignItems:'center',justifyContent:'center'}}>
                                   <Text style={{color:'white', fontWeight:'bold', fontSize:12}}>View details</Text></TouchableOpacity>
                                </View>
                                </View>
                            </ImageBackground> )} 
                        </Carousel>)}    
            
                
      return ( 
        <View style={{flex:1}}>
        <View style={{flex:0.1, backgroundColor:'black'}}><Text style={styles.mainBar}>Movies</Text></View>
        <View style={{flex:1, backgroundColor:'black'}}> 
        <ScrollView>
        {Slider()}
        <View style={{flex:0.15, backgroundColor:'black', paddingLeft:10,paddingTop:25}}><Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Top rating</Text></View>
        <ScrollView horizontal={true} contentContainerStyle={{justifyContent: 'space-between'}}>{titlemap2()}</ScrollView>
        <View style={{flex:0.15, backgroundColor:'black', padding:10}}><Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Hot Movies</Text></View>
        {titlemap()}
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
    
 