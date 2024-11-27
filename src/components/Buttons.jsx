import React from 'react';

const Button = ({ text, onClick, type = 'button', style }) => (
    <button
        type={type}
        onClick={onClick}
        style={{
            padding: '0.7rem 1.5rem',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            ...style,
        }}
    >
        {text}
    </button>
);

export default Button;
