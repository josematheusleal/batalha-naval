import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Auth.css'; 

//INTEGRAR COM BACK
export default function EditProfile() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Perfil atualizado com sucesso!');
    navigate('/home');
  };

  return (
    <div className="home-layout">
      <Header />
      <main className="auth-page" style={{ minHeight: 'calc(100vh - 80px)' }}>
        <div className="auth-card">
          <h1 className="auth-title">Editar Perfil</h1>
          <p className="auth-subtitle">Atualize seus dados de comandante</p>
          
          <form onSubmit={handleUpdate} className="auth-form">
            <div className="input-group">
              <label>Nome</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Seu nome real" 
              />
            </div>

            <div className="input-group">
              <label>Username (Login)</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Nome de usuário" 
              />
            </div>
            
            <div className="input-group">
              <label>Nova Senha</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Deixe em branco para não alterar" 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="button" className="auth-submit-btn white-btn" onClick={() => navigate('/home')}>
                Cancelar
              </button>
              <button type="submit" className="auth-submit-btn blue-btn">
                Salvar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}