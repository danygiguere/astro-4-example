import { useState } from 'react';

export default function Counter({ count: initialCount }) {
	const [count, setCount] = useState(initialCount);
	const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);

	return (
		<>
			<div className="flex">
				<div className="flex bg-slate-200 py-2 px-5">
					<button className="" onClick={subtract}>-</button>
					<pre className="px-2">{count}</pre>
					<button onClick={add}>+</button>
				</div>
			</div>
		</>
	);
}
