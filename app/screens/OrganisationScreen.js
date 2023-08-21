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

import {AppText, AppScreen, AppIcon, AppButton, AppSimplePicker} from "app/components";

import { defaultStyles } from "app/config";
import PROFILE from 'app/assets/user.png';
import {organizationApi} from "app/api";
import {useApi} from "app/hooks";

const { width } = Dimensions.get('window');
const previewCount = 2;
const itemWidth = width/(previewCount + .5);
const startScroll = (1 * 3/4);

const showItems = [
  {
    label: "Employee",
    key: "employee",
  },
  {
    label: "Position",
    key: "position",
  },
  {
    label: "Unit",
    key: "unit",
  }
]

const OrganisationScreen = ({ navigation }) => {
  const flatlistRef = useRef();
  const [newChart, setNewChart] = useState([]);
  const [prevChart, setPrevChart] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUserView, setCurrentUserView] = useState({});
  const [showKey, setShowKey] = useState('employee');
  const snapToOffsets = newChart.map((x, i) => {
    return ((i * (itemWidth) * previewCount) + startScroll)
  })
  const handleSelection = (item) => {
    console.log(item);
    setShowKey(item.key)
  };
  //To import apis for getting chart data
  const getActiveOrganizationalChartsThumbnails = useApi(organizationApi.getActiveOrganizationalChartsThumbnails);
  const getActiveOrganizationalChartByGUID = useApi(organizationApi.getActiveOrganizationalChartByGUID);
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
    loadGetActiveOrganizationalChartsThumbnails()
    setVisible(true);
  }

  const handleGoBack = () => {
    setNewChart(prevChart)
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
    loadGetActiveOrganizationalChartsThumbnails()
  }, [showKey])

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

  //load GetActiveOrganizationalChartsThumbnails
  const loadGetActiveOrganizationalChartsThumbnails = async () => {
    const response = await getActiveOrganizationalChartsThumbnails.request()
    if (response?.data && response?.status === 200) {
      let thumbnails  = response.data
      if(thumbnails != null){
        for(let i = 0; i < thumbnails.length; i++){
          if(thumbnails[i]['isDefault']){
            let inGuid = thumbnails[i]['guid']
            console.log(inGuid)
            const res = await getActiveOrganizationalChartByGUID.request(inGuid)
            if(res?.data){
              let chart = res.data.chart
              if(chart != null){
                if(chart.children != null){
                  let chartData = getChartData(chart.children[0])
                  let data = []
                  data.push(chartData)
                  setNewChart(data)
                }
              }
            }
          }
        }
      }
    }

  };

  //get chart data for recursion format
  const getChartData = (data) => {
    let result = {};
    result['id'] = data?.id
    result['reportingTo'] = data?.name
    result['position'] = data?.positions?.length ? data?.positions?.[0]?.name : null
    if(showKey == "employee"){
      result['name'] = data?.employees?.length ? data?.employees?.[0]?.name : null
    }
    else if(showKey == "position"){
      result['name'] = data?.positions?.length ? data?.positions?.[0]?.name : null
    }
    else{
      result['name'] = data?.name
    }
    result['image'] = data?.employees.length ? global.BASE_URL + data?.employees?.[0]?.photo : null
    result['positions'] = data?.positions?.length
    result['employeeCnt'] = data?.employees?.length
    result['color'] = data?.color
    result['employees'] = []
    if(data?.children){
      for(let i = 0; i < data.children.length; i++){
        result['employees'].push(getChartData(data.children[i]))
      }
    }
    return result
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.secondContent}>
        <TouchableOpacity key={index} onPress={() => onPressItem(item)}>
          <View style={styles.profileContainer}>
            {item.image ? ( <Image source={{uri: item.image}} style={styles.image} />)
                : ( <Image source={PROFILE} style={styles.image} />)}
            <View style={styles.lineBar} backgroundColor={item.color}></View>
          </View>
      </TouchableOpacity>
      <TouchableHighlight onPress={() => onPressUser(item)} underlayColor={defaultStyles.colors.veryLightGray}>
      <View style={{ alignItems: 'center'}}>
        <AppText style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{item.name}</AppText>
          <AppText style={styles.textPosition}>{item.position}</AppText>
          <View style={styles.userIconContainer}>
            <AppIcon icon="account" style={styles.userIcon} />
            <AppText style={styles.count}>{item.employeeCnt}</AppText>
            <AppIcon icon="format-list-bulleted-square" style={styles.userIcon} />
            <AppText style={styles.count}>{item.positions}</AppText>
            <AppIcon icon="file-tree" style={styles.userIcon} />
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
      <View style={styles.selectContainer}>
        <AppSimplePicker
            selectedItem={showItems.find((x) => x.key == showKey)?.label}
            onSelectItem={(item) => handleSelection(item)}
            items={showItems}
        />
      </View>
      <View style={styles.chartContainer}>
        {newChart.length > 0 ?
          newChart.map((item) => (
            <Animated.View style={[styles.contentContainer, {
               opacity: !visible ? 1 : fadeAnim
            }]}>
              <View style={styles.profileContainer}>
                <TouchableOpacity onPress={() => handleGoBack(item)}>
                  {item.image ? ( <Image source={{uri: item.image}} style={styles.image} />)
                  : ( <Image source={PROFILE} style={styles.image} />)}

                  <View style={styles.lineBar} backgroundColor={item.color}></View>
                </TouchableOpacity>
            <TouchableHighlight onPress={() => onPressUser(item)} underlayColor={defaultStyles.colors.veryLightGray}>
              <View style={{ alignItems: 'center' }}>
                <AppText style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{item.name}</AppText>
                <AppText style={styles.textPosition}>{item.position}</AppText>
                <View style={styles.userIconContainer}>
                  <AppIcon icon="account" style={styles.userIcon} />
                  <AppText style={styles.count}>{item.employeeCnt}</AppText>
                  <AppIcon icon="format-list-bulleted-square" style={styles.userIcon} />
                  <AppText style={styles.count}>{item.positions}</AppText>
                  <AppIcon icon="file-tree" style={styles.userIcon} />
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
    margin: 20,
    marginBottom: 0
  },
  selectContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 0,
    marginRight: 20,
    marginLeft: 20
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
    marginBottom: 5
  },
  bar:{
    width: 90,
    height: 5,
    backgroundColor: '#6ED4C8',
    borderRadius: 2,
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
    color : '#999',
    marginRight: 5
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
  },
  lineBar: {
    width: 90,
    height: 5,
    borderRadius: 2,
    marginBottom: 5
  }
});

export default OrganisationScreen;
