export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // mensagens em português podem começar com qualquer caixa
    'subject-case': [0],
  },
}
