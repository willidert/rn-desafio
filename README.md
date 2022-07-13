## Desafio

Um app desenvolvido em React-Native para um desafio de seleção de um projeto de P&D.

- Deve conter um mapa
- Deve conter um botão para exibir a localização atual no mapa
- Deve conter um botão para exibir uma localização pré-definida no mapa
- Deve fzr leitura de QR code e código de barras
- Deve armazenar e exibir as leituras feitas
- Deve exibir informações de quem implementou
- Deve conter um botão para enviar email para o dev
- Deve conter um botão para enviar wpp para o dev

### Problemas

- habilitar a API do maps, n consegui verificar minha conta pra usar o serviço
- o lib que eu uso pra qrcode usa cm dependencia uma lib pra acessar a camera, mas essa lib ta desatualizada
  ["possivel solução"(https://github.com/facebook/react-native/issues/33557#issuecomment-1100919812), ele n menciona mas precisa instalar essa [deprecated](https://www.npmjs.com/package/deprecated-react-native-prop-types)...

### Executando

```sh
npx i
npx react-native run-android
```
