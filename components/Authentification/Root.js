import React, { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Login from "./Login.js";
import axios from "axios";
// import jwtDecode from "jwt-decode";
import Homepage from "../../screens/HomeScreen";
import AuthToken from "../AuthToken";
import { api } from "../../api/api.js";

export const errorMessage = createContext();

const Root = ({ navigation }) => {
	const [error, seterror] = useState("");
	const [user, setuser] = useState("");



	//login
	const submitted_form = async (data) => {
		const datas = JSON.stringify({
			mail_magasinier: data.mail_magasinier,
			mdp_magasinier: data.mdp_magasinier,
		});
		axios
			.post(api+'magasinier/signin', datas, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
			})
			.then((response) => {
				// const user_id = jwtDecode(response.data);
				const user_id= response.data
				setuser(user_id._id);
				AuthToken.store_token(user_id._id);
				console.log(response)
			})
			.catch((error) => {
				seterror(error.response.data);
			});
	};

	//getting auth tokens of logged user

	const getToken = async () => {
		const token = await AuthToken.get_token();
		if (!token) return null;
		else return setuser(token);
	};

	useEffect(() => {
		getToken();
	}, []);

	const logout = () => {
		setuser("");
		AuthToken.delete_token();
	};
	return (
		<>
			<errorMessage.Provider value={error}>
				{user ? (
					<Homepage logout={logout} />
				) : (
					<Login
						submit_fields={(data) => submitted_form(data)}
						errorMessage={errorMessage}
					/>
				)}
			</errorMessage.Provider>
		</>
	);
};

const styles = StyleSheet.create({});

export default Root;
