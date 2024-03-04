/* eslint-disable @typescript-eslint/no-explicit-any */

import styled from "styled-components";
import { FC, useEffect, useState } from "react";
import { getRegister } from "../../../redux/tools/RegisterSlise";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store/store";

const StyledHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: #d1cfcf;
	width: 100%;
	height: 90px;
`;

const StyledContent = styled.div`
	padding: 30px;
	display: flex;
	align-items: center;
	gap: 30px;
	margin-top: 10px;
`;

const StyledContentDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 300px;
`;

const StyledUl = styled.ul`
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const StyledLi = styled.li`
	margin: 0 10px;
	font-size: 15px;
	color: gray;
	font-weight: bold;
	cursor: pointer;
	text-decoration: none;
	border-radius: 5px;
	transition: background-color 0.3s;
	:hover {
		background-color: #d1cfcf;
	}
`;

const StyledRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

const StyledInput = styled.input`
	width: 250px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
`;

const StyledLogOutButton = styled.button`
	padding: 10px 20px;
	background-color: #007bff;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	&:hover {
		background-color: #0056b3;
	}
`;

const StyledImg = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
`;

const StyledLogo = styled.img`
	width: 90px;
	height: 40px;
`;

interface CreateRegisterType {
	_id?: number;
	email: string | number;
	login: string | number;
	password: number | string;
	img: string;
}

const Header: FC<CreateRegisterType> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userImg = useAppSelector((state) => state.register.data);
	const [profilePhoto, setProfilePhoto] = useState("");

	const userId = localStorage.getItem("isAuth");

	const userPhoto = () => {
		const userFind = userImg.find((item: any) => item._id === Number(userId));
		if (userFind) {
			setProfilePhoto(userFind.img);
		} else {
			console.log("error");
		}
	};

	useEffect(() => {
		userPhoto();
	}, [userImg]);

	useEffect(() => {
		dispatch(getRegister());
	}, [dispatch]);

	const ExitLogOut = () => {
		localStorage.removeItem("isAuth");
		navigate("/login");
	};

	return (
		<StyledHeader>
			<StyledContent>
				<StyledLogo
					src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/2560px-Trello_logo.svg.png"
					alt=""
				/>
				<StyledContentDiv>
					<div>
						<StyledUl>
							<StyledLi>
								<a href="#">Рабочие пространство</a>
							</StyledLi>
							<StyledLi>
								<a href="#">Недавние</a>
							</StyledLi>
							<StyledLi>
								<a href="#">Plans</a>
							</StyledLi>
							<StyledLi>
								<a href="#">В избранном</a>
							</StyledLi>
							<StyledLi>
								<a href="#">Шаблоны</a>
							</StyledLi>
							<StyledLi>
								<a href="#">Создать</a>
							</StyledLi>
						</StyledUl>
					</div>
					<StyledRight>
						<StyledInput type="text" placeholder="поиск" />
						<StyledLogOutButton onClick={ExitLogOut}>
							Log out
						</StyledLogOutButton>
						<div>
							{userId && profilePhoto ? (
								<StyledImg src={profilePhoto} alt="photo" />
							) : null}
						</div>
					</StyledRight>
				</StyledContentDiv>
			</StyledContent>
		</StyledHeader>
	);
};

export default Header;
