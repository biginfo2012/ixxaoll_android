import { useEffect, useState } from "react";
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'; 
import * as Permissions from 'expo-permissions';
import authStorage from "../auth/storage";
import * as Sentry from 'sentry-expo';


export default useAdvancements = () => {
  const advancements = [
    {
      id: 1,
      title: "Adv #1",
    },
    {
      id: 2,
      title: "Adv #2",
    },
    {
      id: 3,
      title: "Adv #3",
    },
    {
        id: 4,
        title: "Adv #4",
    },
    {
        id: 5,
        title: "Adv #5",
    },
]
  const [downloadProgress, setDownloadProgress] = useState();
  const [items, setItems] = useState([]);
  const [visible, setModalVisible] = useState(false);



  const downloadCallback = downloadProgress => {
    const progress = downloadProgress.totalBytesWritten / 1000;
    setDownloadProgress(progress.toFixed(0));
  };

  const download = async (url) => {
    let path = url.split('/');
    setModalVisible(true);
    const file_name = path[path.length-1];
     FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + file_name,
    ).then(async ({ uri }) => {
        const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (perm.status != 'granted') {
          return;
        }
        const downloadResumable = FileSystem.createDownloadResumable(
          url,
          FileSystem.documentDirectory + file_name,
          {},
          downloadCallback
        );
        try {
          const { uri } = await downloadResumable.downloadAsync();
          const asset = await MediaLibrary.createAssetAsync(uri);
          const album = await MediaLibrary.getAlbumAsync('Download');
          if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
          } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            setModalVisible(false);
            setDownloadProgress(0);
            Alert.alert('Success', 'file is in your download folder on your device')
          }
        } catch (e) {
          console.log('download error', e);
          Sentry.Native.captureException(e);
          Alert.alert('Error', e.toString());
        }
      })
      .catch(error => {
        Sentry.Native.captureException(error);
        console.error(error);
      });
  }

  useEffect(() => {
    setItems(advancements);

    return () => {}; //this handles unmounted component memory leak
  }, []);

  return { items, visible, downloadProgress, download };
};
