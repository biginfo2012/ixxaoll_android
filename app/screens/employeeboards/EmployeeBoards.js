import React, { useState, useEffect } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";

import { employeeBoardApi } from "app/api";
import { ListItem } from "app/components";

const EmployeeBoards = ({ navigation, visible, boards }) => {
  const [employeeBoards, setEmployeeBoards] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const state = useNavigationState(state => state);

  // TODO: change the api to employee board if endpoint is available for now im using company board
  const getEmployeeBoardAPI = useApi(employeeBoardApi.getEmployeeBoardsByEmployee);
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   loadEmployeeBoards();
  // };

  const loadEmployeeBoards = async () => {
    const response = await getEmployeeBoardAPI.request();
    setEmployeeBoards(response.data);
    // setRefreshing(false);
  };

  const onPressItem = (item) => {
    navigation.navigate("EmployeeBoardDetails", { items: item });
  };

  useEffect(() => {
    if (boards?.length !== 0) {
      setEmployeeBoards(boards);
      return;
    }
    loadEmployeeBoards();
    return () => {};
  }, []);

  const render = () => {
    if (visible) {
      return (
        <View style={styles.container}>
          {employeeBoards &&
            employeeBoards.map((item) => {
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

export default EmployeeBoards;
