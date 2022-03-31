import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
// import { normalize } from "react-native-responsive-fontsize";
import { normalize } from "../../Normalizer";
import * as theme from "../../components/Theme";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22,
        backgroundColor:'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        justifyContent:"space-evenly",
        alignContent:"center",
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius:70,
        borderTopLeftRadius:0,
        width:normalize(376),
        height:RFValue(200,735),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        alignSelf:"flex-end",
        marginRight:normalize(50),
        width: normalize(80),
        borderRadius: normalize(100),
        backgroundColor:"#D90000",
        height: normalize(30),
        alignItems: "center",
        justifyContent: "center",
        marginTop: normalize(40),
    },
    buttonOpen: {
        backgroundColor:"#D90000",
    },
    textStyle: {
        fontFamily:"OpenSansCondensedBold",
        color:"#FFFFFF",
        fontSize:normalize(14),
        textAlign: "center"
    },
})
export default styles;