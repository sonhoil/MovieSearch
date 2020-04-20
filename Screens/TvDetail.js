import React,{Component} from 'react';
import axios from 'axios';
import {ImageBackground, StyleSheet, Text, View,Image, ScrollView,TouchableOpacity,Dimensions,Linking} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';




export default class TvDetail extends Component {
    constructor() {
        super();
      }
    state={
        isLoading: true,
        detail:[],
        genres:[],
        actor:[],
        trailerKey:[]
    }

   
      getitem = () => {
          const {item} = this.props.route.params;
          
          return(item)
      }

      
     getDetail = async() => {
        const TvDetail = await axios.get(`https://api.themoviedb.org/3/tv/${this.getitem().id}?api_key=054e81eb56d56dcc19b15dff8120f2e9&language=en-US`);
        const TvCredit = await axios.get(`https://api.themoviedb.org/3/tv/${this.getitem().id}/credits?api_key=054e81eb56d56dcc19b15dff8120f2e9`)
        const trailer = await axios.get(`https://api.themoviedb.org/3/tv/${this.getitem().id}/videos?api_key=054e81eb56d56dcc19b15dff8120f2e9&language=en-US`)
        const detail= TvDetail.data
        const genres = TvDetail.data.genres
        const actor = TvCredit.data.cast
        const trailerKey = trailer.data.results
        try{
            this.setState({detail, genres, actor,trailerKey})
              
            } catch(error) {
             console.log("Have some error")
            }
    }
    detailData = async () => {
        try {
          this.getDetail()
          this.setState({isLoading:false})
          console.log("ok")
        } catch (error) {
          Alert.alert("i can't") 
        } 
    }
    
     stop = () => {
     
     } 
   
        
    

    render() {
                const  Width = Dimensions.get('window').width
                const  Height = Dimensions.get('window').height
                const item = this.getitem()
                const {detail,actor, genres,isLoading,trailerKey} = this.state;
                (isLoading ? this.detailData() : this.stop())
                
                function Release(){
                    if(detail.first_air_date){
                        return (<View><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{"\n"}First Air</Text>
                                 <Text style={{color:'white'}}>{detail.first_air_date}</Text></View>)
                    }
                    
                    
                }
                function LastAir() {
                    if(detail.last_air_date){
                        return (<View><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{"\n"}Last Air</Text>
                                 <Text style={{color:'white'}}>{detail.last_air_date}</Text></View>)
                    }
                }
                function TotalEpisod(){
                    if(detail.number_of_episodes){
                        return (<View><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{"\n"}Total Episodes</Text>
                                 <Text style={{color:'white'}}>{detail.number_of_episodes}</Text></View>)
                    }
                    
                }
                function TotalSeason() {
                    
                    if(detail.number_of_seasons){
                        return (<View><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{"\n"}Total Seasons</Text>
                                 <Text style={{color:'white'}}>{detail.number_of_seasons}</Text></View>)
                    }
                }
               
                    
                
                function status(){
                    if(detail.status){
                        return (<View><Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>{"\n"}status</Text>
                                 <Text style={{color:'white'}}>{detail.status}</Text></View>)
                    }
                    
                }
               
                const genresF = () => {
                    return (genres.slice(0, 3).map((item) => 
                <Text style={{color:'white'}} numberOfLines={1}>{item.name}{"  "}</Text>
                   ))
                    }

                const actors = () => {
                    return (actor.slice(0, 3).map((item) => 
                <Text style={{color:'white'}} numberOfLines={1}>{item.name}{"  "}</Text>
                     ))
                     }
                function rating() {
                    return(<Text style={styles.ratingColumn}>{"\n"}
                          <FontAwesome name="star" size={13} color="yellow" />{"  "}{detail.vote_average}/10</Text>)
                        }           
                const openTrailer = () => {
                   if(trailerKey.type='tailer'){
                       console.log(trailerKey.type)
                      
                
                return(
               
                trailerKey.map((item)=><TouchableOpacity onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.key}`)} style={{color:'white'}}>
                                        <Text style={{color:'white'}}>{item.name.split('|')[0]}
                                        <FontAwesome name='youtube-play' color='white' /></Text>
                                       </TouchableOpacity>))
                }else if(trailerKey.type=!'tailer'){return(console.log(trailerKey.type))}
            }
               
      return ( <View style={{flex:1,backgroundColor:'black'}}>
          <ScrollView>
          <ImageBackground imageStyle={{resizeMode:'stretch', opacity:0.7}} style={{width:Width, height:Height/2.5, backgroundColor:'black'}} source={{uri: `http://image.tmdb.org/t/p/w500/${detail.backdrop_path}`}}>
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-end',justifyContent:'flex-start',padding:15}}>
          <Image key={item.id} style={{width:Width/2.7, height:Height/3.7, resizeMode:'stretch',borderRadius:5}} source={{uri:  `http://image.tmdb.org/t/p/w500/${detail.poster_path}`}}/>
          <View>
          <View style={{paddingLeft:20, width:Width/2}}>
          <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>{detail.original_name}</Text>
          </View>
          <View style={{flexDirection:'column', paddingLeft:20}}>
         
          {rating()}
          <View style={{flexDirection:'row',paddingBottom:10}}>
          {genresF()}
          </View>
          {actors()}
          </View>
          </View>
          </View>
          </ImageBackground>
          <View style={{padding:20}}>
          <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>overview</Text>
          <Text style={{color:'white'}}>{detail.overview}</Text>
          {Release()}
          {LastAir()}
          {TotalSeason()}
          {TotalEpisod()}
          {status()}
         <Text>{'\n'}</Text> 
          {openTrailer()}
          </View>
          </ScrollView>
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
 