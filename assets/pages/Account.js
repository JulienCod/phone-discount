import React, { useState } from 'react';
import ConnectAccount from '../components/form/connect/ConnectAccount';
import CreateAccount from '../components/form/create/CreateAccount';
import Button from '../components/button/Button';
import '../styles/account.css';
export default function Account() {

    const [newAccount, setNewAccount] = useState();
    const [connectAccount, setConnectAccount] = useState(true);

    return (
        <article className="container">
            <div className='container__btn'>
                <Button onClick={() => {
                    setNewAccount(true);
                    setConnectAccount(false)
                }}>Créer un compte</Button>

                <Button onClick={() => {
                    setNewAccount(false)
                    setConnectAccount(true)
                }}>Se connecter</Button>
            </div>
            {newAccount &&
                <CreateAccount />
            }
            {connectAccount &&
                <ConnectAccount />
            }
        </article>
    )
}