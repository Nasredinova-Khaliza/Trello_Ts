import { Route, Routes } from "react-router-dom";

import UserHomePage from "../pages/UserHomePage";
import LoginPage from "../pages/LoginPage";

import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";

const Layout = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={
						<LoginPage _id={0} email={""} login={""} password={""} img={""} />
					}
				/>
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/user" element={<UserHomePage />} />
			</Routes>
		</div>
	);
};

export default Layout;
