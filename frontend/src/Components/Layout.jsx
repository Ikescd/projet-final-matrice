import Header from './Semantic/Header';

export default function Layout(props) {
	return (
		<div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header />
			{props.children}
		</div>
	);
}
