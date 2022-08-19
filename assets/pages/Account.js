import React, { useState } from 'react';
import ConnectAccount from '../components/form/connect/ConnectAccount';
import CreateAccount from '../components/form/create/CreateAccount';

export default function Account() {

    const [newAccount, setNewAccount] = useState();
    const [connectAccount, setConnectAccount] = useState();

    return (
        <article className="container">
            <div>
                <button onClick={() => {
                    setNewAccount(true);
                    setConnectAccount(false)
                }}>Créer un compte</button>
                <button onClick={() => {
                    setNewAccount(false)
                    setConnectAccount(true)
                }}>Se connecter</button>
            </div>
            {newAccount &&
                <CreateAccount/>
            }
            {connectAccount &&
                <ConnectAccount/>
            }
        </article>
    )
}
