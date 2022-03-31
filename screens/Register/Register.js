import React, { useState } from 'react';
import {View,Image,TextInput,Text,TouchableOpacity,ActivityIndicator,Dimensions,ScrollView,SafeAreaView} from 'react-native';
const { width, height } = Dimensions.get('window');
import { FlatList } from 'react-native-gesture-handler';
import styles from './styles';
import { normalize } from '../../Normalizer';
import axios from "axios";
import { RFValue } from 'react-native-responsive-fontsize';
import * as theme from "../../components/Theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../components/Alert/Alert';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Register_Translation from './Register_Translation';
// import { checkVAT, countries } from 'jsvat';

const Register = ({navigation,route}) => {
    const [open,setOpen]=useState(false);
    const [userType,setUserType]=useState("User type");
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [vat, setVat] = useState('0');
    const [vatCheck, setVatCheck] = useState(false);
    const [password, setPassword] = useState('');
    const [alert,setAlert]=useState(false);
    const [alertMessage,setAlertMessage]=useState("");
    const [loading,setLoading]=useState(false);
    const [radixId,setRadixId]=useState('0');
    const [radixPwd,setRadixPwd]=useState('0');
    const register=()=>{
        var form = new FormData();
        var user="0";
        
        var condition=false
        if(user=="0"){
            condition=name!='' && lastName!='' && address!='' && phonenumber!='' && email!='' && password!='';
        }
        console.log(condition);
        if(condition){
            form.append('username', `${email.toLowerCase()}`);
            form.append('password', `${password}`);
            form.append('first_name', `${name}`);
            form.append('last_name', `${lastName}`);
            form.append('email', `${email.toLowerCase()}`);
            form.append('address', `${address}`);
            form.append('phone_no', `${phonenumber}`);
            fetch('http://192.168.137.44:8000/auth/register/', {
                method: 'POST',
                body:form,
                })
                .then(r =>  r.json()
                .then(data => {
                    console.log(data);
                    if(data.token){
                        console.log(data.token);
                        setLoading(false);
                        // AsyncStorage.setItem('token',JSON.stringify(data.token));
                        // AsyncStorage.setItem('userRole',JSON.stringify(""));
                        navigation.navigate("Login");
                    }
                    else if(data.email){
                        setLoading(false);
                        setAlert(true);
                        setAlertMessage(data["email"][0]);
                    }
                    else{
                        setLoading(false);
                        setAlert(true);
                        setAlertMessage("One or more field is invalid");
                    }
                }))
                .catch(function (error) {
                    setLoading(false);
                    console.log(error,"register");
                    setAlert(true);
                    setAlertMessage("User Already exist with this email!");
                })
        }
        else{
            setLoading(false);
            setAlert(true);
            setAlertMessage("One or more fields are invalid");
        }

   }
   const alerting=()=>{
        setAlert(false);
        setAlertMessage("");
   }
   function LoadingIndicatorView() {
    // return <ActivityIndicator
    //           color={theme.red}
    //           size="large"
    //           style={styles.activityIndicatorStyle}
    //         />
        return(
            <View style={styles.activityIndicatorStyle}>
                <Image
                    style={{width: normalize(414), height:normalize(736)}}
                    source={require("../../assets/loading.gif")} />
            </View>)
}

   
if(loading){
    return LoadingIndicatorView();
}
else return (

        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center"}}>
            {alert?<Alert message={alertMessage} setAlert={alerting}/>:null}
            <View style={styles.circle}>
                <Image style={styles.avatar} source={require("../../assets/myamonn-icons/USER.png")} />
            </View>
            <View style={styles.body}>
            <View style={{alignItems:"center"}}>
                <View style={styles.logoView}>
                    <Text  style={styles.logo}>SMART PROPERTY</Text>
                </View>
            
                <View style={styles.regForm}>
                    <View style={styles.twoInputView}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Name"}
                                placeholderTextColor={theme.red}
                                onChangeText={(name) => setName(name)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Last Name"}
                                placeholderTextColor={theme.red}
                                onChangeText={(lastname) => setLastName(lastname)}
                            />
                        </View>
                    </View>
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder={"Address"}
                            placeholderTextColor={theme.red}
                            onChangeText={(address) => setAddress(address)}
                        />
                    </View>
                    <View style={styles.twoInputView}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Phone No"}
                                placeholderTextColor={theme.red}
                                onChangeText={(phonenumber) => setphonenumber(phonenumber)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder={"Email"}
                                placeholderTextColor={theme.red}
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>
                    </View>
                    <View style={[styles.inputView,{width:normalize(338),alignSelf:"center"}]}>
                        <TextInput
                            style={styles.TextInput}
                            secureTextEntry={true}
                            placeholder={"Password"}
                            placeholderTextColor={theme.red}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                        <View style={styles.twoInputView}>
                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>

                                
                            </View>
                        </View>
                </View>
            
            </View>
            <TouchableOpacity style={styles.loginBtn}
                onPress={()=>{
                    setLoading(true);
                    register();
                }}
                >
                <Text style={styles.loginText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
        
        </ScrollView>
       
  
    
  );
};

export default Register;

