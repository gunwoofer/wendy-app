import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { StackScreenProps } from "@react-navigation/stack";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { EXPO_PUBLIC_SERVER_IP } from "@env";
import { UserModel } from "../../models/user";

const auth = getAuth();
const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    error: "",
  });

  async function signUp() {
    if (
      value.email === "" ||
      value.password === "" ||
      value.firstName === "" ||
      value.lastName === ""
    ) {
      setValue({
        ...value,
        error: "Every fields are mandatory.",
      });
      return;
    }

    try {
      console.log("1");
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      const user = auth.currentUser;
      console.log("2");

      if (user) {
        console.log("3");
        await updateProfile(user, {
          displayName: `${value.firstName} ${value.lastName}`,
        });
        console.log("4");
        const response = await fetch(EXPO_PUBLIC_SERVER_IP + "/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            first_name: value.firstName,
            second_name: value.lastName,
            email: value.email,
          }),
        });
        console.log("5");
        console.log(await response.json());
      }
      navigation.navigate("Sign In");
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <View style={styles.container}>
      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.controls}>
        <Input
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon name="envelope" size={16} />}
        />

        <Input
          placeholder="First Name"
          value={value.firstName}
          onChangeText={(text) => setValue({ ...value, firstName: text })}
          leftIcon={<Icon name="user" size={16} />}
        />

        <Input
          placeholder="Last Name"
          value={value.lastName}
          onChangeText={(text) => setValue({ ...value, lastName: text })}
          leftIcon={<Icon name="user" size={16} />}
        />

        <Input
          placeholder="Password"
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon name="key" size={16} />}
        />

        <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  controls: {
    flex: 1,
    width: "50%",
  },

  control: {
    marginTop: 10,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
});

export default SignUpScreen;
