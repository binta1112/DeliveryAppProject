import {View, Text, StyleSheet, Image} from 'react-native';

export default function WelcomeScreen() {

    return (
        <View style={styles.container}>
            <Image
             source={require('../../../assets/image_welcome_pg1.png')}             
             style={styles.image}
            />
        </View>
    )
    

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '80%',
        height: '30%',
    },
})