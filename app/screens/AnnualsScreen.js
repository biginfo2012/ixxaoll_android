import React from "react";
import { View, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { AppText, ListItem, AppScreen } from "app/components";
import { useAnnual } from "app/hooks";
import i18n from '../constants/i18n';

const fileUrl = 'https://www.soundczech.cz/temp/lorem-ipsum.pdf';

const AnnualsScreen = ({ navigation }) => {
  const { items, visible, downloadProgress, download } = useAnnual();
  // const [downloadProgress, setDownloadProgress] = useState();


  const downloadFile = async (title) =>{  
    Alert.alert(
      `${i18n.t('annual.download')}`,
      `${i18n.t('annual.downloadDescription')} ${title} ?`,
      [
        { text: `${i18n.t('annual.cancel')}`, onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: `${i18n.t('annual.download')}`, onPress: () => console.log("Download Pressed") },
      ],
      { cancelable: false }
    );
  }
  return (
    <AppScreen style={styles.container}>
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
              <AppText>{i18n.t('annual.downloading')}...</AppText>
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

export default AnnualsScreen;
