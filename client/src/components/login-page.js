import React from 'react';
export default function LoginPage() {
    const text  = 'Welcome! Bienvenue!';
    return(
        <div className="login">
            <h1>{text}</h1>
            <p>Bienvenue is an exciting app where you can learn French! Signup or Login below to get started!</p>
            <a href={'/api/auth/google'}>Login with Google</a>
        </div>
    );
}