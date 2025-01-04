import { EXPO_PUBLIC_SERVER_IP } from "@env";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { UserModel } from "../../models/user";
import { Weekend } from "../../models/weekend";
import { User } from "firebase/auth";
import { useAuthentication } from "../../utils/hooks/useAuthentification";

const UserCard = (props: { user: UserModel; weekend: Weekend }) => {
  // const {user} = useAuthentication();
  const [checked, setChecked] = useState(props.user.is_present);

  const update_is_present = async (user: UserModel, weekend: Weekend) => {
    const response = await fetch(
      `${EXPO_PUBLIC_SERVER_IP}/updateWeekendPresence/${weekend.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          is_present: !checked,
        }),
      }
    );
    user.is_present = !user.is_present;
    setChecked(!checked);
  };

  return (
    <BouncyCheckbox
      // disabled={props.weekend.creator != props.user.id}
      text={props.user.first_name + " " + props.user.second_name}
      isChecked={checked}
      onPress={(isChecked: boolean) =>
        update_is_present(props.user, props.weekend)
      }
      style={styles.card}
      textStyle={
        checked
          ? { textDecorationLine: "none" }
          : { textDecorationLine: "line-through" }
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserCard;
