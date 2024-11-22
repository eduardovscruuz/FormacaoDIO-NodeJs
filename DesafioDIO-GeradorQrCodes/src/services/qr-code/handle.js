import chalk from 'chalk';
import qr from 'qrcode-terminal';

export async function handle(err, result) {
  if (err) {
    console.log('Error on application');
    return;
  }

  const isSmall = result.type == 2;

  qr.generate(result.link, { small: isSmall }, qrcode => {
    console.log(chalk.green('QR-CODE gerado com sucesso:\n'));
    console.log(qrcode);
  });
}
