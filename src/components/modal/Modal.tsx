import { FC } from "react";
import styled from "styled-components";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ModalContainer = styled.div<{ isOpen: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: ${(props) => (props.isOpen ? "flex" : "none")};
	justify-content: center;
	align-items: center;
`;

const ModalContent = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	width: 500px;
	height: 500px;
`;

const ModalCloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	return (
		<>
			<ModalContainer isOpen={isOpen} onClick={onClose}>
				<ModalContent onClick={(e) => e.stopPropagation()}>
					<ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
					{children}
				</ModalContent>
			</ModalContainer>
		</>
	);
};

export default Modal;
