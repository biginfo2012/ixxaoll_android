import React, { useState, useEffect } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { companyBoardApi } from "app/api";
import { ListItem } from "app/components";

const CompanyBoards = ({ navigation, visible, boards }) => {
  const [companyBoards, setCompanyBoards] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const state = useNavigationState(state => state);

  const getCompanyBoardApi = useApi(companyBoardApi.getCompanyBoardsByEmployee);

  // const onRefresh = () => {
  //   setRefreshing(true);
  // loadCompanyBoards();
  // };

  const loadCompanyBoards = async () => {
    const response = await getCompanyBoardApi.request();

    // let data = [];
    // for (let i = 0; i < 10; i++) {
    //   data.push(response.data[0]);
    // }

    setCompanyBoards(response.data);
    // setRefreshing(false);
  };

  const onPressItem = (item) => {
    navigation.navigate("CompanyBoardDetails", { items: item });
  };

  useEffect(() => {
    if (boards?.length !== 0) {
      setCompanyBoards(boards);
      return;
    }
    loadCompanyBoards();
    return () => {}; //this handles unmounted component memory leak
  }, [boards]);

  const render = () => {
    if (visible) {
      return (
        <View style={styles.container}>
          {companyBoards &&
            companyBoards.map((item) => {
              return <ListItem image={item.image} title={item.title} description={item.message} onPress={() => onPressItem(item)} />;
            })}
        </View>
      );
    } else {
      return null;
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default CompanyBoards;
