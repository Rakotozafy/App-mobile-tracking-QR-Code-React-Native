import React, { useContext, useState } from "react";
import { StyleSheet, Pressable, View ,Text, TouchableOpacity,TextInput,} from "react-native";
import { errorMessage } from "./Root";

const Login = ({ submit_fields }) => {
	const error_Message = useContext(errorMessage);

	const [input, setinput] = useState({
		mail_magasinier: "",
		mdp_magasinier: "",
	});

	const submit_event = () => {
		submit_fields(input);
	};

	return (
		<>
			<View>
				<TextInput
					label="email"
					value={input.mail_magasinier}
					onChangeText={(text) => setinput({ ...input, mail_magasinier: text })}
					name="mail_magasinier"
					errorMessage={error_Message ? error_Message : null}
				/>

				<TextInput
					label="password"
					value={input.mdp_magasinier}
					onChangeText={(text) => setinput({ ...input, mdp_magasinier: text })}
					name="mdp_magasinier"
				/>

				<TouchableOpacity
					title="Logn-in"
					onPress={submit_event}
				> 
                <Text> Connexion</Text>
                
                </TouchableOpacity>
			
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	button_input: {},

	signin_link: {
		fontSize: 15,
		margin: 10,
	},
	signinLink_container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
});
export default Login;
