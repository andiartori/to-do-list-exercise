"use client";
import { useState, useEffect } from "react";

const toDoList = [
	{
		list: "Running",
		id: 1,
		status: false,
	},
	{
		list: "Shopping",
		id: 2,
		status: false,
	},
	{
		list: "Cleaning",
		id: 3,
		status: true,
	},
];

function Writing() {
	const [list, setList] = useState([]);
	const [newList, setnewList] = useState("");
	const [edit, setEdit] = useState(false);
	const [editedName, setEditedName] = useState("");
	const [editingId, setEditingId] = useState(null);

	function addList() {
		if (newList.trim() === "") {
			return;
		} else {
			const newData = {
				list: newList,
				id: Date.now(),
				status: false,
			};
			setList((prevList) => [...prevList, newData]);
			setnewList("");
		}
	}

	function doneList(DoneId) {
		setList((prevList) =>
			prevList.map((task) => {
				if (DoneId === task.id) {
					return { ...task, status: !task.status };
				} else {
					return task;
				}
			})
		);
	}

	function deleteList(deleteId) {
		setList((prevList) => prevList.filter((task) => task.id !== deleteId));
	}

	function editing(editedInput, editingId) {
		setEdit(true);
		setEditedName(editedInput);
		setEditingId(editingId);
		console.log(editingId);
	}

	function editingProcess() {
		setList((prevlist) =>
			prevlist.map((task) => {
				if (task.id === editingId) {
					return { ...task, list: editedName };
				} else return task;
			})
		);
	}

	useEffect(() => {
		setList(toDoList);
	}, []);

	return (
		<div>
			This is the to-do list exercise
			<div>Displaying Data via Mapping</div>
			<div className="py-5 flex flex-col gap-2">
				<div>{edit ? "PUT Your editing list" : "Put New list"}</div>
				<input
					type="text"
					placeholder="Please input your new to-do-list here"
					className="border w-1/2"
					value={edit ? editedName : newList}
					onChange={
						edit
							? (e) => setEditedName(e.target.value)
							: (e) => setnewList(e.target.value)
					}
				></input>
				<button
					className="border w-1/2"
					onClick={edit ? editingProcess : addList}
				>
					Submit
				</button>
			</div>
			<div>
				{list.map((e) => (
					<ul key={e.id}>
						<li>
							{e.list}{" "}
							<input
								type="checkbox"
								onClick={() => {
									doneList(e.id);
								}}
							></input>{" "}
							<button
								className="border"
								onClick={() => {
									deleteList(e.id);
								}}
							>
								Delete
							</button>{" "}
							<button className="border" onClick={() => editing(e.list, e.id)}>
								Edit
							</button>
						</li>
					</ul>
				))}
			</div>
		</div>
	);
}

export default Writing;
