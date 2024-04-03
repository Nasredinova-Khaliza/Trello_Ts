import { Link } from "react-router-dom";
import styled from "styled-components";
// import img from "../../assets/img.webp";

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	background-color: white !important;
	width: 100%;
	height: 90px;
`;

const StyledImgLogo = styled.img`
	width: 200px;
	height: 50px;
`;
const StyledHeaderUl = styled.ul`
	display: flex;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const StyledHeaderLi = styled.li`
	margin: 0 10px;
	padding: 10px;
	font-size: 20px;
	font-weight: bold;
	color: #000;
	cursor: pointer;
	text-decoration: none;
	border-radius: 5px;
	transition: 0.3s;
	:hover {
		background-color: #d1cfcf;
	}
`;

const StyledHeaderLii = styled.li`
	width: 200px;
	height: 50px;
	margin: 0 10px;
	padding: 10px;
	font-size: 20px;
	font-weight: bold;
	color: white !important;
	cursor: pointer;
	text-decoration: none;
	background-color: #006aff;
	border-radius: 5px;
	transition: 0.3s;
`;

const Styledcontent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	gap: 30px;
	margin-top: 10px;
`;

const StyledContentDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3em;
	background: rgb(2, 0, 36);
	background: linear-gradient(
		90deg,
		rgba(2, 0, 36, 1) 0%,
		rgba(50, 9, 121, 0.8693977591036415) 0%,
		rgba(213, 0, 255, 0.8105742296918768) 88%
	);
	height: 100vh;
`;

const StyledImg = styled.img`
	width: 700px;
	height: 600px;
`;

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1em;
	font-size: 1.5rem;
	font-weight: 600;
	text-align: center;
	border-radius: 10px;
	margin-top: -100px;
`;

const StyledLinkContainer = styled.div`
	display: flex;
	gap: 1em;
	justify-content: center;
	align-items: center;
`;

const StyledLink = styled(Link)`
	width: 600px;
	height: 50px;
	text-decoration: none;
	color: white;
	font-size: 20px;
	font-weight: bold;
	border-radius: 5px;
	background-color: #2a4dda;
	padding: 10px;
	&:hover {
		background-color: #4062ec;
	}
`;

const StyledText = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1em;
`;

const StyledH1 = styled.h1`
	color: white;
	margin-top: -70px;
	text-align: center;
	width: 600px;
	text-align: start;
`;

const StyledP = styled.p`
	width: 600px;
	color: white;
	font-size: 25px;
	text-align: start;
`;

const HomePage = () => {
	return (
		<>
			<StyledHeader>
				<div className="container">
					<Styledcontent>
						<StyledImgLogo
							src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/2560px-Trello_logo.svg.png"
							alt=""
						/>
						<StyledHeaderUl>
							<StyledHeaderLi>
								<Link to="#">Features</Link>
							</StyledHeaderLi>
							<StyledHeaderLi>
								<Link to="#">Solution</Link>
							</StyledHeaderLi>
							<StyledHeaderLi>
								<Link to="#">Plans</Link>
							</StyledHeaderLi>
							<StyledHeaderLi>
								<Link to="#">Pricing</Link>
							</StyledHeaderLi>
							<StyledHeaderLi>
								<Link to="#">Resurces</Link>
							</StyledHeaderLi>
							<StyledHeaderLi>
								<Link to="/login">Log in</Link>
							</StyledHeaderLi>
							<StyledHeaderLii>
								<Link to="/registration">Get Trello for free</Link>
							</StyledHeaderLii>
						</StyledHeaderUl>
					</Styledcontent>
				</div>
			</StyledHeader>

			<StyledContentDiv>
				<StyledDiv>
					<StyledText>
						<StyledH1>
							Trello brings all your tasks, teammates, and tools together
						</StyledH1>
						<StyledP>
							Keep everything in the same place — even if your team isn’t.
						</StyledP>
					</StyledText>
					<StyledLinkContainer>
						<StyledLink to="/login">
							Зарегистрируйтесь - это бесплатно!
						</StyledLink>
						{/* <StyledLink to="/register">Registration</StyledLink> */}
					</StyledLinkContainer>
				</StyledDiv>
				<div>
					<StyledImg
						src="//images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=540"
						srcSet="//images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=1080 2x"
						alt="An illustration showing different features of a Trello board"
						width="1400"
						height="1500"
						loading="lazy"
						className="Picture__Image-sc-1wdxyb4-0 eYmxm"
					/>
				</div>
			</StyledContentDiv>
		</>
	);
};

export default HomePage;
