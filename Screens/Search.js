import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,Image, ScrollView,Dimensions,TextInput,TouchableHighlight} from 'react-native'
import { FontAwesome} from '@expo/vector-icons';



const API_KEY = '054e81eb56d56dcc19b15dff8120f2e9';
const BASE_URL = `https://api.themoviedb.org/3`;




export default class Search extends React.Component {
    state = {
      text:'',
      movie:[],
      Tv:[]
    }
    handleText = text => {
      this.setState({text:text})
    }
    getData = async (text) => {
     const searchResult = text.nativeEvent.text

     const movieSearch =await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${searchResult}`)
     const tvSearch =await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${searchResult}`)
    
     const movie = movieSearch.data.results
     const Tv = tvSearch.data.results
    
     try{
      this.setState({
        movie,
        Tv
      })
        
      } catch(error) {
       console.log("Have some error")
      }

    }
   imgaeCheck = (item) => {
      if(item === null){
        
        item = `https://eustonclub.com.au/wp-content/plugins/slider/images/noimage.png`
       
      }else{
        item = `http://image.tmdb.org/t/p/w500/${item}`
      }
      
      return(item)
     
    }
    render() {
      
                const  Width = Dimensions.get('window').width
                const  Height = Dimensions.get('window').height
               const {text} = this.state

               const movieScroll = () => {
                 const {movie} = this.state
                
                 return (
                   movie.map((item)=>
                   <TouchableHighlight  onPress={() => this.props.navigation.navigate('Detail',{item})}>
                    <View key={item.id} style={{alignItems:'center', justifyContent:'center', paddingLeft:10, paddingRight:10}}>
                   
                    <Image style={{borderRadius:10,width:'100%', height:Height/4, resizeMode:'contain'}}  
                    
                    source={{uri:this.imgaeCheck(item.poster_path)}}/>
                    <Text style={{color:'white', width:100, paddingLeft:15}} numberOfLines={1}>{item.original_title}</Text>
                    <Text style={styles.ratingColumn}>{"\n"}
                     <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                    </View>
                    </TouchableHighlight>
                   )
                   
                   )
               }
               const TvScroll = () => {
                const {Tv} = this.state
               
                return (
                  Tv.map((item)=>
                  <TouchableHighlight  onPress={() => this.props.navigation.navigate('TvDetail',{item})}>
                   <View key={item.id} style={{alignItems:'center', justifyContent:'center', paddingLeft:10, paddingRight:10}}>
                  <Image style={{borderRadius:10,width:'100%', height:Height/4, resizeMode:'contain'}}  source={{uri:this.imgaeCheck(item.poster_path)}}/>
                   <Text style={{color:'white', width:100, paddingLeft:15}} numberOfLines={1}>{item.original_name}</Text>
                   <Text style={styles.ratingColumn}>{"\n"}
                    <FontAwesome name="star" size={13} color="yellow" />{"  "}{item.vote_average}/10</Text>
                   </View>
                  </TouchableHighlight>
                  )
                  
                  )
              }

      return (<View style={{flex:1, backgroundColor:'black'}}>
        
              <TextInput
      ref= {(el) => { this.text = el; }}
      style={{ flex:0.1,width:Width, borderWidth: 3,borderColor: '#B9B5B5',color:'#B9B5B5', fontSize:25, fontWeight:'bold', paddingLeft:10,position:'relative',top:20}}
      onChangeText = {text => this.handleText(text)}
      value={text}
      maxLength={24}
      placeholder="search..."
      blurOnSubmit={true}
      onSubmitEditing={this.getData}
    />
    <View style={{flex:0.5, top:20}}>
      <Text style={{color:'white'}}>movies</Text>
      <View style={{flex:1,backgroundColor:'black'}}>
      <ScrollView horizontal={true} contentContainerStyle={{justifyContent: 'space-between'}}>
             {movieScroll()}
             
      </ScrollView>
      </View>
    </View>
    <View style={{flex:0.5,top:20}}>
    <Text style={{color:'white'}}>TV</Text>
    <View style={{flex:1,backgroundColor:'black'}}>
      <ScrollView horizontal={true} contentContainerStyle={{justifyContent: 'space-between'}}>
      {TvScroll()}
      </ScrollView>
    </View>
    </View>
              </View>);
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
    
 