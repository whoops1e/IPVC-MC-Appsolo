import LocalizedStrings from 'react-native-localization';

export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome',
    LOGIN: 'Please LOGIN or REGISTER',
    PROCEED: 'CONTINUE',
    REGB: 'REGISTER',
    MAPB: 'MAP',
    NOTESB: 'NOTES',
    LOGOUTB: 'LOGOUT',
    ADD: 'ADD',
    DAY: (email) => `Good day, ${email}`,
    EMAIL: 'Email',
    PASSWORD: 'Password',
    EMAILANDPASSWORDERROR: 'Email and password required'
  },
  pt: {
    WELCOME: 'Bem-vinda',
    LOGIN: 'Por favor faça o login ou registre-se',
    PROCEED: 'CONTINUAR',
    REGB: 'REGISTRO',
    MAPB: 'MAPA',
    NOTESB: 'NOTAS',
    LOGOUTB: 'SAIR',
    ADD: 'ADICIONAR',
    DAY: (email) => `Olá, ${email}`,
    EMAIL: 'Email',
    PASSWORD: 'Senha',
    EMAILANDPASSWORDERROR: 'Email e senha obrigatórios'
  }
};

export default new LocalizedStrings(translations);
