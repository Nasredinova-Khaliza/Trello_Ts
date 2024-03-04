/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Header from "../layout/header/Header";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import {
	getTodo,
	patchTodo,
	postTodo,
	putTodo,
} from "../../redux/tools/TodoSlise";
import styled from "styled-components";
import { TypePutNewItem } from "../../redux/tools";
// import Modal from "../modal/Modal";

const UserHomePage: React.FC = () => {
	const todoList = useAppSelector((state) => state.todoTrello.todo);
	const [newTodoTitle, setNewTodoTitle] = useState<string>("");
	const [showInput, setShowInput] = useState<boolean>(false);
	const [selectedTodoId, setSelectedTodoId] = useState<number | false>(false);
	const [newTodoItemTitle, setNewTodoItemTitle] = useState<string>("");
	const [edite, setEdite] = useState<number | null>(null);
	const [editedTodoListValue, setEditedTodoListValue] = useState<string>("");
	const dispatch = useAppDispatch();
	// const [commentedTodoListValue, setCommentedTodoListValue] =
	// 	useState<string>("");

	// const [modalOpenMap, setModalOpenMap] = useState<Record<number, boolean>>({});

	// const openModal = (id: number) => {
	// 	setModalOpenMap((prevMap) => ({
	// 		...prevMap,
	// 		[id]: true,
	// 	}));
	// };

	// const closeModal = (id: number) => {
	// 	setModalOpenMap((prevMap) => ({
	// 		...prevMap,
	// 		[id]: false,
	// 	}));
	// };

	//!GET
	useEffect(() => {
		dispatch(getTodo());
	}, [dispatch]);

	//!POST
	const addNewTodo = () => {
		const newTodo = {
			title: newTodoTitle,
			values: [],
		};
		dispatch(postTodo(newTodo));

		setNewTodoTitle("");
	};

	const showInputForTodo = () => {
		setShowInput(true);
	};

	//!PATCH
	const patchTodoHandler = (_id: number, todo: any, title: string) => {
		const newTodoItem = {
			title,
			values: [
				...todo.values,
				{
					valueTitle: newTodoItemTitle,
					_id: Math.random(),
				},
			],
		};
		setNewTodoItemTitle("");
		setSelectedTodoId(false);
		console.log(newTodoItem);

		dispatch(patchTodo({ newTodoItem, _id }));
	};

	//!PUT

	const updateValue = (newItem: TypePutNewItem, _id: number) => {
		console.log(newItem);

		setEditedTodoListValue(newItem.valueTitle);
		setEdite(_id);
	};

	const putTodoHandler = (
		_id: number,
		title: string,
		values: { _id: number; valueTitle: string }[],
		id: number
	) => {
		const newValues = values.map((el) => {
			if (el._id === id) {
				return { ...el, valueTitle: editedTodoListValue };
			}
			return el;
		});

		const newData = {
			title,
			values: newValues,
		};
		console.log(newData);

		dispatch(putTodo({ newItems: newData, _id }));
		setEdite(null);
	};

	return (
		<>
			<Header email={""} login={""} password={""} img={""} />
			<StyledContainerDiv>
				{todoList.map((todo) => (
					<div key={todo._id}>
						<StyledCard>
							<h1>{todo.title}</h1>
							{todo.values.map((todoItem: any, index: number) => (
								<div key={`${todoItem._id}${index}`}>
									{edite === todoItem._id ? (
										<>
											<StyledSaveInput
												type="text"
												value={editedTodoListValue}
												onChange={(e) => setEditedTodoListValue(e.target.value)}
											/>

											<StyledSaveButton
												onClick={() =>
													putTodoHandler(
														todo._id,
														todo.title,
														todo.values,
														todoItem._id
													)
												}>
												save
											</StyledSaveButton>

											<StyledCancelButton onClick={() => setEdite(null)}>
												cancel
											</StyledCancelButton>
										</>
									) : (
										<>
											<StyledContainer>
												<StyledH1
												//  onClick={() => openModal(todoItem._id)}
												>
													{todoItem.valueTitle}
												</StyledH1>
												<StyledEditButton
													onClick={() => {
														updateValue(todoItem, todoItem._id);
														setEditedTodoListValue(todoItem.valueTitle);
													}}>
													edit
												</StyledEditButton>
											</StyledContainer>
										</>
									)}
								</div>
							))}

							{todo._id === selectedTodoId ? (
								<>
									<input
										type="text"
										value={newTodoItemTitle}
										onChange={(e) => setNewTodoItemTitle(e.target.value)}
									/>
									<button
										onClick={() =>
											patchTodoHandler(todo._id, todo, todo.title)
										}>
										Add
									</button>
									<button onClick={() => setSelectedTodoId(false)}>X</button>
								</>
							) : null}
							<StyledAddCardButton onClick={() => setSelectedTodoId(todo._id)}>
								+ Add Card
							</StyledAddCardButton>
						</StyledCard>
					</div>
				))}
				<div>
					{showInput ? (
						<>
							<StyledInput
								type="text"
								value={newTodoTitle}
								onChange={(e) => setNewTodoTitle(e.target.value)}
								placeholder="Column name"
							/>
							<StyledButton onClick={addNewTodo}>Add List</StyledButton>
							<StyledCloseButton onClick={() => setShowInput(false)}>
								X
							</StyledCloseButton>
						</>
					) : (
						<div>
							<StyledAddColumnButton onClick={showInputForTodo}>
								+ Add Another Column
							</StyledAddColumnButton>
						</div>
					)}
				</div>
			</StyledContainerDiv>
		</>
	);
};

export default UserHomePage;

const StyledContainerDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-size: cover;
	background-position: center;
	padding: 20px;
	height: auto;
`;

const StyledCard = styled.div`
	width: 300px;
	height: 400px;
	background-color: #fff;
	border-radius: 10px;
	padding: 20px;
	margin: 20px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
`;

const StyledSaveInput = styled.input`
	padding: 8px;
	margin-right: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 14px;
`;

const StyledSaveButton = styled.button`
	padding: 8px 16px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}
`;

const StyledCancelButton = styled.button`
	padding: 8px 16px;
	background-color: #dc3545;
	color: #fff;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #c82333;
	}
`;

const StyledAddCardButton = styled.button`
	background-color: #007bff;
	color: #ffffff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-top: 5px;

	&:hover {
		background-color: #0056b3;
	}
`;

const StyledContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
`;

const StyledH1 = styled.h1`
	color: white;
	font-size: 20px;
	margin: 0;
	padding: 0;
	width: 100%;
	text-align: center;
	font-weight: 600;
	background-color: silver;
	border-radius: 5px;
`;

const StyledEditButton = styled.button`
	background-color: #28a745;
	color: #ffffff;
	padding: 8px 16px;
	border: none;
	border-radius: 5px;
	font-size: 14px;
	cursor: pointer;
	margin-left: 10px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #218838;
	}
`;

const StyledInput = styled.input`
	padding: 10px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
`;

const StyledButton = styled.button`
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

const StyledCloseButton = styled.button`
	padding: 10px 15px;
	background-color: #dc3545;
	color: #ffffff;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #c82333;
	}
`;

const StyledAddColumnButton = styled.button`
	background-color: #007bff;
	color: #ffffff;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	font-size: 16px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-left: 10px;
	margin-top: 20px;

	&:hover {
		background-color: #0056b3;
	}
`;

// const ModalButton = styled.button`
// 	padding: 10px 20px;
// 	background-color: #da4b2e;
// 	color: white;
// 	border: none;
// 	border-radius: 4px;
// 	cursor: pointer;
// 	margin-top: 20px;
// `;

// const ModalInput = styled.input`
// 	width: calc(100% - 40px);
// 	padding: 10px;
// 	margin: 10px 0;
// 	border: 1px solid #ccc;
// 	border-radius: 4px;
// `;

// const ModalButtonSave = styled.button`
// 	padding: 10px 20px;
// 	background-color: #007bff;
// 	color: white;
// 	border: none;
// 	border-radius: 4px;
// 	cursor: pointer;
// 	margin-top: 20px;
// `;
