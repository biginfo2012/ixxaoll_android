import React, { useEffect, useState, useRef } from "react";
import i18n from '../constants/i18n';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  Modal
} from "react-native";

import { AppText, AppScreen, AppIcon, AppButton } from "app/components";

import { defaultStyles } from "app/config";
import PROFILE from '../assets/profile.jpeg';
import PROFILE1 from '../assets/profiles/profile1.jpg';
import PROFILE2 from '../assets/profiles/profile2.jpg';


const chart = [
  {
    id: 1,
    name: "Paul Baldacchino",
    image: PROFILE1,
    position: "CEO",
    employees: [
      {
        id: 1,
        name: "Raymart Zafra",
        image: PROFILE,
        position: "CFO",
        reportingTo: "CEO",
        employees: [
          {
            id: 1,
            name: "G Child",
            image: PROFILE1,
            position: "Dev",
            reportingTo: "CFO",
            employees: [
              {
                id: 1,
                name: "GG Child 1",
                image: PROFILE2,
                position: "Dev child",
                reportingTo: "Dev",
                employees: []
              }
            ]
          },
          {
            id: 2,
            name: "G Child2",
            image: PROFILE1,
            position: "Dev",
            reportingTo: "CFO",
            employees: []
          },
          {
            id: 3,
            name: "G Child3",
            image: PROFILE,
            position: "Dev",
            reportingTo: "CFO",
            employees: []
          },
          {
            id: 4,
            name: "G Child4",
            image: PROFILE2,
            position: "Dev",
            reportingTo: "CFO",
            employees: []
          }
        ]
      },
      {
        id: 2,
        name: "Luke Agius",
        image: PROFILE2,
        position: "COO",
        reportingTo: "CEO",
        employees: [
          {
            id: 1,
            name: "G Child",
            image: PROFILE1,
            position: "Dev",
            reportingTo: "COO",
            children: []
          }
        ]
      },
      {

        id: 3,
        name: "Mike Brown",
        image: PROFILE1,
        position: "CPO",
        reportingTo: "CEO",
        employees: []
      },
    ]
  }
]

const data = [...Array(24).keys()];


const { width } = Dimensions.get('window');
const previewCount = 2;
const itemWidth = width/(previewCount + .5);
const startScroll = (1 * 3/4);



const OrganisationScreen = ({ navigation }) => {
  const flatlistRef = useRef();
  const [newChart, setNewChart] = useState([]);
  const [prevChart, setPrevChart] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserView, setCurrentUserView] = useState({});
  const snapToOffsets = newChart.map((x, i) => {
    return ((i * (itemWidth) * previewCount) + startScroll)
  })

  const onPressItem = (item) => {
    let chart = [];
    chart.push(item);
    setNewChart((prevState => {
      setPrevChart(prevState);
    }));
    setNewChart(chart);
    setVisible(true);
  }

  const handleResetChart = () => {
    setNewChart(chart);
    setVisible(true);
  }

  const handleGoBack = () => {
    setNewChart(prevChart)
  //  newChart.map((item) => {
  //   console.log(item.reportingTo);
  //   if (item.reportingTo === "CEO") {
  //     setNewChart(chart);
  //   } else if (item.reportingTo === "CFO") {
  //     setNewChart(prevChart);
  //   } else if (item.reportingTo === "Dev") {
  //     setNewChart(prevChart)
  //   } else if (item.reportingTo === "COO") {
  //     setNewChart(prevChart);
  //   } else if (item.reportingTo === "CPO") {
  //     setNewChart(prevChart);
  //   }
  //  })
  }

  const onPressUser = (item) => {
    setCurrentUserView(item);
    setModalVisible(true);
  }

  const onPressCancel = () => {
    setCurrentUserView({});
    setModalVisible(false);
  }

  useEffect(() => {
    if (flatlistRef.current) flatlistRef.current.scrollToOffset({
        offset:startScroll, animated: false
    });
  }, [flatlistRef]);

  useEffect(() => {
    setNewChart(chart);
  }, [])

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
     });
    } else if (!visible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);


  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.secondContent}>
        <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
          <View style={styles.profileContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
      </TouchableOpacity>
      <TouchableHighlight onPress={() => onPressUser(item)} underlayColor={defaultStyles.colors.veryLightGray}>
      <View style={{ alignItems: 'center'}}>
        <AppText style={styles.text}>{item.name}</AppText>
          <AppText style={styles.textPosition}>{item.position}</AppText>
          <View style={styles.userIconContainer}>
            <AppIcon icon="account" style={styles.userIcon} />
            <AppText style={styles.count}>{item.employees && item.employees.length}</AppText>
          </View>
        </View>
      </TouchableHighlight>
      </View>
    )
  }
  return (
    <AppScreen style={styles.container}>
      <View style={styles.headerContainer}>
      <AppText style={defaultStyles.title}>{i18n.t('organisation.title')}</AppText>
        <TouchableOpacity onPress={handleResetChart}>
          <View style={styles.iconContainer}>
            <AppIcon icon="refresh" color="#fff" />
           <AppText style={styles.resetText}>{i18n.t('organisation.reset')}</AppText>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {newChart.length > 0 ?
          newChart.map((item) => (
            <Animated.View style={[styles.contentContainer, {
               opacity: !visible ? 1 : fadeAnim
            }]}>
              <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => handleGoBack(item)}>
                  <Image source={item.image} style={styles.image} />
                </TouchableOpacity>
            <TouchableHighlight onPress={() => onPressUser(item)} underlayColor={defaultStyles.colors.veryLightGray}>
              <View style={{ alignItems: 'center' }}>
                <AppText style={styles.text}>{item.name}</AppText>
                <AppText style={styles.textPosition}>{item.position}</AppText>
                <View style={styles.userIconContainer}>
                  <AppIcon icon="account" style={styles.userIcon} />
                  <AppText style={styles.count}>{item.employees && item.employees.length}</AppText>
                </View>
              </View>
              </TouchableHighlight>
              </View>
                <FlatList
                  ref={flatlistRef}
                  pagingEnabled={true}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  decelerationRate={0}
                  snapToOffsets={snapToOffsets}
                  snapToAlignment={"center"}
                  data={item.employees}
                  renderItem={renderItem}
                />
            </Animated.View>
          ))
        :  <AppText>{i18n.t('organisation.module_not_loaded')}</AppText>}
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {/* TODO: use AppModal */}
        <View style={styles.modalContainer}>
        <AppText style={styles.modalText}>{i18n.t('organisation.pofile_details')}</AppText>
          <View style={styles.modalContent}>
            <AppText style={styles.modalText}>{i18n.t('organisation.employee_name')}: </AppText>
            <AppText>{currentUserView.name}</AppText>
          </View>
          <View style={styles.modalContent}>
            <AppText style={styles.modalText}>{i18n.t('organisation.employee_position')}: </AppText>
            <AppText>{currentUserView.position}</AppText>
          </View>
          <View style={styles.closeIcon}>
           <AppButton title={i18n.t('profile.close')} onPress={onPressCancel} />
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.alternatePrimary,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 15,
    borderRadius: 10
  },
  resetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    textAlign: 'center'
  },
  secondContent: {
    marginTop: 80,
    width: itemWidth - 35, //20 is margin left and right
    margin: 10,
    height: 140,
    borderRadius: 10,
    justifyContent : 'center',
    alignItems : 'center',
    textAlign: 'center'
  },
  text : {
    fontSize : 14,
    fontWeight : 'bold',
    color : '#333',
  },
  textPosition: {
    fontSize : 14,
    fontWeight : 'bold',
    color : '#666',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10
  },
  userIconContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userIcon: {
    zIndex: 1,
    color : '#999',
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    color : '#999'
  },
  modalContainer: {
    height: "50%",
    marginTop: "auto",
    backgroundColor: defaultStyles.colors.light,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10
  },
  closeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default OrganisationScreen;
