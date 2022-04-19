import React ,{ useEffect, useRef, useState }from 'react';
import {View,Dimensions,Text,TouchableHighlight,FlatList,ActivityIndicator,TouchableOpacity,Image,Modal,TextInput,ScrollView} from "react-native";
import { normalize } from '../../Normalizer';
import styles from './styles';

const Alert=({message,setAlert})=>{
    const [showReqForm,setShowReqForm]=useState(true);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showReqForm}
        onRequestClose={() => {
          setShowReqForm(!showReqForm);
        }}
      >
        <ScrollView contentContainerStyle={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{ alignSelf: "flex-start", marginLeft: normalize(20) }}
            >
              <Text
                style={{
                  fontFamily: "OpenSansCondensedBold",
                  fontSize: normalize(18),
                  color: "#FFFFFF",
                }}
              >
                {"ALERT:"}
              </Text>
            </View>
            <View
              style={{ alignSelf: "flex-start", marginLeft: normalize(20) }}
            >
              <Text
                style={{
                  fontFamily: "OpenSansCondensedLight",
                  fontSize: normalize(18),
                  color: "#FFFFFF",
                }}
              >
                {message}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setAlert();
                setShowReqForm(!setShowReqForm);
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    );
}
export default Alert