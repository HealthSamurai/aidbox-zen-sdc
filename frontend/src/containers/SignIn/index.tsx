import { useSignIn } from './useSignIn';

export function SignIn() {
    const { signIn, username, password, setUsername, setPassword } = useSignIn();

    return (
        <div>
            <div>
                <div>Please log in</div>
                <div>Username</div>
                <input placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <div>Password</div>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <button onClick={signIn}>Login</button>
            </div>
        </div>
    );
}
