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

	function deleteList(deleteId){

	}

	useEffect(() => {
		setList(toDoList);
	}, []);

	return (
		<div>
			This is the to-do list exercise
			<div>Displaying Data via Mapping</div>
			<div className="py-5 flex flex-col gap-2">
				<div>New To Do List input</div>
				<input
					type="text"
					placeholder="Please input your new to-do-list here"
					className="border w-1/2"
					value={newList}
					onChange={(e) => setnewList(e.target.value)}
				></input>
				<button className="border w-1/2" onClick={addList}>
					Submit
				</button>
			</div>
			<div>
				{list.map((e) => (
					<ul key={e.id}>
						<li>
							{e.list} <input type="checkbox"></input>{" "}
							<button className="border">Delete</button>{" "}
							<button className="border">Edit</button>
						</li>
					</ul>
				))}
			</div>
		</div>
	);
}

export default Writing;
