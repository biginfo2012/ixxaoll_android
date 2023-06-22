import React from "react";
import { View, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { AppText, ListItem, AppScreen } from "app/components";
import { usePayStubs } from "app/hooks";
import i18n from '../constants/i18n';

const fileUrl = 'https://www.soundczech.cz/temp/lorem-ipsum.pdf';

const PayStubsScreen = ({ navigation }) => {
  const { items, visible, downloadProgress, download } = usePayStubs();
  // const [downloadProgress, setDownloadProgress] = useState();


  const downloadFile = async (title) =>{  
    Alert.alert(
      `${i18n.t('payStubs.download')}`,
      `${i18n.t('payStubs.downloadDescription')} ${title} ?`,
      [
        { text: `${i18n.t('payStubs.cancel')}`, onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: `${i18n.t('payStubs.download')}`, onPress: () => console.log("Download Pressed") },
      ],
      { cancelable: false }
    );
  }
  return (
    <AppScreen style={styles.container}>
      <View style={styles.detailsContainer}>
        <AppText><AppText style={styles.detailsText}>{i18n.t('payStubs.grossToDate')}: </AppText>8000.00</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('payStubs.taxesToDate')}: </AppText>1200.00</AppText>
        <AppText><AppText style={styles.detailsText}>{i18n.t('payStubs.socialSecurityToDate')}: </AppText>900.00</AppText>
      </View>
      <FlatList
          data={items}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
             <ListItem
              title={item.title}
              onPress={() => downloadFile(item.title)}
            />
          )}
        />
        <View style={styles.modalContainer}>
          <Modal visible={visible} transparent={true}>
            {/* TODO: use AppModal */}
            <View style={styles.modalContent}>
              <AppText>{i18n.t('payStubs.downloading')}...</AppText>
              <AppText>{downloadProgress} %</AppText>
            </View>
          </Modal>
        </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    margin: 10
  },
  detailsContainer: {
    marginVertical: 25,
    marginHorizontal: 15
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    top: '40%',
    height: '20%',
    backgroundColor: 'white',
  }
});

export default PayStubsScreen;
