import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
  half1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  half2: {
    flex: 3,
  },
  center: {
    alignItems: 'center'
  },
  half3: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 30,
  },
  buttonview: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: 'black',
    fontSize: 25,
  },
  textstyle: {
    fontSize: 25,
    textAlign: 'center',
  },
  textinput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10
  },
  textinputtitle: {
    fontSize: 20,
    marginBottom: 5
  },
   button: {
       padding: 6,
       position: 'relative',
       backgroundColor: '#4CAF50',
       borderRadius: 7,
       marginTop: 15,
       width: '70%',
   },
   button_orange: {
     backgroundColor: '#ffa500',
   },
   button_red: {
     backgroundColor: '#ff6961',
   },
   button_floating: {
     position: 'absolute',
     right: 20,
     bottom: 20,
     width: 50,
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 25
   },
   button_floating_orange: {
     position: 'absolute',
     right: 20,
     bottom: 20,
     width: 50,
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 25,
     backgroundColor: '#ffa500',
   },
   buttonLoadingText: {
     color: 'transparent'
   },
    
   buttonLoading: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     justifyContent: 'center',
     alignItems: 'center'
   },
    buttonLO: {
        height: 40,
        padding: 6,
        backgroundColor: 'orange',
        borderRadius: 7,
        marginTop: 15,
        width: '70%',
        marginLeft: 60,
    },
      TextStyle: {
       textAlign: 'center',
       fontWeight: 'bold',
       color: '#FFFFFF',
       fontSize: 20,
      },
      markerModal: {
        marginVertical: 30,
        marginHorizontal: 20,
        alignItems: 'center'
      },
      markerModalTitle: {
        fontSize: 30,
        marginBottom: 20
      },
     fullP: {
       flex: 1,
       flexDirection: 'column',
       borderWidth: 1,
       borderColor: 'black',
     },
     fullL: {
       flex: 1,
       flexDirection: 'column',
     },
       half3L: {
         flex: 1,
         justifyContent: 'center',
         textAlign: 'center',
         width: '34%',
         marginLeft: '32%',
       },
  stretch: {
    flex: 1,
    width: 150,
    height: 150,
//  resizeMode: 'stretch',
},
});
