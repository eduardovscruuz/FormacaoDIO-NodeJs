export async function getBaseEmail(senderName: string): Promise<string> {
  let base = `Olá ${senderName}, gostaria de me inscrever para a vaga \n`;

  base += 'estou deixando meu currículo';

  return base;
}
