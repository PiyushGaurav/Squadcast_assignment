import { useState, ChangeEvent } from 'react';
import './App.css';
import users from './../data.js';

interface User {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
}

const App: React.FC = () => {
	const [text, setText] = useState('');
	const [mentionableUsers, setMentionableUsers] = useState<User[]>(users);

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		setText(newText);
	};

	mentionableUsers;

	return (
		<div className="content">
			<input type="text" value={text} onChange={handleTextChange} placeholder="Write a comment..." />
			<div className="mention-dropdown">
				{mentionableUsers.map(user => (
					<div key={user} className="users">{`${user.first_name} ${user.last_name}`}</div>
				))}
			</div>
		</div>
	);
};

export default App;
