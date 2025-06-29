import Link from "next/link";
import { ArrowUturnLeftIcon} from "@heroicons/react/24/outline"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-200 text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">Política de Privacidade</h1>

      <p className="mb-4">
        O aplicativo <strong>Planejedu</strong> valoriza sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Coleta de Informações</h2>
      <p className="mb-4">
        Coletamos apenas as informações necessárias para o funcionamento da aplicação, como seu endereço de e-mail, fornecido durante o login ou cadastro.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso das Informações</h2>
      <p className="mb-4">
        As informações coletadas são utilizadas exclusivamente para autenticação, personalização da sua experiência e armazenamento de seus dados de estudo.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Compartilhamento</h2>
      <p className="mb-4">
        Não compartilhamos suas informações com terceiros, exceto quando exigido por lei.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Segurança</h2>
      <p className="mb-4">
        Utilizamos práticas modernas de segurança, como criptografia e autenticação, para proteger seus dados.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Direitos do Usuário</h2>
      <p className="mb-4">
        Você pode solicitar a exclusão ou alteração de seus dados a qualquer momento, entrando em contato conosco.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contato</h2>
      <p className="mb-4">
        Em caso de dúvidas, envie um e-mail para: <a href="mailto:suporte@seudominio.com" className="text-blue-600 underline">suporte@seudominio.com</a>
      </p>

      <p className="text-sm text-gray-500 mt-8">Última atualização: Junho de 2025</p>
      <Link href={"/"} className="flex justify-end mt-8 pr-5">
        <ArrowUturnLeftIcon className="text-green-800 w-20 h-20"/>
      </Link>
    </main>
  );
}