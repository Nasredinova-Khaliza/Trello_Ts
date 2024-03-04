import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import { getRegister } from "../../redux/tools/RegisterSlise";

const StyledDivContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
	margin: 0;
	background-image: url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/trello-right.3ee60d6f.svg"),
		url("https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/trello-left.4f52d13c.svg");

	background-size: 368px, 368px;
	background-position: right bottom, left bottom;
	background-repeat: no-repeat;
`;
const StyledContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgb(255, 255, 255);
	box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px;
	box-sizing: border-box;
	width: 400px;
	height: auto;
	padding: 32px 40px;
	border-radius: 3px;
	margin: 0 auto;
	gap: 10px;
`;

const StyledButton = styled.button`
	width: 300px;
	height: 40px;
	margin: 10px;
	padding: 10px;
	border: 1px solid #000;
	border-radius: 5px;
	background-color: #fff;
	font-size: 15px;
	font-weight: bold;
	background-color: #3b64e1;
	color: #fff;
	cursor: pointer;

	&:hover {
		background-color: #5a7ce2;
	}
`;

const StyledImg = styled.img`
	width: 100px;
	height: 30px;
`;
const StyledP = styled.p`
	font-size: 15px;
	font-weight: bold;
`;

const StyledInput = styled.input`
	width: 300px;
	height: 40px;
	margin: 10px;
	padding: 10px;
	border: 1px solid #000;
	border-radius: 5px;
	color: #000;
	background-color: #fff;
	font-size: 20px;
`;

const StyledButtons = styled.button`
	width: 300px;
	height: 50px;
	box-shadow: none;
	font-weight: bold;
	border: 1px solid rgb(193, 199, 208);
	border-radius: 3px;
	color: rgb(23, 43, 77);
	height: 40px !important;
	line-height: 40px !important;
	background: rgb(255, 255, 255);
	&:hover {
		background-color: #f2f0f0;
	}
`;

const StyledButtonsP = styled.p`
	color: rgb(94, 108, 132);
	content: attr(data-i18n-continue);
	display: block;
	font-size: 14px;
	line-height: 16px;
	margin-bottom: 16px;
	font-weight: 600;
	text-align: center;
`;

const StyledButtonsImg = styled.img`
	height: 24px;
	width: 24px;
	margin-right: 20px;
	vertical-align: middle;
`;

interface CreateRegisterType {
	_id: number;
	email: string | number;
	login: string | number;
	password: number | string;
	img: string;
}

const LoginPage: FC<CreateRegisterType> = () => {
	const dispatch = useAppDispatch();
	const newUserReg = useAppSelector((state) => state.register.data);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const getUser = () => {
		const finder = newUserReg.find(
			(item) => item.email === email && item.password === password
		);
		if (finder) {
			localStorage.setItem("isAuth", "" + finder._id);
			navigate("/user");
		} else {
			alert("User not found or password incorrect");
		}
	};

	useEffect(() => {
		dispatch(getRegister());
	}, []);

	const toRegister = () => {
		navigate("/registration");
	};

	return (
		<StyledDivContainer>
			<StyledContentDiv>
				<StyledImg
					src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/2560px-Trello_logo.svg.png"
					alt=""
				/>
				<StyledP>Войдите, чтобы продолжить</StyledP>
				<StyledInput
					id="outlined-basic"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="email"
				/>
				<StyledInput
					id="outlined-basic"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="password"
				/>
				<StyledButton onClick={getUser}>Войти</StyledButton>
				<StyledButtonsP>Или продолжить с помощью</StyledButtonsP>
				<StyledButtons>
					<StyledButtonsImg
						src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/google-logo.5867462c.svg"
						alt=""></StyledButtonsImg>
					Google
				</StyledButtons>
				<StyledButtons>
					<StyledButtonsImg
						src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/microsoft-logo.c73d8dca.svg"
						alt=""></StyledButtonsImg>
					Microsoft
				</StyledButtons>
				<StyledButtons>
					<StyledButtonsImg
						src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/apple-logo.54e0d711.svg"
						alt=""></StyledButtonsImg>
					Apple
				</StyledButtons>
				<StyledButtons>
					<StyledButtonsImg
						src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.549/slack-logo.5d730c10.svg"
						alt=""></StyledButtonsImg>
					Slack
				</StyledButtons>
				<p>Не удается войти в систему?</p>
				<StyledButton onClick={toRegister}>Зарегистрируйтесь</StyledButton>
			</StyledContentDiv>
		</StyledDivContainer>
	);
};

export default LoginPage;
