import {View, Text, StyleSheet, Image} from 'react-native';

export default function WelcomeScreen2() {

    return (
        <View style={styles.container}>
            <View style={styles.leftside}>                         
            </View>
            <View style={styles.rightside}>
            </View>
            
        </View>
    )
    

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fcb65aff',
    },
   leftside:{
   //backgroundColor: '#FFBF6D',
    flex: 1,
    
   },
    rightside:{
    backgroundColor: '#FFBF6D',
    borderBlockColor: '#000000',   
    borderRadius: '100%',
    position: 'absolute',
    width: 800,
    height: 800,
    top: 20,
    left: 180,
    },
})