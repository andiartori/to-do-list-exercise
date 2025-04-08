"use client";
import Image from "next/image";
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

export default function Home() {
	const [list, setList] = useState([]);
	const [newListName, setNewListName] = useState("");
	const [startingEdit, setStartingEdit] = useState(false);
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		setList(toDoList);
	}, []);

	function addList() {
		if (newListName === "") {
			return;
		} else {
			const newList = {
				list: newListName,
				id: Date.now(),
				status: false,
			};
			setList((prevList) => [...prevList, newList]);
			setNewListName("");
		}
	}

	function doneTask(id) {
		setList((prevList) =>
			prevList.map((e) => {
				if (e.id === id) {
					return { ...e, status: !e.status };
				} else {
					return e;
				}
			})
		);
	}

	function deleteTask(id) {
		const updatedList = list.filter((e) => e.id !== id);
		setList(updatedList);
	}

	function startEdit(editId, editedList) {
		setStartingEdit(true);
		setEditId(editId);
		setNewListName(editedList);
	}

	function editingProcess() {
		setList((prevlist) =>
			prevlist.map((e) => {
				if (editId === e.id) {
					return { ...e, list: newListName };
				} else {
					return e;
				}
			})
		);
		setStartingEdit(false);
	}

	return (
		<div className="max-w-screen-xl mx-auto px-4">
			Thi is to-do-list exercise
			<div className="flex flex-col justify-center items-left">
				<div className="flex gap-4">
					<div className="flex justify-between">
						{" "}
						<p>
							{startingEdit
								? "Please input your Edited Task"
								: "Please input your new Task"}
						</p>
						<input
							type="text"
							value={newListName}
							onChange={(e) => setNewListName(e.target.value)}
							className="border"
						></input>
						<button
							type="submit"
							onClick={startingEdit ? () => editingProcess() : addList}
						>
							{startingEdit ? "EDIT" : "SUBMIT"}
						</button>
					</div>
				</div>
				{list.map((things) => (
					<ul key={things.id}>
						<div className="flex gap-5">
							<li>{things.list}</li>
							<input
								type="checkbox"
								onClick={() => doneTask(things.id)}
							></input>
							<button onClick={() => deleteTask(things.id)}>Delete</button>
							<button onClick={() => startEdit(things.id, things.list)}>
								EDIT
							</button>
						</div>
					</ul>
				))}
			</div>
		</div>
	);
}
