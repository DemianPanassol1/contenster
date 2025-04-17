export default {
  generic: {
    field: 'Genérico',
    required: 'Este campo é obrigatório',
    minLength: (value: string) =>
      `Este campo deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `Este campo deve ter no máximo ${value} caracteres`,
    pattern: 'Este campo deve ser válido',
  },
  email: {
    field: 'Email',
    required: 'O email é obrigatório',
    minLength: (value: string) =>
      `O email deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O email deve ter no máximo ${value} caracteres`,
    pattern: 'O email deve ser válido',
  },
  password: {
    field: 'Senha',
    required: 'A senha é obrigatória',
    minLength: (value: string) =>
      `A senha deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A senha deve ter no máximo ${value} caracteres`,
    pattern: 'A senha deve ser válida',
  },
  repeatPassword: {
    field: 'Repita a senha',
    required: 'A repetição da senha é obrigatória',
    minLength: (value: string) =>
      `A repetição da senha deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A repetição da senha deve ter no máximo ${value} caracteres`,
    pattern: 'A repetição da senha deve ser válida',
    mustMatch: 'As senhas devem ser iguais',
    passwordsDoNotMatch: 'As senhas não coincidem',
  },
  oldPassword: {
    field: 'Senha antiga',
    required: 'A senha antiga é obrigatória',
    minLength: (value: string) =>
      `A senha antiga deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A senha antiga deve ter no máximo ${value} caracteres`,
    pattern: 'A senha antiga deve ser válida',
  },
  newPassword: {
    field: 'Nova senha',
    required: 'A nova senha é obrigatória',
    minLength: (value: string) =>
      `A nova senha deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A nova senha deve ter no máximo ${value} caracteres`,
    pattern: 'A nova senha deve ser válida',
  },
  phone: {
    field: 'Telefone',
    required: 'O telefone é obrigatório',
    minLength: (value: string) =>
      `O telefone deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O telefone deve ter no máximo ${value} caracteres`,
    pattern: 'O telefone deve ser válido',
  },
  user: {
    field: 'Usuário',
    required: 'O usuário é obrigatório',
    minLength: (value: string) =>
      `O usuário deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O usuário deve ter no máximo ${value} caracteres`,
    pattern: 'O usuário deve ser válido',
  },
  establishment: {
    field: 'Estabelecimento',
    required: 'O estabelecimento é obrigatório',
    minLength: (value: string) =>
      `O estabelecimento deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O estabelecimento deve ter no máximo ${value} caracteres`,
    pattern: 'O estabelecimento deve ser válido',
  },
  staySignedIn: {
    field: 'Permanecer conectado',
    required: 'O campo "Permanecer conectado" é obrigatório',
    minLength: (value: string) =>
      `O campo "Permanecer conectado" deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O campo "Permanecer conectado" deve ter no máximo ${value} caracteres`,
    pattern: 'O campo "Permanecer conectado" deve ser válido',
  },
  completeName: {
    field: 'Nome completo',
    required: 'O nome completo é obrigatório',
    minLength: (value: string) =>
      `O nome completo deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O nome completo deve ter no máximo ${value} caracteres`,
    pattern: 'O nome completo deve ser válido',
  },
  username: {
    field: 'Nome de usuário',
    required: 'O nome de usuário é obrigatório',
    minLength: (value: string) =>
      `O nome de usuário deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O nome de usuário deve ter no máximo ${value} caracteres`,
    pattern: 'O nome de usuário deve ser válido',
  },
  preferencialPage: {
    field: 'Página preferencial',
    required: 'A página preferencial é obrigatória',
    minLength: (value: string) =>
      `A página preferencial deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A página preferencial deve ter no máximo ${value} caracteres`,
    pattern: 'A página preferencial deve ser válida',
  },
  title: {
    field: 'Título',
    required: 'O título é obrigatório',
    minLength: (value: string) =>
      `O título deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `O título deve ter no máximo ${value} caracteres`,
    pattern: 'O título deve ser válido',
  },
  description: {
    field: 'Descrição',
    required: 'A descrição é obrigatória',
    minLength: (value: string) =>
      `A descrição deve ter no mínimo ${value} caracteres`,
    maxLength: (value: string) =>
      `A descrição deve ter no máximo ${value} caracteres`,
    pattern: 'A descrição deve ser válida',
  },
  document: {
    field: 'Documento',
    required: 'O documento é obrigatório',
  },
  corporateName: {
    field: 'Razão Social',
    required: 'A Razão Social é obrigatória',
  },
  functionality: {
    field: 'Funcionalidade',
    required: 'A funcionalidade é obrigatória',
  },
  role: {
    field: 'Perfil',
    required: 'O perfil é obrigatório',
  },
  permission: {
    field: 'Permissão',
    required: 'A permissão é obrigatória',
  },
  canCreate: {
    field: 'Criar',
  },
  canRead: {
    field: 'Visualizar',
  },
  canUpdate: {
    field: 'Editar',
  },
  canDelete: {
    field: 'Deletar',
  },
  permissionType: {
    field: 'Tipo de permissão',
  },
  slug: {
    field: 'Slug',
    required: 'O slug é obrigatório',
  },
  icon: {
    field: 'Ícone',
    required: 'O ícone é obrigatório',
  },
  position: {
    field: 'Posição',
    required: 'A posição é obrigatória',
  },
  isActive: {
    field: 'Ativo',
  },
  isBlocked: {
    field: 'Bloqueado',
  },
  name: {
    field: 'Nome',
    required: 'O nome é obrigatório',
  },
  image: {
    field: 'Imagem',
    required: 'A imagem é obrigatória',
  },
  lastLoggedAt: {
    field: 'Último acesso',
  },
  module: {
    field: 'Módulo',
    required: 'O módulo é obrigatório',
  },
  fantasyName: {
    field: 'Nome Fantasia',
    required: 'O nome fantasia é obrigatório',
  },
  documentType: {
    field: 'Tipo de documento',
    required: 'O tipo de documento é obrigatório',
  },
  address: {
    field: 'Endereço',
    required: 'O endereço é obrigatório',
  },
  zipCode: {
    field: 'CEP',
    required: 'O CEP é obrigatório',
    pattern: 'O CEP deve ser válido',
  },
  addressNumber: {
    field: 'Número',
    required: 'O número é obrigatório',
  },
  district: {
    field: 'Bairro',
    required: 'O bairro é obrigatório',
  },
  purpose: {
    field: 'Finalidade',
    required: 'A finalidade é obrigatória',
  },
  emailTitle: {
    field: 'Título do email',
    required: 'O título do email é obrigatório',
  },
  port: {
    field: 'Porta',
    required: 'A porta é obrigatória',
  },
  server: {
    field: 'Servidor',
    required: 'O servidor é obrigatório',
  },
  sender: {
    field: 'Remetente',
    required: 'O remetente é obrigatório',
  },
  subject: {
    field: 'Assunto',
    required: 'O assunto é obrigatório',
  },
  recipient: {
    field: 'Destinatário',
    required: 'O destinatário é obrigatório',
  },
  recipientCopy: {
    field: 'Cópia do destinatário',
  },
  mainContent: {
    field: 'Conteúdo principal',
    required: 'O conteúdo é obrigatório',
  },
  footerContent: {
    field: 'Conteúdo do rodapé',
    required: 'O rodapé é obrigatório',
  },
  read: {
    field: 'Lido',
    required: "O campo 'Lido' é obrigatório",
  },
  content: {
    field: 'Conteúdo',
    required: 'O conteúdo é obrigatório',
  },
};
