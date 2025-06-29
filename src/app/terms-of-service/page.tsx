import Link from "next/link";
import { ArrowUturnLeftIcon} from "@heroicons/react/24/outline"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen p-6 bg-gray-200 text-gray-800">
      <h1 className="text-2xl font-semibold mb-4">Termos de Serviço</h1>

      <p className="mb-4">
        Bem-vindo ao <strong>Planejedu</strong>. Ao usar este aplicativo, você concorda com os termos descritos abaixo.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Uso do Aplicativo</h2>
      <p className="mb-4">
        Este aplicativo é fornecido para fins pessoais e educacionais. Você concorda em utilizá-lo de forma legal e ética.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Conta de Usuário</h2>
      <p className="mb-4">
        É necessário fornecer um e-mail válido para criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Dados e Conteúdo</h2>
      <p className="mb-4">
        Todo conteúdo inserido por você (como tarefas e temas) é de sua responsabilidade. Não nos responsabilizamos por perdas de dados decorrentes de mau uso.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Modificações</h2>
      <p className="mb-4">
        Podemos modificar estes termos a qualquer momento. Recomendamos a leitura periódica desta página.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Encerramento da Conta</h2>
      <p className="mb-4">
        Você pode excluir sua conta a qualquer momento. Reservamo-nos o direito de desativar contas que violem estes termos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contato</h2>
      <p className="mb-4">
        Para dúvidas ou sugestões, envie um e-mail para: <a href="mailto:suporte@seudominio.com" className="text-blue-600 underline">suporte@seudominio.com</a>
      </p>

      <p className="text-sm text-gray-500 mt-8">Última atualização: Junho de 2025</p>
      <Link href={"/"} className="flex justify-end mt-8 pr-5">
        <ArrowUturnLeftIcon className="text-green-800 w-20 h-20"/>
      </Link>
    </main>
  );
}