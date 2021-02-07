import React from 'react';

interface HelloWorldProps {
	name: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ name }) => (
	<h1 style={{ color: "#333", border: "1px solid red" }}>Hello {name ? name : 'World'}</h1>
);