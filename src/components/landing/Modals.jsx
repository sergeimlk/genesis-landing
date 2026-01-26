/**
 * Modals Components
 * Regroupe les modales de la landing page (Secret, Contact, CGV)
 */
import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { EXTERNAL_LINKS, ASSETS } from '../../constants/paths';

// ==============================
// Secret Modal (Accès Membre)
// ==============================
export const SecretModal = ({ isOpen, onClose, onSuccess }) => {
    const [secretCode, setSecretCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const verifyCode = () => {
        if (secretCode.toUpperCase() === 'GENEGYM' || secretCode.toUpperCase() === 'GENEFIT') {
            localStorage.setItem('genegym_access', 'true');
            onSuccess();
            onClose();
        } else {
            setErrorMsg('Code invalide. Accès refusé.');
            setTimeout(() => setErrorMsg(''), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-modal-title"
        >
            <div className="modal-content animate-fade-up">
                <button onClick={onClose} className="modal-close-btn" aria-label="Fermer">
                    <X />
                </button>

                <Lock size={48} className="text-purple-500 lock-icon-centered" aria-hidden="true" />
                <h3 id="secret-modal-title" className="modal-title-orbitron">ACCÈS MEMBRE</h3>
                <p className="text-muted">Entrez votre code secret</p>

                <input
                    type="text"
                    className="secret-input"
                    placeholder="CODE"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && verifyCode()}
                    aria-label="Code d'accès"
                />

                {errorMsg && <p className="error-text" role="alert">{errorMsg}</p>}

                <button onClick={verifyCode} className="btn-primary justify-center btn-unlock btn-full-width">
                    DÉVERROUILLER
                </button>
            </div>
        </div>
    );
};

// ==============================
// Contact Modal (Tally Form)
// ==============================
export const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay modal-overlay-top"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div className="modal-content animate-fade-up modal-content-contact">
                <button onClick={onClose} className="modal-close-btn-white" aria-label="Fermer">
                    <X size={24} />
                </button>
                <h2 id="contact-modal-title" className="sr-only">Formulaire de contact</h2>
                <iframe
                    src={EXTERNAL_LINKS.CONTACT_FORM_URL}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Formulaire de contact"
                    className="iframe-transparent bg-white/5"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

// ==============================
// CGV Modal (PDF)
// ==============================
export const CgvModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay modal-overlay-top-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cgv-modal-title"
        >
            <div className="modal-content animate-fade-up modal-content-cgv">
                <div className="modal-header-cgv">
                    <h3 id="cgv-modal-title" className="modal-title-sm">CONDITIONS GÉNÉRALES DE VENTE</h3>
                    <button onClick={onClose} className="modal-close-btn-cgv" aria-label="Fermer">
                        <X size={20} />
                    </button>
                </div>
                <iframe
                    src={ASSETS.DOCUMENTS.CGV}
                    width="100%"
                    height="100%"
                    className="iframe-flex"
                    title="Conditions Générales de Vente"
                />
            </div>
        </div>
    );
};
