import { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import users from '../data';

interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
}

const App: React.FC = () => {
	const [text, setText] = useState('');
	const [showMentions, setShowMentions] = useState(false);
	const [mentionSearch, setMentionSearch] = useState('');
	const [mentionableUsers, setMentionableUsers] = useState<User[]>([]);

	const searchMentionUsers = () => {
		const mentionedUsers = users.filter(user => {
			return `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(mentionSearch.toLowerCase());
		});
		setMentionableUsers(mentionedUsers);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			searchMentionUsers();
		}, 200);
		return () => {
			clearTimeout(timer);
		};
	}, [mentionSearch]);

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		setText(newText);

		if (newText.includes('@')) {
			const lastWord = newText.split(' ').pop() || '';
			if (lastWord.startsWith('@')) {
				console.log(lastWord.substring(1));
				setMentionSearch(lastWord.substring(1));
				setShowMentions(true);
			} else {
				setShowMentions(false);
			}
		} else {
			setShowMentions(false);
		}
	};

	const handleMentionClick = (mention: User) => {
		const newText = text.replace(new RegExp(`@${mentionSearch}` + '$'), `@${mention.first_name} `);
		setText(newText);
		setShowMentions(false);
	};

	return (
		<div className="content">
			<input type="text" value={text} onChange={handleTextChange} placeholder="Write a comment..." />
			{showMentions && (
				<div className="mention-dropdown">
					{mentionableUsers.map(user => (
						<div
							key={user.id}
							className="users"
							onClick={() => handleMentionClick(user)}
						>{`${user.first_name} ${user.last_name}`}</div>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
