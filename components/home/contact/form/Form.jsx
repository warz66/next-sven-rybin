import React, { useState, useRef } from 'react';
import styles from './form.module.css';

export default function Form() {
    const [activeErrorName, setActiveErrorName] = useState(false);
    const [activeErrorEmail, setActiveErrorEmail] = useState(false);
    const [activeErrorObjet, setActiveErrorObjet] = useState(false);
    const [activeErrorMessage, setActiveErrorMessage] = useState(false);
    const [activeMsgReturn, setActiveMsgReturn] = useState(false);
    const [activeMsgResult, setActiveMsgResult] = useState(false);
    const form = useRef(null);

    function sendMessageForm(tokenGrecaptacha) {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 8000);
        const data = new FormData(form.current);
        data.set('tokenGrecaptcha', tokenGrecaptacha);
        return fetch(process.env.REACT_APP_ADRESS_FILE_FORM_BACK, { method: 'POST', body: data, signal: controller.signal })
            .then(res => {  return res.json() })
            .then(result => { return result })
            .catch(error => { return error });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setActiveMsgReturn(false);
        let submit = true;
        if(e.target.name.value === '') {
            setActiveErrorName(true);
            submit = false;
        }
        if(e.target.email.value === '') {
            setActiveErrorEmail(true);
            submit = false;
        }
        if(e.target.objet.value === '') {
            setActiveErrorObjet(true);
            submit = false;
        }
        if(e.target.message.value === '') {
            setActiveErrorMessage(true);
            submit = false;
        }
        if(submit) {
            let msgFormReturn = document.getElementById(styles.msg_send_result);
            msgFormReturn.style.color = 'var(--secondary)'

            setActiveMsgReturn(true);

            msgFormReturn.classList.add('clignote');

            setActiveMsgResult("En attente...");

            const promise = new Promise((resolve, reject) => {
                window.grecaptcha.ready(() => { 
                    window.grecaptcha.execute(process.env.REACT_APP_CLE_GRECAPTCHA_API, {action: 'submit'}).then( function(tokenGrecaptacha) {
                        resolve(sendMessageForm(tokenGrecaptacha));
                    });
                });
            });

            const res = await promise.then((resBack) => {
                return resBack;
            });

            msgFormReturn.classList.remove('clignote');

            if(res.result === "success") {
                setActiveMsgResult("Message Envoyé");
                e.target.name.value = '';
                e.target.email.value = '';
                e.target.objet.value = '';
                e.target.message.value = '';
                console.log(res);
            } else {
                setActiveMsgResult("Problème d'envoi");
                msgFormReturn.style.color = 'var(--form-red-error)';
                console.log(res);
            }
        } else {
            return false;
        }
    }

    return (

        <form ref={form} id={styles.form_contact} onSubmit={handleSubmit}>
            <div>
                <input className={activeErrorName ? styles.active_input_error : ""} type="text" aria-label="name" name="name" placeholder="Nom" onChange={() => {setActiveErrorName(false);setActiveMsgReturn(false)}} onClick={() => {setActiveErrorName(false);setActiveMsgReturn(false)}}/>
                <span className={styles.msg_error+(activeErrorName ? " "+styles.active_msg_error : "")}>Ne peut-être vide</span>
            </div>
            <div>
                <input className={activeErrorEmail ? styles.active_input_error : ""} type="email" aria-label="email" name="email" placeholder="Email" onChange={() => {setActiveErrorEmail(false);setActiveMsgReturn(false)}} onClick={() => {setActiveErrorEmail(false);setActiveMsgReturn(false)}}/>
                <span className={styles.msg_error+(activeErrorEmail ? " "+styles.active_msg_error : "")}>Ne peut-être vide</span>
            </div>
            <div>
                <input className={activeErrorObjet ? styles.active_input_error : ""} type="text" aria-label="objet" name="objet" placeholder="Objet" onChange={() => {setActiveErrorObjet(false);setActiveMsgReturn(false)}} onClick={() => {setActiveErrorObjet(false);setActiveMsgReturn(false)}}/>
                <span className={styles.msg_error+(activeErrorObjet ? " "+styles.active_msg_error : "")}>Ne peut-être vide</span>
            </div>
            <div>
                <textarea className={activeErrorMessage ? styles.active_input_error : ""} aria-label="message" name="message" placeholder="Message" rows="3" onChange={() => {setActiveErrorMessage(false);setActiveMsgReturn(false)}} onClick={() => {setActiveErrorMessage(false);setActiveMsgReturn(false)}}/>
                <span className={styles.msg_error+(activeErrorMessage ? " "+styles.active_msg_error : "")}>Ne peut-être vide</span>
            </div>
            <div>
                <div id={styles.grecaptcha_marque}>
                    This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                </div>
                <button type="submit" aria-label="submit form" form={styles.form_contact}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20"><path fill="none" fillRule="evenodd" strokeWidth="2" d="M15 1l9 9-9 9M0 10h24"></path></svg>
                </button>
            </div>
            <span id={styles.msg_send_result} style={activeMsgReturn ? {opacity: 1} : {opacity: 0}}>{activeMsgResult}</span>
        </form>

    );

}