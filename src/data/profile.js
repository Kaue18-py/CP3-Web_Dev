export const PROFILE = {
  name: 'Kauê',
  fullName: 'Kauê H.G de Barros',
  username: 'kaue',
  role: 'Engenharia de Software · FIAP',
  tagline:
    'Construo interfaces em React e APIs em Python, e estudo segurança ofensiva para entender como os sistemas quebram — e como evitar que quebrem.',
  plan: [
    'Comecei mexendo em computador ainda criança e nunca mais parei. Hoje curso Engenharia de Software na FIAP e uso cada trabalho da faculdade como desculpa para aprender uma ferramenta nova.',
    'Meu alvo é a cibersegurança. Acredito que, para proteger um sistema, primeiro é preciso saber construí-lo, por isso divido o tempo entre desenvolver e quebrar coisas em laboratório.',
  ],
  studying: ['redes', 'criptografia', 'autenticação', 'linux'],
}

export const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kau%C3%AA-h-g-de-barros-34934035a',
  },
  { label: 'GitHub', href: 'https://github.com/Kaue18-py' },
  { label: 'Instagram', href: 'https://instagram.com/kaueze011' },
]

// Varredura nmap do hero: "open" = uso em projetos, "filtered" = em estudo
export const SCAN = {
  command: 'nmap -sV kaue.dev',
  target: 'kaue.dev',
  ports: [
    {
      port: '443/tcp',
      state: 'open',
      service: 'https',
      version: 'React · Tailwind — interfaces web',
    },
    {
      port: '8000/tcp',
      state: 'open',
      service: 'http-api',
      version: 'Python · FastAPI — APIs REST',
    },
    {
      port: '2375/tcp',
      state: 'open',
      service: 'docker',
      version: 'Docker · Git — ambiente e versionamento',
    },
    { port: '5678/tcp', state: 'open', service: 'n8n', version: 'n8n — automação de fluxos' },
    {
      port: '4444/tcp',
      state: 'filtered',
      service: 'msf',
      version: 'Metasploit · Nmap — segurança ofensiva',
    },
    { port: '22/tcp', state: 'filtered', service: 'ssh', version: 'Linux — laboratórios práticos' },
  ],
}
