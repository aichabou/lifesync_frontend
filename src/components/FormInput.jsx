import React from 'react';

const FormInput = ({ label, type, name, value, onChange, placeholder, error }) => (
    <div style={{ marginBottom: '1rem' }}>
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.3rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
            }}
        />
        {error && <p style={{ color: 'red', fontSize: '.8rem' }}>{error}</p>}
    </div>
);


export default FormInput;
