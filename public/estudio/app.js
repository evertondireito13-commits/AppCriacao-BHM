/* Estúdio de Pautas BHM: aplicação (script clássico, carregado depois de src/estudio/runtime.ts) */

/* ============ Dados dos documentos BHM (Briefing, Fase 1, Fase 2, Guia) ============ */
const STATUS=['Recebida','Fonte conferida','Classificada','Em produção','Em revisão','Aprovada','Publicada','Analisada'];
const ETAPAS=[
 {n:1,t:'Receber e registrar',st:'Recebida'},
 {n:2,t:'Conferir a fonte',st:'Fonte conferida'},
 {n:3,t:'Classificar',st:'Classificada'},
 {n:4,t:'Ideia central',st:'Em produção'},
 {n:5,t:'Formato e pacote',st:'Em produção'},
 {n:6,t:'Produzir',st:'Em revisão'},
 {n:7,t:'Revisar',st:'Aprovada'},
 {n:8,t:'Publicar e medir',st:'Publicada'}];
const PAPEIS={
 marketing:{n:'Marketing',d:'Everton e equipe de marketing: registra, classifica, escreve, revisa a comunicação e mede.'},
 bruno:{n:'Dr. Bruno',d:'Grava vídeos e Stories, tira dúvidas jurídicas, valida método e revisa conteúdo técnico novo.'},
 agencia:{n:'Agência',d:'Produz as peças visuais e publica no horário combinado.'},
 outro:{n:'Equipe',d:'Grava ou faz Stories na falta do Dr. Bruno, ou apoia a produção.'}};
const FMT={F01:'Vídeo curto do Dr. Bruno',F02:'Carrossel narrativo',F03:'Carrossel de fluxo ou infográfico',F04:'Vídeo ao cargo',F05:'Carrossel denso ou documento (PDF)',F06:'Vídeo explicativo longo',F07:'Texto no LinkedIn com a posição do Dr. Bruno',F08:'Post de imagem única (a testar)'};
const TAT={T01:'Story de abertura com enquete',T02:'Story do relógio',T03:'Retomada com história em 3 ou 4 Stories',T04:'Conversa em aberto nos Stories',T05:'Horário e texto nos Stories',T06:'Story de fim do dia com reação',T07:'Sequência de recepção',T08:'Reaproveitar o Reel mais assistido do mês',T09:'Republicar um Reel de bom desempenho',T10:'Turbinar publicação',T11:'Reel acima do número de referência',T12:'Dia de pico',T13:'Carrossel-resumo do mês',T14:'Gravar sentado',T15:'Gravar andando',T16:'Reel de 7 segundos',T17:'Diagnóstico dos primeiros segundos',T18:'Título na tela e capa do Reel',T19:'Rotina de 60 minutos',T20:'Descobrir temas que o público quer assistir',T21:'Comentários populares viram ideias',T22:'Tutoriais, erros comuns e opiniões',T23:'Desafios do empresário além do imposto',T24:'Retorno real antes do convite (proposta)',T25:'Gancho quando o vídeo para de crescer',T26:'Expectativa antes de compartilhar o Reel',T27:'Mostrar o resultado antes do processo',T28:'Evitar “no vídeo de hoje eu vou…”',T29:'Espaço de 30 minutos entre publicações',T30:'Vincular um Reel a outro conteúdo',T31:'Intercalar Reels e carrosséis',T32:'Reels com aparência de Stories',T33:'Perfil igual ao conteúdo que atraiu visualizações',T34:'Dúvidas reais de clientes em perguntas e respostas',T35:'Busca e interações para achar ideias',T36:'Problema da semana, pedindo sugestões',T37:'Gravar com mais dinamismo',T38:'Sticker “Sua vez”',T39:'Lives (Fase 3)',T40:'Primeiro Story após ganhar seguidores',T41:'Conteúdo que as pessoas queiram compartilhar',T42:'Dono do negócio como conteúdo',T43:'Música em carrosséis',T44:'Problemas de clientes em Reels',T45:'SEO do post',T46:'Conteúdo reassistível (rewatch)',T47:'Gancho que promete algo que exige atenção',T48:'Ritmo intencional em Reels de 20 a 60 s',T49:'Chamada para salvar, reassistir ou enviar',T50:'Quadros fixos nos Stories',T51:'Sequência curta: problema, explicação e pergunta',T52:'Pergunta que pede comentário com contexto',T53:'Sem marca d’água e com recursos nativos',T54:'Teste de horário em duas janelas'};
const PILARES=['1. Metodologia com tecnologia própria','2. Números provados','3. Tecnologia sem palco','4. Ecossistema'];
const CARGOS=['Dono ou Sócio','CFO','Diretor Financeiro','Controller','Gerente Fiscal','Coordenador Fiscal','Responsável Tributário','Contador'];
const SETORES=['Indústria','Distribuição e Atacado','E-commerce'];
const CANAIS=['Instagram','LinkedIn','YouTube','Facebook'];
const TOQUES=[['abertura','1. Abertura'],['entrega','2. Entrega'],['angulo','Ângulo da entrega'],['aprofundamento','3. Aprofundamento'],['conversa','4. Conversa'],['reaproveitamento','5. Reaproveitamento']];
const FIN=new Set(['Caixa e Crédito','Casos Financeiros','Excedentes na Cadeia','10. Mapeamento do Ecossistema Financeiro','11. Estrutura de Dívida']);
const MENU_PADRAO={aprofundamento:['T04 + T05',['T26','T51']],conversa:['T06',['T52','T49']]};
const SERIES={
 bruno:{nome:'Bruno Analisa',dia:'Segunda',dow:1,planilha:'Bruno Analisa',funcao:'Familiaridade',
  pergunta:'Quem está falando e como essa pessoa interpreta os acontecimentos?',
  subnicho:'Donos, sócios, CFOs, diretores financeiros, controllers, gerentes e coordenadores fiscais, responsáveis tributários e contadores de empresas do Lucro Real e Presumido acima de R$ 30 milhões por ano.',
  msg:'A BHM acompanha o ambiente tributário e financeiro e traduz mudanças complexas em impactos práticos para as empresas.',
  estrutura:['O que aconteceu?','Qual é o tema envolvido?','Quem será afetado?','Qual é o impacto empresarial?','O que a empresa deve observar?','Quais são os limites ou cuidados?','Existe alguma decisão que precisa ser tomada?'],
  recortes:{
   'O Que Mudou':['F01','T18 com a mudança em uma frase na tela','Mudança pede clareza rápida. Em 30 segundos o Dr. Bruno explica o que mudou e passa a ser reconhecido como quem traduz o assunto.'],
   'Impacto para as Empresas':['F02 (+ F01 nos Stories)','Um slide por frente: caixa, processos, sistemas, escrituração, governança','O impacto se divide em frentes que o carrossel separa slide a slide, e o gerente fiscal salva e repassa ao time.'],
   'Análise de Decisões':['F01 + F07 no LinkedIn','Vídeo com a leitura do Dr. Bruno; LinkedIn com as 7 respostas da estrutura','Quem acompanha decisões é o gerente fiscal, presente no LinkedIn. O vídeo dá a leitura e o texto guarda o detalhe: tribunal, tema, limites.'],
   'Reforma na Prática':['F02','T04 na véspera do post: “o que muda na sua operação”','A Reforma tem prazos e etapas, e o carrossel serve de consulta e favorece o salvamento.'],
   'O Que a Empresa Deve Observar':['F02 em formato de checklist','T06 com enquete “sua empresa já acompanha?”','Lista de pontos de acompanhamento é conteúdo de salvar e repassar, e a enquete mostra o nível de maturidade do público.'],
   'O Que Não Pode Ser Concluído Ainda':['F07 + F01 curto','T22 (opinião): postura prudente','Separar fato de interpretação exige frases completas. O vídeo reforça a postura prudente do Dr. Bruno.'],
   'Caixa e Crédito':['F01 + F07 no LinkedIn','T18 com a mudança em uma frase; LinkedIn com o efeito no caixa e na dívida','Mudança financeira pede leitura rápida para todos e, para quem decide, o detalhe do impacto no caixa.']},
  menu:{abertura:['T01',['T02','T03','T38','T40']],entrega:['F01',['F02','F07','F08']],angulo:['',['T22','T41','T42','T46']],aprofundamento:['T04 + T05',['T26','T51']],conversa:['T06',['T36','T38','T52']],reaproveitamento:['T11 + T07',['T33','T40']]},
  obs:'Segunda: reflexão + enquete na abertura. Não republicar (o fato perde validade). Em semana de fato muito relevante: T12 (dia de pico).',
  medir:'Alcance, visualizações e retenção do vídeo, e alcance em não seguidores.'},
 casos:{nome:'Casos que Ensinam',dia:'Terça',dow:2,planilha:'Casos que Ensinam',funcao:'Aprendizado',
  pergunta:'Esse tipo de problema acontece de verdade?',
  subnicho:'Empresas da indústria, distribuição e e-commerce acima de R$ 30 milhões por ano, e profissionais fiscais, financeiros, contábeis e jurídicos que reconhecem a situação.',
  msg:'Decisões tributárias e financeiras produzem efeitos reais sobre a operação, os dados, os documentos e o caixa da empresa.',
  estrutura:['Copy do tema: a chamada do tema a ser tratado no carrossel','Problemática: explicar o tema com objetividade','Entendimento do contribuinte: a tese ou a interpretação defendida pelo contribuinte','Cenário atual do tema: recurso repetitivo ou repercussão geral, qual é o Tema, se já houve trânsito em julgado (tese não julgada nunca é consolidada)','Como identificar a oportunidade na empresa: documentos necessários e caminho para identificar (por exemplo, EFD Contribuições, registro C170 do Bloco C)','Fechamento: o que a empresa deve observar, sem promessa de resultado'],
  recortes:{
   'Casos Públicos':['F02','T04: o desfecho só é revelado no post','História com começo e fim vira sequência de slides, e a fonte oficial dá credibilidade.'],
   'Casos Anonimizados':['F02','Retirar nome, CNPJ e qualquer dado identificável antes de produzir. Fonte possível: T44, sempre anonimizado','Mostra a experiência da BHM, e o carrossel permite contar o caso sem expor o cliente.'],
   'Decisões que Ensinam':['F02 + F01 curto','Vídeo do Dr. Bruno com a lição em uma frase','A decisão é o fato e a lição é a interpretação: o carrossel conta o caso e o vídeo entrega a lição.'],
   'Casos por Setor':['F02','Capa com o setor; T01 com pergunta ao setor','Quem é do setor se reconhece já na capa e continua lendo.'],
   'O Caso e a Lição':['F01 + F02 resumido','Vídeo com a lição; carrossel curto com o caso','Uma lição principal cabe em um vídeo curto, e o carrossel fica como registro do caso.'],
   'O Que Poderia Ter Sido Observado':['F02 em formato de checklist','T06 com enquete “você teria observado?”','Lista retrospectiva de pontos se entende melhor em slides, e a enquete leva o leitor a testar a própria empresa.'],
   'Casos Financeiros':['F02','Só números públicos ou autorizados pelo Dr. Bruno; sem confirmação, escrever sem o dado e marcar [CONFERIR]','O carrossel mostra a problemática, o cenário atual e onde estava o dinheiro parado: é a prova do pilar Ecossistema.']},
  menu:{abertura:['T01',['T03']],entrega:['F02',['F01','T13']],angulo:['',['T27','T22','T46']],aprofundamento:['T04 + T05',['T26','T51']],conversa:['T06',['T52','T49']],reaproveitamento:['T09 + T10',['T30','T33']]},
  obs:'Pergunta-gancho na abertura; suspense do desfecho no aprofundamento; “você decidiria igual?” no fim do dia. Só casos reais, públicos ou anonimizados. Carrossel em 6 slides, um por etapa. T27: o cenário atual do tema ou a oportunidade primeiro.',
  medir:'Salvamentos e compartilhamentos.'},
 setores:{nome:'Mapeando Setores',dia:'Quarta',dow:3,planilha:'Mapeando Setores',funcao:'Identificação setorial',
  pergunta:'Como isso pode aparecer no meu setor?',
  subnicho:'Foco estrito: Indústria, Distribuição e Atacado, E-commerce, acima de R$ 30 milhões por ano. Outros setores só com experiência comprovada.',
  msg:'Cada operação é única. A análise tributária e financeira precisa compreender o funcionamento real de cada setor.',
  estrutura:['Como o setor funciona?','Quais são os principais fluxos?','Quais documentos e dados são relevantes?','Quais tributos ou pontos fiscais e financeiros merecem atenção?','Onde podem surgir divergências?','O que uma empresa do setor deveria acompanhar?'],
  recortes:{
   'A Operação do Setor':['F03 (+ F01 com T15)','Vídeo andando pelo ambiente, quando houver acesso','Como o setor funciona é uma sequência, e o fluxo desenhado mostra isso.'],
   'Compras, Vendas e Estoque':['F03','Fluxo com o ponto fiscal de cada etapa','Compra, estoque e venda formam uma linha do tempo que pode ser desenhada.'],
   'Documentos e Dados':['F03','Mapa dos documentos que circulam e dos dados de cada um','Quem fecha a escrituração reconhece os documentos ao vê-los em ordem.'],
   'Pontos Fiscais de Atenção':['F02 em formato de checklist','T06 com enquete “quais desses você acompanha?”','Pontos de atenção são lista e se guardam melhor em slides.'],
   'Operações Interestaduais':['F03','Mapa com origem, destino, documentos e tributos em cada trecho','O tema é geográfico e sequencial, e o mapa deixa isso visível.'],
   'Riscos da Operação':['F01 + F03','T22 (erro comum) na abertura; vídeo “onde costuma haver divergência”','Risco é alerta: o vídeo com um erro comum chama atenção e o fluxo mostra onde o ponto aparece.'],
   'O Que uma Análise Pode Observar':['F01 + F03','T04: “como a BHM olha isso”, apontando para a Metodologia','Faz a ponte do setor para o método, preparando a sexta.'],
   'Excedentes na Cadeia':['F03','Fluxo do dinheiro entre fornecedor, empresa e cliente, marcando onde ele fica parado','Prazos e saldos formam um caminho, e o desenho mostra onde o capital excedente aparece no setor.']},
  menu:{abertura:['T01',['T03']],entrega:['F03 + F01',['F02','F08']],angulo:['',['T22','T23','T27']],aprofundamento:['T04 + T05',['T26','T51']],conversa:['T06',['T52','T49']],reaproveitamento:['T09 + T10',['T30','T33']]},
  obs:'Pergunta sobre o setor na abertura. F01 com T15 quando houver acesso ao ambiente. T43 (música) em carrossel, conferindo o direito de uso.',
  medir:'Comentários, respostas nos Stories, compartilhamentos e visitas ao perfil.'},
 cargo:{nome:'Pela Ótica do Cargo',dia:'Quinta',dow:4,planilha:'Pela Ótica do Cargo',funcao:'Identificação profissional',
  pergunta:'O que eu, na minha função, deveria observar ou decidir?',
  subnicho:'Dono ou Sócio, CFO, Diretor Financeiro, Controller, Gerente Fiscal, Coordenador Fiscal, Responsável Tributário, Contador. O cargo aparece no título, na capa ou no subtítulo.',
  msg:'A análise tributária e financeira precisa apoiar decisões em todos os níveis hierárquicos.',
  estrutura:['Qual cargo está sendo abordado?','Qual situação esse profissional enfrenta?','Qual pergunta deveria ser feita?','Quais informações precisam ser verificadas?','Qual risco existe se o ponto não for analisado?','O que precisa ser integrado?','Qual decisão ou providência merece atenção?'],
  recortes:{
   'Perguntas que o Cargo Deveria Fazer':['F04','Abrir com a pergunta, dita e escrita na tela (T18). Fonte possível: T34, sempre anonimizada','A pergunta dirigida ao cargo é o próprio gancho do vídeo.'],
   'O Que o Cargo Deve Verificar':['F02 em formato de checklist','T01 com enquete pelo cargo','Verificações formam uma lista, e o profissional guarda para consultar.'],
   'O Que Pode Representar um Risco':['F04','T22 (erro comum): o risco na primeira frase','O risco dito logo no início prende a atenção de quem tem aquela responsabilidade.'],
   'O Que Precisa Ser Integrado':['F03','Diagrama dos sistemas e áreas que precisam conversar','O controller vive de integração entre sistemas, e o diagrama mostra onde os dados deixam de conversar.'],
   'O Que Deve Ser Levado para a Diretoria':['F07 + F04 curto','Texto em linguagem de caixa e decisão','A diretoria lê resumo executivo, e o texto no LinkedIn se adapta a esse leitor.'],
   'Antes de Aprovar':['F04 + F02','Vídeo dirigido ao CFO ou ao dono; checklist em carrossel','A decisão final é de quem aprova o investimento: o vídeo fala direto com ele e o checklist serve para levar à reunião.']},
  menu:{abertura:['T01',['T03','T38']],entrega:['F04',['F07','F02','F03']],angulo:['',['T41','T22','T23','T34']],aprofundamento:['T04 + T05',['T26','T51']],conversa:['T06',['T52','T49']],reaproveitamento:['T21 + T11',['T33','T24']]},
  obs:'Enquete por cargo na abertura. T41: “mande para o seu controller”. T34 sempre anonimizado. T24 só com retornos reais autorizados.',
  medir:'Comentários, respostas nos Stories, compartilhamentos e visitas ao perfil.'},
 metodo:{nome:'Metodologia BHM em Foco',dia:'Sexta',dow:5,planilha:'Metodologia BHM em Foco',funcao:'Confiança e reunião',
  pergunta:'Como a BHM analisa essa situação de forma estruturada?',
  subnicho:'Empresas do Lucro Real e Presumido acima de R$ 30 milhões por ano, estruturadas, com departamento fiscal ou controladoria própria: o público mais próximo de uma reunião.',
  msg:'Uma análise consistente depende de como os dados são lidos, como o negócio é entendido, como cada tese é classificada por risco e como cada conclusão é checada.',
  estrutura:['A situação: qual é o cenário apresentado no post','Como acontece no mercado: como essa situação costuma aparecer na prática','O que a análise da BHM observa: o critério ou a leitura que a metodologia aplica','Por que importa: o efeito para a empresa','O que muda no resultado: a diferença que esse cuidado faz'],
  recortes:{
   '1. O Que uma Revisão Anterior Pode Não Ter Identificado':['F05 comparativo (+ F01)','Escopo limitado × análise da operação inteira; T10 para ampliar o alcance','É o recorte mais comercial: o contraste desenha a diferença, e como precisa de alcance, entra em turbinar.'],
   '2. Como os Documentos Fiscais São Lidos':['F05 + F01','Exemplo de códigos lidos e não lidos','A leitura ampla dos documentos aparece melhor com exemplo lado a lado.'],
   '3. Validação e Segurança Fiscal':['F05 em formato de checklist','Documentos, prazos, escrituração, habilitação, compensação, restituição','São requisitos em lista, para consultar antes de agir.'],
   '4. Conhecer o Negócio Antes de Analisar':['F01 (+ T15)','Dr. Bruno conta por que começa pelo negócio','É explicação de postura, e o vídeo pessoal traz credibilidade.'],
   '5. Como Classificamos uma Tese por Risco':['F03','Esquema em três níveis: Robusta, Defensável, Excluída por cautela','Uma classificação em níveis se entende melhor visualmente.'],
   '6. Por Que Toda Conclusão Passa por uma Segunda Checagem':['F01 curto','Explicar a lógica da revisão em 30 a 60 segundos','É uma ideia simples que cabe em vídeo curto.'],
   '7. Camadas da Análise':['F03','Diagrama em camadas: operação, documentos, escrituração, contabilidade, fiscal, financeiro, jurídico','A integração entre camadas é um diagrama.'],
   '8. Mapa de Oportunidades':['F05','Modelo de mapa ou checklist (material rico para a Frente 3)','Organiza tributos, operações, períodos e riscos, e serve de insumo para o funil.'],
   '9. Da Operação ao Diagnóstico':['F06 + F05 resumido','Vídeo longo (YouTube) e carrossel-resumo','Fecha o caminho da metodologia, que é o mais denso. Os cortes do vídeo longo viram Reels.'],
   '10. Mapeamento do Ecossistema Financeiro':['F03 (+ F01)','Diagrama: tesouraria, fornecedores, clientes e onde estão os excedentes','Mostra o método pelo resultado, sem expor ferramenta (tecnologia sem palco).'],
   '11. Estrutura de Dívida':['F05','Comparativo de custo e composição da dívida, com exemplo hipotético identificado','Comparar alternativas é conteúdo de ler com calma e guardar.']},
  menu:{abertura:['T01',['T03']],entrega:['F05 + F06',['F01','F03']],angulo:['',['T27','T22','T46']],aprofundamento:['T04 + T05',['T26','T51','T30']],conversa:['T06',['T52','T49']],reaproveitamento:['T09 + T10',['T30','T24']]},
  obs:'Pergunta técnica na abertura. F06 depende do YouTube ativo; enquanto isso, F05 + F01. Evitar T32 nesta série. T49 com convite a salvar.',
  medir:'Salvamentos, mensagens e pedidos de conversa.'},
 leve:{nome:'Sábado: conteúdo leve',dia:'Sábado',dow:6,planilha:'Conteúdo leve (sábado)',funcao:'Presença e familiaridade',
  pergunta:'Fora das séries: bastidor ou reflexão curta do Dr. Bruno.',
  subnicho:'Mesmo público geral, sem conteúdo tributário ou financeiro.',
  msg:'Manter a presença do perfil e reforçar a familiaridade, sem análise nem fato técnico.',
  estrutura:['Qual bastidor ou reflexão curta será mostrado?','Qual frase fecha o vídeo?'],
  recortes:{'Bastidor ou reflexão':['T16 ou F01 leve (pode usar T15)','Sem documentos, dados de clientes ou fato técnico','Espaço de presença e familiaridade.']},
  menu:{abertura:['T02',['T03','T38','T40']],entrega:['T16',['F01']],angulo:['',['T42','T32']],aprofundamento:['T05',[]],conversa:['T06',['T38']],reaproveitamento:['',[]]},
  obs:'Não fazer: fato, análise ou caso técnico; documentos ou dados de clientes; promessa de resultado; T09 e T10.',
  medir:'Alcance e respostas nos Stories (revisar depois de 4 semanas).'},
 extra:{nome:'Post extra (urgente)',dia:'Qualquer dia',dow:null,planilha:'Post extra (urgente)',funcao:'Familiaridade (fato urgente)',
  pergunta:'Fato urgente publicado como Bruno Analisa, sem substituir a pauta do dia.',
  subnicho:'Mesmo subnicho de Bruno Analisa.',
  msg:'A BHM não perde o momento do fato e mantém a lógica da semana.',
  estrutura:['O que aconteceu?','Qual é o tema envolvido?','Quem será afetado?','Qual é o impacto empresarial?','O que a empresa deve observar?','Quais são os limites ou cuidados?','Existe alguma decisão que precisa ser tomada?'],
  recortes:{'Fato urgente':['F01 curto com T18 (ou F07, se o fato pedir ressalvas)','Horário diferente do post do dia, com pelo menos 30 minutos de intervalo (T29)','Mantém os dias e a lógica da semana, e a BHM não perde o momento do fato.']},
  menu:{abertura:['',['T01','T03']],entrega:['F01',['F07']],angulo:['',['T22','T32']],aprofundamento:['',['T04 + T05','T51']],conversa:['',['T06','T52']],reaproveitamento:['',['T11']]},
  obs:'Se trouxer interpretação jurídica nova, o Dr. Bruno revisa por mensagem antes de publicar.',
  medir:'Alcance, visualizações e retenção do vídeo.'}
};
const SERIE_ORDEM=['bruno','casos','setores','cargo','metodo','leve','extra'];
const TIPOS=[
 ['fato','Fato novo, notícia, mudança de lei ou decisão recente','bruno'],
 ['caso','Caso concreto já concluído, público ou anonimizável','casos'],
 ['cargo','Dúvida ou situação de um cargo específico','cargo'],
 ['setor','Questão sobre a operação de um setor','setores'],
 ['metodo','Explicação de como a própria BHM analisa ou audita algo','metodo'],
 ['doutrina','Conceito ou explicação doutrinária, sem fato concreto',null],
 ['tese','Conteúdo sobre teses ou Reforma Tributária',null]];
const REVCOM=[
 ['fonte','A fonte foi conferida e está citada, e não sobrou [CONFERIR] sem resposta?'],
 ['inventado','Nenhum número, lei, artigo, Tema ou decisão foi inventado?'],
 ['separa','O texto separa fato, interpretação e opinião?'],
 ['promessa','Não há promessa de resultado nem nome de cliente, valor de caso ou dado de empresa sem autorização do Dr. Bruno?'],
 ['hipotetico','Exemplo hipotético está identificado como tal?'],
 ['gancho','O título é específico, há 2 opções de gancho e o gancho aparece nos primeiros segundos?'],
 ['claro','Uma pessoa que não é advogada entende o texto, e há uma só ideia central?'],
 ['pacote','Formato e táticas batem com o pacote do recorte e com o menu da série?'],
 ['seo','Palavra-chave no título, na primeira frase da legenda e na fala; 5 hashtags no padrão (T45)?'],
 ['voz','Voz da BHM: sem travessão, sem clichê, sem excesso de emoji, sem alarmismo, sem desmerecer concorrentes?'],
 ['visual','Sem marca d’água de outros aplicativos (T53), texto na tela legível, logo oficial?'],
 ['tamanhos','Letras no tamanho mínimo (título a partir de 80 px, apoio a partir de 30 px, rótulos a partir de 24 px) e logo visível, inclusive sobre a foto?'],
 ['fotofundo','Na foto de fundo, há camada de cor e o título não cobre o rosto?'],
 ['codigos','Nenhum código de produção na arte e direito de uso da imagem confirmado?']];
const REVVIS=[
 ['tamanho','Tamanho certo para a rede (1080 × 1440 ou 1080 × 1350) e nada a menos de 88 px das bordas.'],
 ['doispesos','Título em dois pesos, com a ideia central em negrito na linha própria.'],
 ['minimos','Nenhum texto abaixo dos mínimos: título 80 px, apoio 30 px, rótulos 24 px.'],
 ['cores','Cores só da paleta; dourado em texto sobre claro só #9A7B3C.'],
 ['rotulo','Rótulo da série no topo; numeração em todos os slides do carrossel.'],
 ['logo','Logo oficial, na versão que contrasta, na posição do modo de imagem.'],
 ['foto','Foto em área própria ou com camada de cor; rosto livre; direito de uso confirmado.'],
 ['tarja','No máximo uma tarja por slide.'],
 ['fonte','Fonte citada no rodapé quando há decisão ou norma, e completa no último slide.'],
 ['limpo','Nenhum [CONFERIR], código de produção ou marca d’água de outro aplicativo.'],
 ['versoes','Versões escura e clara entregues; carrossel leve para Instagram e Facebook e completo para o LinkedIn.']];
const CARR={bruno:['Capa','O que aconteceu','Quem é afetado','O impacto','Os limites','O que fazer agora','Fonte'],casos:['Copy do tema','Problemática','Entendimento do contribuinte','Cenário atual do tema','Como identificar a oportunidade na empresa','Fechamento']};
const MODOS=[['sem','Sem foto'],['area','Foto em área reservada'],['fundo','Foto de fundo com camada de cor']];
const REVTEC=[
 ['interp','A interpretação jurídica está correta e dentro dos limites da decisão ou norma?'],
 ['tese','Tese não julgada no STF ou no STJ aparece com o Tema e o status real, nunca como consolidada?'],
 ['termos','Os termos técnicos estão certos (por exemplo, “períodos não prescritos”)?'],
 ['conferir','Os [CONFERIR] técnicos foram respondidos?'],
 ['risco','Não há risco de ser lido como promessa de resultado ou como orientação para um caso específico?']];
const CANAL_NOTA={Instagram:'Carrossel e post em 1080 × 1440 (3:4), versão leve: frases curtas e uma ideia por slide. Canal de todas as táticas de Stories.',LinkedIn:'Tom mais analítico. Carrossel completo em 1080 × 1350 (4:5) publicado como documento (PDF) e post único com imagem própria e texto em primeira pessoa do Dr. Bruno.',YouTube:'Shorts reaproveita o Reels; vídeo longo cabe à Metodologia.',Facebook:'Republica o Reels e o carrossel do Instagram, sem produção própria.'};
const BRIEFING=`QUEM É A BHM
Você trabalha para o escritório Bruno Morais & Advogados Associados (BHM Advogados), de Curitiba/PR, com dez anos atendendo empresas de médio e grande porte em advocacia tributária e financeira, com tecnologia própria como núcleo. Na tributária, recuperação de créditos é uma das frentes, não a única. Na financeira, mostrar ao empresário que ele é dono de um ecossistema financeiro muito rentável (como o float de tesouraria) e que falta a informação chegar de forma estruturada para capturar esse capital excedente. Estruturação de dívida subsidiada também é frente.
PÚBLICO
Donos, sócios, CFOs, diretores financeiros, controllers, gerentes e coordenadores fiscais, responsáveis tributários e contadores de empresas do Lucro Presumido e Real com faturamento acima de R$ 30 milhões por ano. Setores prioritários: indústria, distribuição e atacado, e e-commerce. Não é Simples Nacional nem pessoa física.
VOZ
Direta, técnica e sóbria. Autoridade pela contenção. Exemplos simples de casos práticos facilitam os temas técnicos. Traduza o técnico em impacto de caixa e decisão do empresário. Escreva como gente. NUNCA use travessão (—) nem vícios de texto de IA. Nada de clichê de coach, excesso de emoji ou "imperdível". Sem alarmismo e sem desmerecer concorrentes (regras de publicidade da advocacia). Português do Brasil.
PILARES
1. Metodologia tributária e financeira com tecnologia própria. 2. Decisões com base em números provados. 3. Tecnologia sem palco. 4. Ecossistema: toda empresa deixa dinheiro na mesa por não rentabilizar os excedentes financeiros da cadeia de fornecedores e clientes.
REGRAS DE CONTEÚDO TÉCNICO
Nunca invente número, percentual, lei, artigo, Tema ou decisão. Na dúvida, escreva sem o dado e sinalize [CONFERIR]. Tese ainda não julgada no STF/STJ nunca é "consolidada": cite o Tema e o status real. Antes de chamar um fato de "recente" ou "novo", confira a data; fato antigo leva a data no texto. Separe fato, interpretação e opinião. Use "períodos não prescritos", não "não decaídos". Casos só reais, públicos ou anonimizados; exemplo criado para explicar um conceito é sempre identificado como "exemplo hipotético". Não cite nome de cliente, valor de caso ou dado de empresa sem autorização expressa do Dr. Bruno. Não prometa resultado garantido.
IDENTIDADE VISUAL (Manual de Padrão Visual)
Paleta: navy #071F34, dourado #C9A961, creme #F5F0E6 e branco; dourado de texto #9A7B3C só para texto sobre fundo claro; apoio #E6E1D6 no escuro e #3D4A5A no claro. Muito respiro, grade limpa. Serifa nos títulos (Cormorant Garamond), Inter no apoio. Títulos em dois pesos: a linha de contexto em traço fino (400) e a ideia central em negrito (700), em linha própria. Tamanhos mínimos no arquivo de 1080 px: título 80 px, apoio 30 px, rótulos 24 px. Tarja de destaque: no máximo uma palavra-chave por slide. Logo oficial em todas as peças, nunca recriada: ícone claro em fundo escuro e ícone navy em fundo claro; com área de foto, no canto superior direito da foto; nas demais, no rodapé. Losango como elemento gráfico. Formatos: Instagram e Facebook em 1080 × 1440 (3:4), versão leve, frases curtas e uma ideia por slide; LinkedIn em 1080 × 1350 (4:5), carrossel completo em PDF e post único com imagem própria. Conteúdo a pelo menos 88 px das bordas. Imagem em três modos: sem foto, foto em área reservada ou foto de fundo com camada de cor; nunca texto direto sobre a foto e o título nunca cobre o rosto. Toda peça em versão escura e clara; os slides do carrossel alternam escuro e claro, começando pela capa escura. Foto de produto, de marca ou de terceiros só entra com direito de uso confirmado.
ESTRUTURA DO CARROSSEL
Bruno Analisa (7 slides): 1 Capa (título em dois pesos e "Arraste para entender"), 2 O que aconteceu (fato, data e fonte; pode ter caixa de destaque com a citação oficial), 3 Quem é afetado, 4 O impacto (cartões de leitura quando houver duas leituras), 5 Os limites (exemplo hipotético identificado), 6 O que fazer agora (lista numerada), 7 Fonte (processo, órgão, datas e chamada para salvar ou enviar). Casos que Ensinam (6 slides): copy do tema, problemática, entendimento do contribuinte, cenário atual do tema, como identificar a oportunidade na empresa, fechamento. Demais séries: capa, blocos que agrupam as perguntas da estrutura e fonte. Numeração em todos os slides; fonte no rodapé dos slides que citam decisão ou norma, e completa no último.
ENTREGA DE CRIATIVOS
Indique a série e o recorte. Carrossel: slide a slide (título curto, texto de apoio, sugestão visual), depois legenda e hashtags. As perguntas da estrutura são roteiro de quem escreve: entram agrupadas em blocos, nunca como perguntas nos slides; fonte no último slide. Hashtags: 5 por post, 3 super específicas do tema central exato e 2 de categoria média do segmento; nada genérico. Reels: gancho nos 3 primeiros segundos, roteiro em blocos e texto de tela. Stories: sequência curta com começo, meio e fim, texto resumido em cada tela. LinkedIn: post único com imagem própria em 1080 × 1350 e carrossel completo publicado como documento (PDF); texto em primeira pessoa do Dr. Bruno, com a leitura e as ressalvas. Legenda com a palavra-chave na primeira frase. Sempre 2 opções de gancho/título. O primeiro slide para o dedo: pergunta incômoda, número real ou reenquadramento. Chamada final provisória (T49): salvar, reassistir ou enviar; nunca "comente para receber no direct". [CONFERIR] nunca pode ir para a peça publicada: ele serve para a revisão.
REVISÃO
Conteúdo jurídico técnico novo passa pela revisão do Dr. Bruno antes de publicar.`;
/* ============ Estado e utilidades ============ */
const S={db:null,user:null,room:null,sample:null,downloads:null,assets:null,ready:false,noDb:false,
 me:{id:null,name:'',avatar:'',color:'#C9A961'},equipe:{},marca:{},pautas:{},atividade:[],hist:[],histPid:null,histUnsub:null,peers:[],profiles:{},
 view:'painel',pid:null,quick:{t:'',l:''},auto:null,autoHide:{},etapa:1,week:null,filtro:{q:'',serie:'',so:''},gen:null,prop:null,planTodos:false,canWrite:true,modalOpen:false};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nowISO=()=>new Date().toISOString();
const todayStr=()=>{const d=new Date();return ymd(d)};
function ymd(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function parseYmd(s){if(!s)return null;const [y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d)}
function fmtD(s){const d=parseYmd(s);return d?d.toLocaleDateString('pt-BR'):''}
function mondayOf(d){const x=new Date(d.getFullYear(),d.getMonth(),d.getDate());const w=(x.getDay()+6)%7;x.setDate(x.getDate()-w);return x}
function ago(iso){if(!iso)return '';const s=(Date.now()-new Date(iso).getTime())/1000;if(s<60)return 'agora';if(s<3600)return 'há '+Math.floor(s/60)+' min';if(s<86400)return 'há '+Math.floor(s/3600)+' h';const d=Math.floor(s/86400);if(d<7)return 'há '+d+(d>1?' dias':' dia');return new Date(iso).toLocaleDateString('pt-BR')}
function getPath(o,p){return p.split('.').reduce((a,k)=>a==null?a:a[k],o)}
function nestObj(p,v){const ks=p.split('.');const r={};let c=r;ks.forEach((k,i)=>{if(i===ks.length-1)c[k]=v;else{c[k]={};c=c[k]}});return r}
function uidShort(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
function toast(msg){const t=$('#toast');t.textContent=msg;t.hidden=false;clearTimeout(toast._t);toast._t=setTimeout(()=>t.hidden=true,2600)}
function tlabel(code){if(!code)return '';return code.split('+').map(c=>c.trim()).map(c=>{const k=c.slice(0,3);return (TAT[k]||FMT[k])?k+' '+(TAT[k]||FMT[k])+c.slice(3):c}).join(' + ')}
function papelOf(id){return S.equipe[id]?.papel||null}
function isBruno(id){return papelOf(id)==='bruno'}
function nameOf(id){if(!id)return 'Alguém';if(id===S.me.id&&S.me.name)return S.me.name;return S.profiles[id]?.name||S.equipe[id]?.nome||'Alguém'}
function initials(n){return (n||'?').split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase()}
function av(id,sm){const p=S.profiles[id];const n=nameOf(id);const col=p?.color||S.equipe[id]?.cor||'#7a8699';
 const img=p?.avatarUrl&&!String(p.avatarUrl).startsWith('data:')?`<img alt="" src="${esc(p.avatarUrl)}">`:esc(initials(n));
 return `<span class="av${sm?' sm':''}" style="background:${esc(col)}" title="${esc(n)}">${img}</span>`}
function who(id){const pp=papelOf(id);return esc(nameOf(id))+(pp?` <span class="muted">(${esc(PAPEIS[pp].n)})</span>`:'')}
let _profT=null,_profReq=new Set();
function wantProfiles(ids){if(!S.user)return;const need=[...new Set(ids)].filter(i=>i&&!S.profiles[i]&&!_profReq.has(i)&&!String(i).startsWith('local-'));if(!need.length)return;need.forEach(i=>_profReq.add(i));
 clearTimeout(_profT);_profT=setTimeout(async()=>{const list=[..._profReq].filter(i=>!S.profiles[i]);try{const ps=await S.user.profiles(list);Object.assign(S.profiles,ps)}catch(e){}refresh()},50)}
function serieOf(p){return SERIES[p?.serie]||null}
function pautaList(){return Object.entries(S.pautas).map(([id,d])=>({id,...d}))}
function conferirCount(p){const txt=[p.assunto,p.fonte2?.fato,p.fonte2?.interpretacao,p.fonte2?.limites,p.fonte2?.naoAfirmar,p.criativo,JSON.stringify(p.prev||{})].join(' ');return (txt.match(/\[CONFERIR\]/g)||[]).length}
function precisaBruno(p){const r=[];if(p.tecnicoNovo&&p.aprovTec?.resultado!=='aprovado')r.push('Revisão técnica');if(p.fonte2?.duvida&&!p.fonte2?.resposta)r.push('Dúvida jurídica');if(p.precisaValidacao&&!p.validacao?.ok)r.push('Validação de método');return r}
function diasDesde(s){const d=parseYmd(s);if(!d)return null;return Math.floor((Date.now()-d.getTime())/86400000)}

/* ============ Gravação no banco ============ */
const _q={};
function queue(key,fn){const prev=_q[key]||Promise.resolve();const n=prev.catch(()=>{}).then(fn);_q[key]=n;return n}
async function writePauta(pid,patch){
 if(!S.db){toast('Sem conexão com o banco: nada foi salvo.');return}
 if(!S.pautas[pid]){toast('Esta pauta foi apagada por alguém da equipe.');return}
 patch.atualizadoPor=S.me.id;patch.atualizadoEm=nowISO();
 try{await queue('p:'+pid,()=>S.db.doc('pautas/'+pid).update(patch))}
 catch(e){handleWriteErr(e)}
}
function handleWriteErr(e){if(e?.code==='invalid_argument'){S.canWrite=false;toast('Você não tem permissão para editar este projeto. Peça ao administrador para liberar o seu e-mail.')}else if(e?.code==='quota_exceeded')toast('O banco do projeto está cheio. Apague pautas antigas para liberar espaço.');else toast('Não foi possível salvar agora. Tente de novo em instantes.')}
const _logThrottle={};
async function logAct(pid,acao,opts={}){
 if(!S.db)return;
 const k=pid+'|'+acao;if(opts.throttle){const last=_logThrottle[k]||0;if(Date.now()-last<5*60*1000)return;_logThrottle[k]=Date.now()}
 const p=S.pautas[pid];
 const entry={pautaId:pid||'',pautaTitulo:(p?.titulo||opts.titulo||'').slice(0,140),por:S.me.id,papel:papelOf(S.me.id)||'',em:nowISO(),acao,parteBruno:!!opts.bruno};
 try{await S.db.collection('atividade').add(entry)}catch(e){}
}

/* ============ Campos ligados ao banco ============ */
const _deb={};
function fieldValue(el){if(el.type==='checkbox')return el.checked;if(el.type==='number'){return el.value===''?null:Number(el.value)}return el.value}
async function saveField(el){
 const pid=el.dataset.pid||S.pid;const path=el.dataset.f;if(!pid||!path)return;
 const v=fieldValue(el);const p=S.pautas[pid]||{};if(getPath(p,path)===v)return;
 const patch=nestObj(path,v);const inBruno=!!el.closest('.bruno');
 if(inBruno)patch.brunoEdit={by:S.me.id,at:nowISO()};
 await writePauta(pid,patch);
 const lab=el.dataset.label||path;
 logAct(pid,(el.type==='checkbox'?(v?'marcou “':'desmarcou “'):'editou “')+lab+'”',{throttle:el.type!=='checkbox',bruno:inBruno});
}
document.addEventListener('input',e=>{const el=e.target.closest('[data-f]');if(!el||el.type==='checkbox'||el.tagName==='SELECT')return;
 const k=(el.dataset.pid||S.pid)+'|'+el.dataset.f;clearTimeout(_deb[k]);_deb[k]=setTimeout(()=>saveField(el),700)});
document.addEventListener('change',e=>{const el=e.target.closest('[data-f]');if(!el)return;const k=(el.dataset.pid||S.pid)+'|'+el.dataset.f;clearTimeout(_deb[k]);
 if(el.dataset.special){special(el);return}saveField(el)});
document.addEventListener('focusout',e=>{const el=e.target.closest('[data-f]');if(el&&(el.tagName==='TEXTAREA'||['text','url','number','date','time'].includes(el.type))){const k=(el.dataset.pid||S.pid)+'|'+el.dataset.f;if(_deb[k]){clearTimeout(_deb[k]);_deb[k]=null;saveField(el)}}setTimeout(()=>{if(!activeField())refresh()},120)});
function activeField(){const a=document.activeElement;return a&&a.closest&&a.closest('#main')&&(a.matches('input,textarea,select'))?a:null}

/* Mudanças que reorganizam a etapa (série, recorte, tipo de material) */
async function special(el){
 const pid=S.pid;const p=S.pautas[pid]||{};const v=el.value;const kind=el.dataset.special;
 if(kind==='serie'){const s=SERIES[v];const patch={serie:v,recorte:'',formato:'',ajuste:'',toques:{abertura:'',entrega:'',angulo:'',aprofundamento:'',conversa:'',reaproveitamento:''}};
  if(s?.dow&&!p.dataPublicacao){patch.dataPublicacao=ymd(nextDow(s.dow))}
  await writePauta(pid,patch);logAct(pid,'definiu a série “'+(s?.nome||'nenhuma')+'”')}
 else if(kind==='recorte'){const s=serieOf(p);const r=s?.recortes[v];const m=s?.menu||{};
  const toques={};TOQUES.forEach(([k])=>{toques[k]=(m[k]?.[0])||''});
  const patch={recorte:v,formato:r?r[0]:'',ajuste:r?r[1]:'',toques};
  await writePauta(pid,patch);logAct(pid,'definiu o recorte “'+v+'” e aplicou o pacote do dia')}
 else if(kind==='tipo'){await writePauta(pid,{tipoMaterial:v});logAct(pid,'classificou o tipo de material',{throttle:true})}
 else if(kind==='status'){await setStatus(pid,v)}
 refresh(true);
}
function nextDow(dow){const d=new Date();const diff=(dow-d.getDay()+7)%7||7;d.setDate(d.getDate()+diff);return d}

async function setStatus(pid,st){
 const p=S.pautas[pid];if(!p||p.status===st)return;
 if((st==='Aprovada'||st==='Publicada')&&conferirCount(p)){alert('Ainda há '+conferirCount(p)+' marcação(ões) [CONFERIR] nesta pauta (texto, criativo ou prévia). Pelo Manual de Padrão Visual, [CONFERIR] nunca pode ir para a peça publicada. Resolva antes de aprovar.');refresh(true);return}
 if(st==='Aprovada'){const falta=[];const rc=p.revCom||{};const nCom=REVCOM.filter(([k])=>!rc[k]).length;if(nCom)falta.push(nCom+' item(ns) da revisão de comunicação');
  if(p.tecnicoNovo&&p.aprovTec?.resultado!=='aprovado')falta.push('a revisão técnica do Dr. Bruno (conteúdo jurídico técnico novo)');
  const nVis=REVVIS.filter(([k])=>!(p.revVis||{})[k]).length;if(nVis)falta.push(nVis+' item(ns) do padrão visual da agência');
  if(p.modoImagem&&p.modoImagem!=='sem'&&!p.fotoDireito)falta.push('a confirmação do direito de uso da foto');
  if(falta.length&&!confirm('Ainda falta: '+falta.join('; ')+'.\n\nAprovar mesmo assim? Isso fica registrado no histórico.')){refresh(true);return}
  if(falta.length){await writePauta(pid,{status:st});logAct(pid,'aprovou com pendências: '+falta.join('; '));refresh(true);return}}
 await writePauta(pid,{status:st});logAct(pid,'mudou o status para “'+st+'”');refresh(true);
}
async function concluirEtapa(n){
 const pid=S.pid;const p=S.pautas[pid];const e=ETAPAS[n-1];const patch={etapas:{[n]:{by:S.me.id,at:nowISO()}}};
 if(n>=7&&conferirCount(p)){alert('Ainda há '+conferirCount(p)+' marcação(ões) [CONFERIR] nesta pauta. [CONFERIR] nunca pode ir para a peça publicada: resolva antes de concluir esta etapa.');return}
 const iCur=STATUS.indexOf(p.status||'Recebida'),iNew=STATUS.indexOf(e.st);if(iNew>iCur)patch.status=e.st;
 if(n===7&&p.tecnicoNovo&&p.aprovTec?.resultado!=='aprovado'){if(!confirm('Esta pauta é conteúdo jurídico técnico novo e ainda não tem a aprovação técnica do Dr. Bruno. Concluir a revisão mesmo assim?'))return;delete patch.status}
 await writePauta(pid,patch);logAct(pid,'concluiu a etapa '+n+' ('+e.t+')');
 if(n<8){S.etapa=n+1;announce()}refresh(true);
}
async function reabrirEtapa(n){await writePauta(S.pid,{etapas:{[n]:null}});logAct(S.pid,'reabriu a etapa '+n+' ('+ETAPAS[n-1].t+')');refresh(true)}

/* ============ Presença (quem está onde agora) ============ */
function announce(){if(S.room){S.room.presence({uid:S.me.id,view:S.view,pid:S.pid||null,etapa:S.view==='pauta'?S.etapa:null}).catch(()=>{})}}
function peerId(p){return p.by||p.presence?.uid||null}
function peersOn(pid,etapa){return S.peers.filter(p=>p.presence?.pid===pid&&(etapa==null||p.presence?.etapa===etapa)).map(peerId).filter(Boolean)}
function uniq(a){return [...new Set(a)]}

/* ============ Navegação ============ */
function go(view,extra={}){
 if(view!=='pauta'&&S.histUnsub){S.histUnsub();S.histUnsub=null;S.histPid=null;S.hist=[]}
 S.view=view;Object.assign(S,extra);S.prop=null;
 if(view==='pauta')subHist(S.pid);
 announce();refresh(true);window.scrollTo(0,0);
}
function openPauta(pid,etapa){const p=S.pautas[pid];let e=etapa;if(!e){e=1;for(let i=1;i<=8;i++){if(!p?.etapas?.[i]){e=i;break}if(i===8)e=8}}go('pauta',{pid,etapa:e})}
function subHist(pid){if(!S.db||S.histPid===pid)return;if(S.histUnsub)S.histUnsub();S.histPid=pid;S.hist=[];
 try{S.histUnsub=S.db.collection('atividade').where('pautaId','==',pid).orderBy('em','desc').limit(150).onSnapshot(s=>{S.hist=s.docs.map(d=>d.data());refresh()},()=>{})}catch(e){}}

function novaPauta(pre={}){abrirColar(pre)}
async function criarPauta(pre={}){
 if(!S.db){toast('Sem conexão com o banco de dados.');return}
 const id='p'+uidShort();
 const d={titulo:pre.titulo||'Nova pauta',assunto:'',quemEnviou:'',dataEntrada:todayStr(),fonte:'',dataFato:'',urgente:false,tecnicoNovo:false,reserva:false,
  dataPublicacao:pre.dataPublicacao||'',serie:pre.serie||'',recorte:'',status:'Recebida',etapas:{},criadoPor:S.me.id,criadoEm:nowISO(),atualizadoPor:S.me.id,atualizadoEm:nowISO()};
 try{await S.db.doc('pautas/'+id).set(d)}catch(e){handleWriteErr(e);return}
 logAct(id,'criou a pauta',{titulo:d.titulo});
 S.pautas[id]=d;openPauta(id,1);
 setTimeout(()=>{const t=$('#ptitle');if(t){t.focus();t.select()}},80);
}
async function apagarPauta(pid){const p=S.pautas[pid];if(!confirm('Apagar a pauta “'+(p?.titulo||'')+'”? O histórico continua registrado.'))return;
 try{await S.db.doc('pautas/'+pid).delete();logAct(pid,'apagou a pauta',{titulo:p?.titulo});go('pautas')}catch(e){handleWriteErr(e)}}
async function duplicarPauta(pid){const p={...S.pautas[pid]};const id='p'+uidShort();
 const d={...JSON.parse(JSON.stringify(p)),titulo:(p.titulo||'')+' (nova versão)',status:'Recebida',etapas:{},aprovTec:null,aprovCom:null,revCom:{},revTec:{},publicacao:{},metricas:{},criadoPor:S.me.id,criadoEm:nowISO(),atualizadoPor:S.me.id,atualizadoEm:nowISO()};
 try{await S.db.doc('pautas/'+id).set(d);logAct(id,'criou a pauta a partir de “'+(p.titulo||'')+'”',{titulo:d.titulo});S.pautas[id]=d;openPauta(id,1)}catch(e){handleWriteErr(e)}}
/* ============ Renderização ============ */
let _pendingRefresh=false;
function refresh(force){
 if(!S.ready){return}
 renderSide();
 const a=activeField();
 if(a&&!force){patchFields();patchLive();_pendingRefresh=true;return}
 _pendingRefresh=false;
 const main=$('#main');const y=window.scrollY;
 const banner=S.noDb?`<div class="banner">Sem conexão com o banco de dados. Nada fica gravado até a conexão voltar.</div>`:(!S.canWrite?`<div class="banner">Seu acesso a este projeto é só de leitura. Peça ao administrador para liberar o seu e-mail.</div>`:'');
 let html='';
 if(S.view==='painel')html=vPainel();else if(S.view==='pautas')html=vPautas();else if(S.view==='calendario')html=vCalendario();
 else if(S.view==='planilha')html=vPlanilha();else if(S.view==='equipe')html=vEquipe();else if(S.view==='pauta')html=vPauta();
 main.innerHTML=banner+html;
 window.scrollTo(0,y);
 const ids=[];pautaList().forEach(p=>ids.push(p.criadoPor,p.atualizadoPor,p.aprovTec?.by,p.aprovCom?.by,p.brunoEdit?.by));S.atividade.forEach(a=>ids.push(a.por));S.hist.forEach(a=>ids.push(a.por));S.peers.forEach(p=>ids.push(peerId(p)));Object.keys(S.equipe).forEach(i=>ids.push(i));
 wantProfiles(ids.filter(Boolean));
}
function patchFields(){const p=S.pautas[S.pid];document.querySelectorAll('#main [data-f]').forEach(el=>{if(el===document.activeElement)return;const d=S.pautas[el.dataset.pid||S.pid];if(!d)return;const v=getPath(d,el.dataset.f);
 if(el.type==='checkbox'){if(el.checked!==!!v)el.checked=!!v}else{const s=v==null?'':String(v);if(el.value!==s)el.value=s}})}
function patchLive(){const h=$('#histBox');if(h)h.innerHTML=histHTML();const pr=$('#presBox');if(pr)pr.innerHTML=presHTML();const g=$('#genOut');if(g&&S.gen)g.textContent=S.gen.text||'Pensando…'}

function renderSide(){
 const counts={pautas:pautaList().filter(p=>!['Publicada','Analisada'].includes(p.status)).length};
 const online=uniq(S.peers.map(peerId).filter(Boolean)).filter(i=>i!==S.me.id);
 const logoSrc=S.marca.logoClaroUrl||S.marca.logoUrl||'';const logo=logoSrc?`<div class="logo-slot"><img src="${esc(logoSrc)}" alt="BHM Advogados"></div>`:'';
 const nav=[['painel','Painel'],['pautas','Pautas',counts.pautas],['calendario','Calendário'],['planilha','Planilha de controle'],['equipe','Equipe e referência']];
 $('#side').innerHTML=`
 <div class="brand">${logo}<h1>Estúdio de Pautas</h1><small><span class="dia f"></span>BHM Advogados</small></div>
 <button class="new-btn" onclick="novaPauta()">Nova pauta</button>
 <nav class="nav" aria-label="Seções">${nav.map(([k,l,c])=>`<button ${S.view===k||(k==='pautas'&&S.view==='pauta')?'aria-current="page"':''} onclick="go('${k}')"><span class="dia${S.view===k?' f':''}"></span>${l}${c?`<span class="count">${c}</span>`:''}</button>`).join('')}</nav>
 <div class="side-foot">
  <div class="online">No estúdio agora${online.length?'':': só você'}<div class="row">${online.map(i=>av(i,true)).join('')}</div></div>
  <div class="me">${S.me.id?av(S.me.id):''}<div><b>${esc(S.me.name||nameOf(S.me.id))}</b><span>${esc(PAPEIS[papelOf(S.me.id)]?.n||'Papel não definido')}</span></div><button onclick="askRole()">Trocar papel</button>${window.estudioSair?'<button onclick="estudioSair()" style="margin-left:8px">Sair</button>':''}</div>
 </div>`;
}

function chipStatus(st){const i=STATUS.indexOf(st);const cls=i>=6?'ok':i===5?'ok':i===4?'warn':'';return `<span class="chip ${cls}">${esc(st||'Recebida')}</span>`}
function cardHTML(p){const s=serieOf(p);const here=uniq(peersOn(p.id));const pb=precisaBruno(p);
 return `<button class="card" onclick="openPauta('${p.id}')">
  <span class="t">${esc(p.titulo||'Sem título')}</span>
  <span class="meta">${s?`<span class="chip">${esc(s.nome)}</span>`:'<span class="chip warn">Sem série</span>'}${p.urgente?'<span class="chip bad">Urgente</span>':''}${p.reserva?'<span class="chip">Reserva</span>':''}${pb.length?`<span class="chip gold"><span class="dia f"></span>Dr. Bruno</span>`:''}</span>
  <span class="meta">${p.dataPublicacao?'Publicação '+fmtD(p.dataPublicacao):'Sem data'}<span class="sp"></span>${here.length?`<span class="avs" title="Aqui agora">${here.map(i=>av(i,true)).join('')}</span>`:''}</span>
  <span class="meta">Última edição: ${esc(nameOf(p.atualizadoPor))}, ${ago(p.atualizadoEm)}</span>
 </button>`}

/* ---- Painel ---- */
function vPainel(){
 const L=pautaList();const meP=papelOf(S.me.id);
 const wk=mondayOf(new Date());const days=[...Array(6)].map((_,i)=>{const d=new Date(wk);d.setDate(d.getDate()+i);return d});
 const doBruno=L.filter(p=>precisaBruno(p).length&&!['Publicada','Analisada'].includes(p.status));
 const emRev=L.filter(p=>p.status==='Em revisão');
 const metricasPend=L.filter(p=>p.status==='Publicada'&&(diasDesde(p.publicacao?.data||p.dataPublicacao)??0)>=7&&p.metricas?.alcance==null);
 const reserva=L.filter(p=>p.reserva&&!['Publicada','Analisada'].includes(p.status));
 const desde=new Date();desde.setDate(desde.getDate()-28);
 const recentes=L.filter(p=>{const d=parseYmd(p.publicacao?.data||p.dataPublicacao);return d&&d>=desde&&d<=new Date()});
 const pilarC=PILARES.map(x=>[x,recentes.filter(p=>p.pilar===x).length]);const maxP=Math.max(1,...pilarC.map(x=>x[1]));
 const serC=SERIE_ORDEM.slice(0,5).map(k=>[SERIES[k].nome,recentes.filter(p=>p.serie===k).length]);const maxS=Math.max(1,...serC.map(x=>x[1]));
 let foco='';
 if(meP==='bruno')foco=`<h3>Aguardando você</h3>${doBruno.length?`<ul class="mini-list">${doBruno.map(p=>`<li><button onclick="openPauta('${p.id}',${p.tecnicoNovo&&p.aprovTec?.resultado!=='aprovado'?7:2})"><span class="dia f"></span><span class="sp">${esc(p.titulo)}</span><span class="chip gold">${esc(precisaBruno(p).join(', '))}</span></button></li>`).join('')}</ul>`:'<p class="empty">Nada pendente na sua parte. Bom trabalho.</p>'}`;
 else if(meP==='agencia'){const ap=L.filter(p=>['Em produção','Aprovada'].includes(p.status));foco=`<h3>Para produzir e publicar</h3>${ap.length?`<ul class="mini-list">${ap.map(p=>`<li><button onclick="openPauta('${p.id}',${p.status==='Aprovada'?8:6})"><span class="sp">${esc(p.titulo)}</span>${chipStatus(p.status)}</button></li>`).join('')}</ul>`:'<p class="empty">Nenhuma peça esperando a agência.</p>'}`}
 else foco=`<h3>Em revisão</h3>${emRev.length?`<ul class="mini-list">${emRev.map(p=>`<li><button onclick="openPauta('${p.id}',7)"><span class="sp">${esc(p.titulo)}</span>${p.tecnicoNovo?'<span class="chip gold">Técnico novo</span>':''}</button></li>`).join('')}</ul>`:'<p class="empty">Nenhuma pauta em revisão agora.</p>'}
  <h4 style="margin-top:18px">Com o Dr. Bruno</h4>${doBruno.length?`<ul class="mini-list">${doBruno.map(p=>`<li><button onclick="openPauta('${p.id}')"><span class="dia f"></span><span class="sp">${esc(p.titulo)}</span><span class="chip gold">${esc(precisaBruno(p).join(', '))}</span></button></li>`).join('')}</ul>`:'<p class="empty">Nada aguardando o Dr. Bruno.</p>'}`;
 return `<div class="page-h"><div><h2>${esc(saud())}, ${esc((S.me.name||nameOf(S.me.id)).split(' ')[0])}</h2><p>${L.length?`${L.filter(p=>!['Publicada','Analisada'].includes(p.status)).length} pautas em andamento. Tudo o que cada pessoa faz fica registrado com nome e horário.`:'Comece registrando a primeira pauta. Cada etapa do Guia de Produção vira um passo aqui dentro.'}</p></div><button class="btn pri" onclick="novaPauta()">Nova pauta</button></div>
 <div class="panel paste" style="margin-bottom:20px"><h3>Cole um tema e o Claude monta a pauta</h3><p class="muted small" style="margin-top:-6px">Não precisa saber onde o assunto se encaixa. O Claude explica o tema, classifica, separa a fonte, define o pacote do dia e escreve o criativo. Depois você confere e muda o que quiser.</p>
 <div class="stack" style="gap:10px"><textarea id="quickTxt" placeholder="Cole aqui a notícia, o texto da página, a dúvida ou o caso, do jeito que estiver." oninput="S.quick.t=this.value" aria-label="Tema colado">${esc(S.quick.t)}</textarea>
 <div class="row"><input type="url" id="quickLink" placeholder="Link da página (opcional, mas ajuda na conferência)" value="${esc(S.quick.l)}" oninput="S.quick.l=this.value" style="flex:1;min-width:220px" aria-label="Link da fonte"><button class="btn gold" onclick="autoPauta(S.quick.t,S.quick.l)" ${S.sample?'':'disabled'}><span class="dia f"></span>Montar a pauta com Claude</button></div></div></div>
 <div class="panel" style="margin-bottom:20px"><div class="row" style="margin-bottom:14px"><h3 style="margin:0">Esta semana</h3><span class="sp"></span><button class="btn ghost" onclick="go('calendario')">Abrir calendário</button></div>
  <div class="week">${days.map(d=>dayCol(d,true)).join('')}</div></div>
 <div class="grid g-dash">
  <div class="stack">
   <div class="panel"><h3>Atividade recente</h3>${feedHTML(S.atividade.slice(0,25))}</div>
  </div>
  <div class="stack">
   <div class="panel">${foco}</div>
   <div class="panel"><h3>Reserva de pautas prontas</h3><div class="row"><span class="big-n">${reserva.length}</span><span class="muted small" style="max-width:24ch">Referência da Fase 2: manter de 3 a 4 pautas prontas que não dependam do Dr. Bruno.</span></div>
    ${reserva.length<3?'<p class="note warn" style="margin:12px 0 0">Reserva abaixo da referência. Casos Públicos e Mapeando Setores em fluxo são boas opções.</p>':''}</div>
   ${metricasPend.length?`<div class="panel"><h3>Métricas para ler</h3><p class="muted small" style="margin-top:-6px">Publicadas há 7 dias ou mais, sem alcance registrado.</p><ul class="mini-list">${metricasPend.map(p=>`<li><button onclick="openPauta('${p.id}',8)"><span class="sp">${esc(p.titulo)}</span><span class="chip warn">Ler métricas</span></button></li>`).join('')}</ul></div>`:''}
   <div class="panel"><h3>Últimas 4 semanas</h3><p class="muted small" style="margin-top:-6px">Revisão a cada 4 semanas: algum pilar ou série ficou de fora?</p>
    <h4>Pilares</h4><div class="bars">${pilarC.map(([n,c])=>`<div class="r"><span>${esc(n)}</span><span class="muted">${c}</span><div class="bar"><i style="width:${c/maxP*100}%"></i></div></div>`).join('')}</div>
    <h4 style="margin-top:16px">Séries</h4><div class="bars">${serC.map(([n,c])=>`<div class="r"><span>${esc(n)}</span><span class="muted">${c}</span><div class="bar"><i style="width:${c/maxS*100}%"></i></div></div>`).join('')}</div></div>
  </div>
 </div>`;
}
function saud(){const h=new Date().getHours();return h<12?'Bom dia':h<18?'Boa tarde':'Boa noite'}
function feedHTML(list){if(!list.length)return '<p class="empty">Nenhuma atividade ainda. Quando alguém criar, editar ou aprovar algo, aparece aqui com nome e horário.</p>';
 return `<ul class="feed">${list.map(a=>{const ex=S.pautas[a.pautaId];const pp=a.papel&&PAPEIS[a.papel]?` (${PAPEIS[a.papel].n})`:'';
  const bn=a.parteBruno&&a.papel!=='bruno'?' <span class="chip gold">na parte do Dr. Bruno</span>':(a.parteBruno?' <span class="chip gold">parte do Dr. Bruno</span>':'');
  return `<li>${av(a.por)}<div><b>${esc(nameOf(a.por))}</b><span class="muted">${esc(pp)}</span> ${esc(a.acao)}${a.pautaTitulo?` em ${ex?`<a onclick="openPauta('${esc(a.pautaId)}')">${esc(a.pautaTitulo)}</a>`:`<i>${esc(a.pautaTitulo)}</i>`}`:''}${bn}<div class="w">${ago(a.em)}</div></div></li>`}).join('')}</ul>`}
function dayCol(d,compact){const ds=ymd(d);const dow=d.getDay();const sk=SERIE_ORDEM.find(k=>SERIES[k].dow===dow);const L=pautaList().filter(p=>p.dataPublicacao===ds);
 return `<div class="day${ds===todayStr()?' today':''}"><div class="day-h"><b>${d.toLocaleDateString('pt-BR',{weekday:'long'}).replace('-feira','')}</b><span>${d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'})}</span><span style="display:block">${esc(sk?SERIES[sk].nome:'')}</span></div>
 <div class="day-b">${L.map(p=>cardHTML({...p})).join('')||''}<button class="day-add" onclick="novaPauta({dataPublicacao:'${ds}',serie:'${sk||''}'})">+ Pauta para este dia</button></div></div>`}

/* ---- Pautas (quadro) ---- */
function vPautas(){
 const f=S.filtro;let L=pautaList();
 if(f.q){const q=f.q.toLowerCase();L=L.filter(p=>(p.titulo+' '+(p.assunto||'')+' '+(p.palavraChave||'')).toLowerCase().includes(q))}
 if(f.serie)L=L.filter(p=>p.serie===f.serie);
 if(f.so==='bruno')L=L.filter(p=>precisaBruno(p).length);if(f.so==='reserva')L=L.filter(p=>p.reserva);if(f.so==='urgente')L=L.filter(p=>p.urgente);if(f.so==='meus')L=L.filter(p=>p.criadoPor===S.me.id||p.atualizadoPor===S.me.id);
 L.sort((a,b)=>(b.atualizadoEm||'').localeCompare(a.atualizadoEm||''));
 return `<div class="page-h"><div><h2>Pautas</h2><p>Cada coluna é um status do Guia de Produção. Qualquer pessoa pode continuar a pauta de onde a outra parou.</p></div><button class="btn pri" onclick="novaPauta()">Nova pauta</button></div>
 <div class="filters"><input type="search" placeholder="Buscar por título, assunto ou palavra-chave" value="${esc(f.q)}" oninput="S.filtro.q=this.value;clearTimeout(window._fq);window._fq=setTimeout(()=>{refresh(true);const i=document.querySelector('.filters input');i.focus();i.setSelectionRange(i.value.length,i.value.length)},250)" aria-label="Buscar pautas">
  <select onchange="S.filtro.serie=this.value;refresh(true)" aria-label="Filtrar por série"><option value="">Todas as séries</option>${SERIE_ORDEM.map(k=>`<option value="${k}" ${f.serie===k?'selected':''}>${esc(SERIES[k].nome)}</option>`).join('')}</select>
  <select onchange="S.filtro.so=this.value;refresh(true)" aria-label="Mostrar"><option value="">Todas as pautas</option><option value="bruno" ${f.so==='bruno'?'selected':''}>Aguardando o Dr. Bruno</option><option value="urgente" ${f.so==='urgente'?'selected':''}>Urgentes</option><option value="reserva" ${f.so==='reserva'?'selected':''}>Reserva de pautas</option><option value="meus" ${f.so==='meus'?'selected':''}>Criadas ou editadas por mim</option></select></div>
 <div class="board">${STATUS.map(st=>{const c=L.filter(p=>(p.status||'Recebida')===st);return `<div class="col"><div class="col-h"><span class="dia${STATUS.indexOf(st)>=5?' f':''}"></span>${esc(st)}<span class="n">${c.length}</span></div>${c.map(cardHTML).join('')||'<p class="empty small">Vazio</p>'}</div>`}).join('')}</div>`;
}

/* ---- Calendário ---- */
function vCalendario(){
 if(!S.week)S.week=mondayOf(new Date());
 const days=[...Array(6)].map((_,i)=>{const d=new Date(S.week);d.setDate(d.getDate()+i);return d});
 const semData=pautaList().filter(p=>!p.dataPublicacao&&!['Publicada','Analisada'].includes(p.status));
 const end=days[5];
 return `<div class="page-h"><div><h2>Calendário</h2><p>Segunda a sexta, uma série por dia. Sábado é conteúdo leve. Fato urgente entra como post extra, sem substituir a pauta do dia.</p></div>
  <div class="row"><button class="btn" onclick="shiftWeek(-7)" aria-label="Semana anterior">Semana anterior</button><button class="btn" onclick="S.week=mondayOf(new Date());refresh(true)">Hoje</button><button class="btn" onclick="shiftWeek(7)" aria-label="Próxima semana">Próxima semana</button></div></div>
 <p class="muted" style="margin:-10px 0 16px">${days[0].toLocaleDateString('pt-BR',{day:'numeric',month:'long'})} a ${end.toLocaleDateString('pt-BR',{day:'numeric',month:'long',year:'numeric'})}</p>
 <div class="week">${days.map(d=>dayCol(d)).join('')}</div>
 <div class="panel" style="margin-top:20px"><h3>Sem data de publicação</h3>${semData.length?`<div class="grid g3">${semData.map(cardHTML).join('')}</div>`:'<p class="empty">Todas as pautas em andamento têm data.</p>'}</div>`;
}
function shiftWeek(n){const d=new Date(S.week);d.setDate(d.getDate()+n);S.week=d;refresh(true)}

/* ---- Planilha ---- */
function vPlanilha(){
 let L=pautaList();if(!S.planTodos)L=L.filter(p=>['Publicada','Analisada'].includes(p.status));
 L.sort((a,b)=>((b.publicacao?.data||b.dataPublicacao||'')).localeCompare(a.publicacao?.data||a.dataPublicacao||''));
 const resumo=SERIE_ORDEM.map(k=>{const ps=pautaList().filter(p=>p.serie===k&&['Publicada','Analisada'].includes(p.status));const avg=f=>{const v=ps.map(p=>p.metricas?.[f]).filter(x=>typeof x==='number');return v.length?Math.round(v.reduce((a,b)=>a+b,0)/v.length):'–'};return [SERIES[k].planilha,ps.length,avg('alcance'),avg('salvamentos'),avg('compart')]});
 return `<div class="page-h"><div><h2>Planilha de controle</h2><p>Uma linha por post, com as mesmas colunas da planilha do Everton. Os três números são lidos 7 dias depois da publicação.</p></div>
  <div class="row"><label class="chk" style="padding:0"><input type="checkbox" ${S.planTodos?'checked':''} onchange="S.planTodos=this.checked;refresh(true)">Mostrar todas as pautas</label>${S.downloads?'<button class="btn pri" onclick="exportCSV()">Baixar planilha (CSV)</button>':''}</div></div>
 <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Data de publicação</th><th>Post (tema)</th><th>Série</th><th>Recorte</th><th>Pilar</th><th>Formato</th><th>Status</th><th>Alcance</th><th>Salvamentos</th><th>Compart.</th><th>Observação</th></tr></thead>
 <tbody>${L.map(p=>`<tr><td>${fmtD(p.publicacao?.data||p.dataPublicacao)}</td><td><span class="lnk" onclick="openPauta('${p.id}',8)">${esc(p.titulo)}</span></td><td>${esc(serieOf(p)?.planilha||'')}</td><td>${esc(p.recorte||'')}</td><td>${esc(p.pilar||'')}</td><td>${esc(p.formato||'')}</td><td>${chipStatus(p.status)}</td>
  <td><input type="number" min="0" data-pid="${p.id}" data-f="metricas.alcance" data-label="Alcance" value="${p.metricas?.alcance??''}" aria-label="Alcance"></td><td><input type="number" min="0" data-pid="${p.id}" data-f="metricas.salvamentos" data-label="Salvamentos" value="${p.metricas?.salvamentos??''}" aria-label="Salvamentos"></td><td><input type="number" min="0" data-pid="${p.id}" data-f="metricas.compart" data-label="Compartilhamentos" value="${p.metricas?.compart??''}" aria-label="Compartilhamentos"></td>
  <td><input type="text" data-pid="${p.id}" data-f="metricas.obs" data-label="Observação" value="${esc(p.metricas?.obs||'')}" aria-label="Observação"></td></tr>`).join('')||`<tr><td colspan="11" class="empty">Nenhum post publicado ainda. Marque “Mostrar todas as pautas” para ver as que estão em andamento.</td></tr>`}</tbody></table></div>
 <div class="panel" style="margin-top:20px"><h3>Resumo por série (publicados)</h3><div class="tbl-wrap" style="border:0"><table class="tbl" style="min-width:560px"><thead><tr><th>Série</th><th>Posts</th><th>Média de alcance</th><th>Média de salvamentos</th><th>Média de compartilhamentos</th></tr></thead><tbody>${resumo.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
}
async function exportCSV(){
 const L=pautaList().filter(p=>S.planTodos||['Publicada','Analisada'].includes(p.status));
 const head=['Data de publicação','Post (tema)','Série','Recorte','Pilar','Formato','Status','Alcance','Salvamentos','Compartilhamentos','Observação'];
 const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
 const rows=L.map(p=>[fmtD(p.publicacao?.data||p.dataPublicacao),p.titulo,serieOf(p)?.planilha||'',p.recorte||'',p.pilar||'',p.formato||'',p.status||'',p.metricas?.alcance??'',p.metricas?.salvamentos??'',p.metricas?.compart??'',p.metricas?.obs||'']);
 const csv='\ufeff'+[head,...rows].map(r=>r.map(q).join(';')).join('\r\n');
 try{await S.downloads.save({filename:'BHM_controle_de_posts_'+todayStr()+'.csv',data:new Blob([csv],{type:'text/csv;charset=utf-8'})});logAct('','baixou a planilha de controle')}catch(e){if(e?.code!=='cancelled')toast('O download não foi concluído.')}
}
/* ---- Equipe e referência ---- */
function vEquipe(){
 const ids=Object.keys(S.equipe);
 return `<div class="page-h"><div><h2>Equipe e referência</h2><p>Quem participa do projeto e qual é o papel de cada um. O papel define o que aparece em destaque no painel, mas ninguém fica bloqueado: o Everton pode alterar qualquer parte, e as ações na parte do Dr. Bruno ficam sinalizadas no histórico.</p></div></div>
 <div class="grid g2">
  <div class="panel"><h3>Pessoas</h3>${ids.length?`<ul class="feed">${ids.map(i=>`<li>${av(i)}<div class="sp"><b>${esc(nameOf(i))}</b>${i===S.me.id?' <span class="muted">(você)</span>':''}<div class="w">${esc(PAPEIS[S.equipe[i].papel]?.d||'')}</div></div>
   <select aria-label="Papel de ${esc(nameOf(i))}" onchange="setPapel('${esc(i)}',this.value)">${Object.entries(PAPEIS).map(([k,v])=>`<option value="${k}" ${S.equipe[i].papel===k?'selected':''}>${v.n}</option>`).join('')}</select></li>`).join('')}</ul>`:'<p class="empty">Ninguém registrado ainda.</p>'}
   <p class="muted small" style="margin-bottom:0">Para trazer alguém, o administrador libera o e-mail da pessoa na tabela estudio_acesso. Na primeira vez que ela entrar, escolhe o próprio papel.</p></div>
  <div class="panel"><h3>Logo oficial</h3><p class="muted small" style="margin-top:-4px">A logo nunca é recriada. Envie as duas versões do arquivo oficial: o ícone claro entra nas peças escuras e no topo do estúdio; o ícone navy entra nas peças claras. Elas aparecem na prévia visual dos slides.</p>
   <div class="grid g2">${[['claro','Ícone claro (fundo escuro)','#071F34'],['navy','Ícone navy (fundo claro)','#F5F0E6']].map(([k,l,bg])=>{const u=S.marca[k==='claro'?'logoClaroUrl':'logoNavyUrl']||(k==='claro'?S.marca.logoUrl:'');return `<div class="stack" style="gap:8px"><div style="background:${bg};border:1px solid var(--line);border-radius:4px;height:96px;display:grid;place-items:center">${u?`<img src="${esc(u)}" alt="${esc(l)}" style="max-height:64px">`:`<span style="color:#C9A961;font-size:12px">Sem arquivo</span>`}</div><span class="small">${l}</span>${S.assets?`<label class="btn"><input type="file" accept="image/png,image/svg+xml,image/webp" hidden onchange="uploadLogo(this.files[0],'${k}')">${u?'Trocar':'Enviar'}</label>`:''}</div>`}).join('')}</div>
   <h3 style="margin-top:26px">Identidade visual</h3>
   <div class="row" style="gap:14px">${[['#071F34','Navy'],['#C9A961','Dourado'],['#9A7B3C','Dourado de texto'],['#F5F0E6','Creme'],['#FFFFFF','Branco']].map(([c,n])=>`<div style="text-align:center;font-size:12.5px"><div style="width:54px;height:54px;background:${c};border:1px solid var(--line);border-radius:3px;margin-bottom:6px"></div>${n}<br><span class="muted">${c}</span></div>`).join('')}</div>
   <p class="small" style="margin-bottom:0"><span style="font-family:var(--serif);font-size:20px">Cormorant Garamond</span> nos títulos e Inter no apoio. Losango como elemento gráfico.</p></div>
 </div>
 <div class="panel" style="margin-top:20px"><h3>As séries em uma tela</h3><div class="tbl-wrap" style="border:0"><table class="tbl"><thead><tr><th>Dia</th><th>Série</th><th>Função</th><th>Pergunta central</th><th>Sequência padrão do dia</th><th>O que medir primeiro</th></tr></thead>
 <tbody>${SERIE_ORDEM.map(k=>{const s=SERIES[k];const m=s.menu;return `<tr><td>${esc(s.dia)}</td><td><b>${esc(s.nome)}</b></td><td>${esc(s.funcao)}</td><td>${esc(s.pergunta)}</td><td>${esc([m.abertura[0],m.entrega[0],m.aprofundamento[0],m.conversa[0],m.reaproveitamento[0]].filter(Boolean).join(' → '))}</td><td>${esc(s.medir)}</td></tr>`}).join('')}</tbody></table></div></div>
 <div class="panel" style="margin-top:20px"><h3>Três regras que não se negociam</h3><ol class="q"><li>Nenhuma pauta avança sem a fonte conferida (ou, em conteúdo de método e exemplo hipotético, sem a validação do Dr. Bruno).</li><li>Conteúdo jurídico técnico novo só é publicado depois da revisão do Dr. Bruno. As outras peças passam pela revisão de comunicação do Everton. Stories feitos pelo Dr. Bruno não passam por revisão.</li><li>Cada post tem uma única ideia central. Se precisar de duas, são duas pautas.</li></ol></div>`;
}
async function setPapel(id,papel){try{await queue('equipe',()=>S.db.doc('config/equipe').update({membros:{[id]:{papel}}}));logAct('','definiu o papel de '+nameOf(id)+' como '+PAPEIS[papel].n)}catch(e){handleWriteErr(e)}}
async function uploadLogo(file,kind){if(!file||!S.assets)return;try{const r=await S.assets.upload(file);const key=kind==='navy'?'logoNavyUrl':'logoClaroUrl';await S.db.doc('config/marca').set({...S.marca,[key]:r.url||'',por:S.me.id,em:nowISO()});logAct('','enviou o arquivo oficial da logo ('+(kind==='navy'?'ícone navy':'ícone claro')+')');toast('Logo atualizada.')}catch(e){toast('Não foi possível enviar o arquivo. Use PNG, SVG ou WebP.')}}
async function uploadFoto(file){if(!file||!S.assets)return;try{const r=await S.assets.upload(file);await writePauta(S.pid,{fotoUrl:r.url||''});logAct(S.pid,'enviou a foto da peça');toast('Foto enviada. Confirme o direito de uso.');refresh(true)}catch(e){toast('Não foi possível enviar a foto. Use JPG, PNG ou WebP.')}}

/* ---- Pauta ---- */
function vPauta(){
 const p=S.pautas[S.pid];if(!p)return `<div class="panel"><h3>Pauta não encontrada</h3><p>Ela pode ter sido apagada por alguém da equipe.</p><button class="btn" onclick="go('pautas')">Voltar às pautas</button></div>`;
 const s=serieOf(p);const done=n=>!!p.etapas?.[n];const nDone=ETAPAS.filter(e=>done(e.n)).length;
 let last=0;for(let i=8;i>=1;i--)if(done(i)){last=i;break}
 const pb=precisaBruno(p);
 return `<div class="p-head">
  <div class="row"><button class="btn ghost" onclick="go('pautas')">Pautas</button><span class="muted">/</span><span class="muted small">${s?esc(s.nome):'Sem série'}${p.recorte?', '+esc(p.recorte):''}</span><span class="sp"></span>
   <button class="btn ghost" onclick="duplicarPauta('${S.pid}')">Duplicar</button><button class="btn ghost danger" onclick="apagarPauta('${S.pid}')">Apagar</button></div>
  <input id="ptitle" class="title" type="text" data-f="titulo" data-label="Título" value="${esc(p.titulo)}" aria-label="Título da pauta">
  <div class="row">
   <select data-f="status" data-special="status" style="width:auto" aria-label="Status">${STATUS.map(st=>`<option ${(p.status||'Recebida')===st?'selected':''}>${st}</option>`).join('')}</select>
   ${p.urgente?'<span class="chip bad">Urgente</span>':''}${p.tecnicoNovo?'<span class="chip gold"><span class="dia f"></span>Conteúdo jurídico técnico novo</span>':''}${pb.length?`<span class="chip gold">Aguardando Dr. Bruno: ${esc(pb.join(', '))}</span>`:''}${conferirCount(p)?`<span class="chip warn">${conferirCount(p)} [CONFERIR]</span>`:''}
   <span class="sp"></span><span id="presBox">${presHTML()}</span>
  </div>
  <div class="muted small">Criada por ${who(p.criadoPor)} ${ago(p.criadoEm)}. Última edição por ${who(p.atualizadoPor)}, ${ago(p.atualizadoEm)}.</div>
 </div>
 ${autoPanel(p)}<nav class="track" aria-label="Etapas do Guia de Produção"><span class="fill" style="width:${last>1?(last-1)/7*87.5:0}%"></span>
  ${ETAPAS.map(e=>{const here=uniq(peersOn(S.pid,e.n)).filter(i=>i!==S.me.id);return `<button class="step${done(e.n)?' done':''}${S.etapa===e.n?' cur':''}" onclick="S.etapa=${e.n};S.prop=null;announce();refresh(true)" aria-current="${S.etapa===e.n?'step':'false'}" title="${esc(e.t)}${done(e.n)?': concluída por '+esc(nameOf(p.etapas[e.n].by)):''}">
   <span class="d"></span><span class="n">${e.n}</span><span class="l">${esc(e.t)}</span>${here.length?`<span class="here avs">${here.map(i=>av(i,true)).join('')}</span>`:''}</button>`}).join('')}
 </nav>
 <div class="p-layout">
  <section class="panel step-body" aria-label="Etapa ${S.etapa}">${stepHTML(p,S.etapa)}${stepFoot(p,S.etapa)}</section>
  <aside class="panel hist"><h3>Histórico</h3><p class="muted small" style="margin-top:-6px">Quem fez o quê nesta pauta, do mais recente ao mais antigo.</p><div id="histBox">${histHTML()}</div></aside>
 </div>`;
}
function presHTML(){const here=uniq(peersOn(S.pid)).filter(i=>i!==S.me.id);if(!here.length)return '';
 return `<span class="row small" style="gap:8px"><span class="avs">${here.map(i=>av(i,true)).join('')}</span><span class="muted">${here.map(i=>{const pe=S.peers.find(x=>peerId(x)===i&&x.presence?.pid===S.pid);return esc(nameOf(i).split(' ')[0])+(pe?.presence?.etapa?' na etapa '+pe.presence.etapa:'')}).join(', ')} ${here.length>1?'estão':'está'} aqui agora</span></span>`}
function histHTML(){if(!S.hist.length)return '<p class="empty">Ainda sem registros.</p>';
 return `<ol>${S.hist.map(a=>`<li class="${a.parteBruno?'b':''}">${av(a.por,true)}<div><b>${esc(nameOf(a.por))}</b> ${esc(a.acao)}${a.parteBruno&&a.papel!=='bruno'?' <span class="chip gold">na parte do Dr. Bruno</span>':''}<div class="w">${new Date(a.em).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}</div></div></li>`).join('')}</ol>`}
function stepFoot(p,n){const e=p.etapas?.[n];
 return `<div class="step-foot">${e?`<span class="chip ok">Concluída por ${esc(nameOf(e.by))}, ${ago(e.at)}</span><button class="btn ghost" onclick="reabrirEtapa(${n})">Reabrir</button>`:`<button class="btn pri" onclick="concluirEtapa(${n})">Concluir etapa ${n}</button><span class="muted small">Ao concluir, o status avança para “${esc(ETAPAS[n-1].st)}” se ainda estiver antes.</span>`}
 <span class="sp"></span>${n>1?`<button class="btn ghost" onclick="S.etapa=${n-1};S.prop=null;announce();refresh(true)">Etapa anterior</button>`:''}${n<8?`<button class="btn" onclick="S.etapa=${n+1};S.prop=null;announce();refresh(true)">Próxima etapa</button>`:''}</div>`}
function brunoBox(p,title,inner){const be=p.brunoEdit;let by='';if(be){const alert=!isBruno(be.by);by=`<span class="by${alert?' alert':''}">Última edição nesta parte: ${who(be.by)}, ${ago(be.at)}${alert?'. Feita por alguém que não é o Dr. Bruno.':''}</span>`}
 return `<div class="bruno"><div class="bruno-h"><span class="tag-bruno"><span class="dia f"></span>Parte do Dr. Bruno</span><b>${esc(title)}</b></div>${inner}${by}</div>`}
function F(path,label,o={}){const p=S.pautas[S.pid]||{};const v=getPath(p,path);const id='f_'+path.replace(/\./g,'_');
 const hint=o.hint?`<span class="hint">${o.hint}</span>`:'';
 if(o.type==='textarea')return `<label class="f" for="${id}">${esc(label)}${hint}<textarea id="${id}" data-f="${path}" data-label="${esc(label)}" ${o.rows?`rows="${o.rows}"`:''} class="${o.cls||''}" placeholder="${esc(o.ph||'')}">${esc(v??'')}</textarea></label>`;
 if(o.type==='check')return `<label class="chk"><input type="checkbox" data-f="${path}" data-label="${esc(label)}" ${v?'checked':''}><span>${esc(label)}${o.hint?`<br><span class="muted small">${o.hint}</span>`:''}</span></label>`;
 if(o.type==='select')return `<label class="f" for="${id}">${esc(label)}${hint}<select id="${id}" data-f="${path}" data-label="${esc(label)}" ${o.special?`data-special="${o.special}"`:''}><option value="">Escolher…</option>${o.opts.map(x=>{const [val,lab]=Array.isArray(x)?x:[x,x];return `<option value="${esc(val)}" ${v===val?'selected':''}>${esc(lab)}</option>`}).join('')}</select></label>`;
 return `<label class="f" for="${id}">${esc(label)}${hint}<input id="${id}" type="${o.type||'text'}" data-f="${path}" data-label="${esc(label)}" value="${esc(v??'')}" placeholder="${esc(o.ph||'')}" ${o.list?`list="${o.list}"`:''}></label>`;
}
/* ---- As oito etapas ---- */
function stepHTML(p,n){
 const s=serieOf(p);const ai=S.sample?'':'disabled title="O Claude está indisponível agora"';
 if(n===1){const dd=diasDesde(p.dataFato);
  return `<div><h3>1. Receber e registrar</h3><p class="muted" style="margin:-6px 0 0">Registre o assunto como chegou, antes de pensar em título ou formato.</p></div>
  ${F('assunto','Assunto bruto',{type:'textarea',rows:5,ph:'Cole aqui o fato, caso, dúvida ou tema, do jeito que chegou.'})}
  <div class="grid g3">${F('quemEnviou','Quem enviou')}${F('dataEntrada','Data de entrada',{type:'date'})}${F('dataPublicacao','Publicação em',{type:'date',hint:'Define o dia no calendário'})}</div>
  <div class="grid g2">${F('fonte','Fonte ou link',{type:'url',ph:'https://… ou referência da decisão/norma',hint:'Ou “base validada pelo Dr. Bruno” em conteúdo de método'})}${F('dataFato','Data do fato',{type:'date'})}</div>
  ${dd!=null&&dd>60?`<p class="note warn">Fato de ${fmtD(p.dataFato)}, há ${dd} dias. Não chame de “recente” ou “novo”: cite a data no texto. Sem fato novo, avalie Casos que Ensinam em vez de Bruno Analisa.</p>`:''}
  <div class="grid g3">${F('urgente','Urgente',{type:'check',hint:'Vira post extra de Bruno Analisa, sem substituir a pauta do dia.'})}${F('tecnicoNovo','Conteúdo jurídico técnico novo',{type:'check',hint:'Tese ou interpretação de lei: exige revisão do Dr. Bruno.'})}${F('reserva','Guardar na reserva de pautas',{type:'check',hint:'Pauta pronta para usar quando o material atrasar.'})}</div>`}
 if(n===2){const f=p.fonte2||{};const nc=conferirCount(p);
  return `<div><h3>2. Conferir a fonte</h3><p class="muted" style="margin:-6px 0 0">Abra a fonte original e confirme data e validade. Dado que não puder ser confirmado sai do texto ou fica marcado [CONFERIR].</p></div>
  ${p.fonte?`<p class="note">Fonte registrada: ${/^https?:\/\//.test(p.fonte)?`<a href="${esc(p.fonte)}" target="_blank" rel="noopener">${esc(p.fonte)}</a>`:esc(p.fonte)}${p.dataFato?`, fato de ${fmtD(p.dataFato)}`:''}</p>`:'<p class="note warn">Nenhuma fonte registrada na etapa 1. Sem fonte conferida a pauta não avança, exceto conteúdo de método ou exemplo hipotético validado pelo Dr. Bruno.</p>'}
  <div class="row"><button class="btn" onclick="aiFonte()" ${ai}><span class="dia"></span>Rascunhar as quatro linhas com Claude</button><span class="muted small">Claude não confere a fonte sozinho: ele separa o que está no assunto e marca o resto com [CONFERIR].</span></div>
  ${S.prop?.kind==='fonte'?propHTML():''}
  <div class="grid g2">${F('fonte2.fato','O que aconteceu (fato)',{type:'textarea'})}${F('fonte2.interpretacao','O que a BHM interpreta',{type:'textarea'})}${F('fonte2.limites','Até onde vale (limites)',{type:'textarea'})}${F('fonte2.naoAfirmar','O que não pode ser afirmado',{type:'textarea'})}</div>
  ${nc?`<p class="note warn">${nc} marcação(ões) [CONFERIR] na pauta. Responda antes da revisão.</p>`:''}
  ${F('anonimizada','A pauta nasce de dúvida ou problema de cliente (T34, T44) e foi anonimizada aqui',{type:'check',hint:'Sem nome, empresa, CNPJ, números ou detalhe que identifique.'})}
  ${brunoBox(p,'Dúvidas jurídicas e validação',`
   ${F('fonte2.duvida','Dúvida jurídica para o Dr. Bruno',{type:'textarea',rows:3,ph:'Escreva a dúvida antes de seguir. Deixe em branco se não houver.'})}
   ${F('fonte2.resposta','Resposta do Dr. Bruno',{type:'textarea',rows:3})}
   ${F('precisaValidacao','Conteúdo de método ou exemplo hipotético: precisa da validação do Dr. Bruno como base',{type:'check'})}
   ${p.precisaValidacao?(p.validacao?.ok?`<div class="row"><span class="chip ok">Validado por ${esc(nameOf(p.validacao.by))}, ${ago(p.validacao.at)}</span>${!isBruno(p.validacao.by)?'<span class="chip warn">Registrado por quem não é o Dr. Bruno</span>':''}<button class="btn ghost" onclick="validar(false)">Desfazer</button></div>`:`<div><button class="btn gold" onclick="validar(true)">Registrar validação do Dr. Bruno</button></div>`):''}`)}`}
 if(n===3){const tipo=TIPOS.find(t=>t[0]===p.tipoMaterial);const rec=s?.recortes[p.recorte];
  const dd=diasDesde(p.dataFato);
  return `<div><h3>3. Classificar</h3><p class="muted" style="margin:-6px 0 0">Os 8 passos da Fase 1: tipo de material, série, subnicho, recorte, estrutura e pilar.</p></div>
  <div class="row"><button class="btn" onclick="aiClassificar()" ${ai}><span class="dia"></span>Sugerir classificação com Claude</button></div>
  ${S.prop?.kind==='class'?propHTML():''}
  ${F('tipoMaterial','Passo 1: que tipo de material você tem em mãos?',{type:'select',special:'tipo',opts:TIPOS.map(t=>[t[0],t[1]])})}
  ${tipo&&tipo[2]&&p.serie!==tipo[2]?`<div class="row"><span class="note" style="flex:1">Pela tabela do Passo 1, isso aponta para <b>${esc(SERIES[tipo[2]].nome)}</b>.</span><button class="btn" onclick="usarSerie('${tipo[2]}')">Usar esta série</button></div>`:''}
  ${tipo?.[0]==='doutrina'?'<p class="note warn">Passo 2: crie uma situação hipotética de empresa que ilustre o conceito e refaça a triagem. Ela nunca vai para Casos que Ensinam; pode alimentar Mapeando Setores ou Metodologia, sempre identificada como “exemplo hipotético”.</p>':''}
  ${tipo?.[0]==='tese'?'<p class="note">Fluxo de teses (seção 11). A: nova decisão, tema em julgamento ou fato recente → Bruno Analisa. B: requisitos documentais ou processuais → Metodologia, “Validação e Segurança Fiscal”. C: nível de risco ou sustentação jurídica → Metodologia, “Como Classificamos uma Tese por Risco”.</p>':''}
  <div class="grid g2">
   ${F('serie','Série',{type:'select',special:'serie',opts:SERIE_ORDEM.map(k=>[k,SERIES[k].nome+' ('+SERIES[k].dia+')'])})}
   ${s?F('recorte','Recorte',{type:'select',special:'recorte',opts:Object.keys(s.recortes).map(r=>[r,r+(FIN.has(r)?' (a validar)':'')])}):'<div></div>'}
  </div>
  ${p.serie==='bruno'&&dd!=null&&dd>60?`<p class="note warn">Bruno Analisa trabalha com atualidades, e este fato tem ${dd} dias. Sem fato novo, o caminho correto é Casos que Ensinam (recorte “Decisões que Ensinam” se for decisão).</p>`:''}
  ${p.serie==='casos'&&p.tipoMaterial==='doutrina'?'<p class="note warn">Situação hipotética nunca entra em Casos que Ensinam, que só trabalha com casos reais, públicos ou anonimizados.</p>':''}
  ${FIN.has(p.recorte)?'<p class="note warn">Recorte financeiro: validar o escopo com o Dr. Bruno antes de produzir.</p>':''}
  <div class="grid g2">
   <div>${F('subnicho','Subnicho, setor ou cargo',{ph:'Ex.: Gerente Fiscal do Lucro Real'})}<div class="chips" style="margin-top:8px">${(p.serie==='setores'?SETORES:p.serie==='cargo'?CARGOS:[...SETORES,...CARGOS.slice(0,5)]).map(c=>`<span class="chip pick" role="button" tabindex="0" onclick="setVal('subnicho','${esc(c)}')">${esc(c)}</span>`).join('')}</div></div>
   ${F('pilar','Pilar principal',{type:'select',opts:PILARES})}
  </div>
  ${s?`<div class="panel" style="background:var(--navy-tint);border-color:transparent"><dl class="kv"><dt>Dia</dt><dd>${esc(s.dia)}</dd><dt>Função</dt><dd>${esc(s.funcao)}</dd><dt>Pergunta da série</dt><dd>${esc(s.pergunta)}</dd><dt>Subnicho prioritário</dt><dd>${esc(s.subnicho)}</dd><dt>Mensagem central</dt><dd>${esc(s.msg)}</dd>${rec?`<dt>Formato do recorte</dt><dd>${esc(rec[0])}</dd>`:''}</dl></div>`:''}`}
 if(n===4){
  return `<div><h3>4. Ideia central do post</h3><p class="muted" style="margin:-6px 0 0">Uma só ideia. Se precisar de duas, são duas pautas.</p></div>
  ${F('ideia','Depois de ver este conteúdo, o público precisa entender que…',{type:'textarea',rows:3})}
  ${F('palavraChave','Palavra-chave do tema (T45)',{hint:'Vai no título, na primeira frase da legenda e na fala. Ex.: “IRPJ na restituição de tributos”.'})}
  ${p.ideia&&/(\be também\b|;)/i.test(p.ideia)?'<p class="note warn">A frase parece ter mais de uma ideia. Se for o caso, duplique a pauta e separe.</p>':''}`}
 if(n===5){if(!s||!p.recorte)return `<div><h3>5. Formato e pacote do dia</h3></div><p class="note warn">Defina a série e o recorte na etapa 3. O pacote do dia vem deles.</p><div><button class="btn" onclick="S.etapa=3;announce();refresh(true)">Ir para a etapa 3</button></div>`;
  const rec=s.recortes[p.recorte]||['','',''];
  return `<div><h3>5. Formato e pacote do dia</h3><p class="muted" style="margin:-6px 0 0">${esc(s.nome)}, ${esc(p.recorte)}. Use o padrão de cada toque ou uma alternativa da mesma linha.</p></div>
  <div class="panel" style="background:var(--navy-tint);border-color:transparent"><dl class="kv"><dt>Formato principal</dt><dd>${esc(rec[0])}</dd><dt>Ajuste do dia</dt><dd>${esc(rec[1])}</dd><dt>Por quê</dt><dd>${esc(rec[2])}</dd></dl></div>
  <div class="grid g2">${F('formato','Formato desta pauta',{hint:'Preenchido pelo pacote do recorte. Altere só para um formato previsto no menu.'})}${F('ajuste','Ajuste do dia')}</div>
  <div class="tbl-wrap" style="border:0;background:transparent"><table class="toques"><thead><tr><th>Toque</th><th>Tática escolhida</th></tr></thead><tbody>
  ${TOQUES.map(([k,lab])=>{const m=s.menu[k]||['',[]];const cur=p.toques?.[k]??'';const opts=[];if(m[0])opts.push([m[0],tlabel(m[0])+' (padrão)']);m[1].forEach(a=>opts.push([a,tlabel(a)]));if(cur&&!opts.find(o=>o[0]===cur))opts.push([cur,tlabel(cur)]);
   return `<tr><td>${lab}</td><td><select data-f="toques.${k}" data-label="${esc(lab)}" aria-label="${esc(lab)}"><option value="">${k==='angulo'?'Sem ângulo (opcional)':'Nenhum'}</option>${opts.map(([v,l])=>`<option value="${esc(v)}" ${cur===v?'selected':''}>${esc(l)}</option>`).join('')}</select></td></tr>`}).join('')}
  </tbody></table></div>
  <p class="note small">${esc(s.obs)} Transversais: gancho (T17, T18, T47), gravação (T14), publicação (T45, T53) e Stories com T05.</p>
  ${visualFields(p)}
  <div class="grid g2">${F('canalCentral','Canal central',{type:'select',opts:CANAIS})}<div><span style="font-size:13px;font-weight:500">Variações nos demais canais</span>${CANAIS.filter(c=>c!==p.canalCentral).map(c=>F('variacoes.'+c,c,{type:'check',hint:CANAL_NOTA[c]})).join('')}</div></div>`}
 if(n===6){const g=S.gen&&S.gen.pid===S.pid;
  return `<div><h3>6. Produzir</h3><p class="muted" style="margin:-6px 0 0">Roteiro respondendo, em ordem, as perguntas da estrutura. Sempre 2 opções de gancho ou título.</p></div>
  ${s?`<div class="panel" style="background:var(--navy-tint);border-color:transparent"><h4>Estrutura de ${esc(s.nome)} (roteiro de quem escreve; nunca vira pergunta no slide)</h4><ol class="q">${s.estrutura.map(q=>`<li>${esc(q)}</li>`).join('')}</ol></div>`:'<p class="note warn">Sem série definida, o roteiro não tem estrutura. Volte à etapa 3.</p>'}
  <div class="grid g2">${F('tipoCriativo','Criativo',{type:'select',opts:['Pacote do dia completo','Carrossel','Reels','Stories','LinkedIn']})}${F('obsCriativo','Observação para o criativo',{ph:'Cargo do público, setor, algo a evitar'})}</div>
  <div class="row">${g?`<button class="btn" onclick="S.gen.ctl.abort()">Parar</button><span class="muted small">Gerando para ${esc(nameOf(S.me.id))}…</span>`:`<button class="btn gold" onclick="aiCriativo()" ${ai}><span class="dia f"></span>${p.criativo?'Gerar de novo com Claude':'Gerar criativo com Claude'}</button>`}
   ${p.criativoMeta?`<span class="muted small">Última geração por ${who(p.criativoMeta.by)}, ${ago(p.criativoMeta.at)}</span>`:''}</div>
  ${g?`<div class="gen" id="genOut" aria-live="polite">${esc(S.gen.text||'Pensando…')}</div>`:''}
  ${F('criativo','Roteiro, copy, legenda e Stories',{type:'textarea',cls:'big',ph:'Escreva aqui ou gere com Claude. Tudo o que for editado fica salvo e registrado.'})}
  <div class="row"><input type="text" id="ajusteTxt" placeholder="Pedir ajuste: “gancho mais curto”, “trocar o slide 4”, “versão LinkedIn em 1ª pessoa”" style="flex:1;min-width:220px" aria-label="Pedido de ajuste"><button class="btn" onclick="aiAjustar()" ${ai} ${p.criativo?'':'disabled'}>Ajustar com Claude</button><button class="btn ghost" onclick="copiar()">Copiar texto</button></div>
  <p class="note small">Antes de enviar à agência: título na tela, legenda com a palavra-chave na primeira frase, 5 hashtags (3 específicas e 2 de categoria média), fonte citada e chamada provisória T49. A arte final é da agência, com a logo oficial.</p>
  <div class="grid g2">${F('producao.gravado','Vídeo gravado',{type:'check',hint:'Dr. Bruno, ou outra pessoa na falta dele.'})}${F('producao.pecas','Peças visuais produzidas pela agência',{type:'check'})}</div>
  ${prevSection(p)}`}
 if(n===7){const rc=p.revCom||{},rt=p.revTec||{};const nCom=REVCOM.filter(([k])=>rc[k]).length;const at=p.aprovTec;
  return `<div><h3>7. Revisar</h3><p class="muted" style="margin:-6px 0 0">Revisão de comunicação em todas as peças. Stories feitos pelo Dr. Bruno não passam por esta etapa.</p></div>
  <div><h4>Revisão de comunicação (${nCom} de ${REVCOM.length})</h4>${REVCOM.map(([k,l])=>F('revCom.'+k,l,{type:'check'})).join('')}
   <div class="row" style="margin-top:8px">${p.aprovCom?`<span class="chip ok">Comunicação aprovada por ${esc(nameOf(p.aprovCom.by))}, ${ago(p.aprovCom.at)}</span><button class="btn ghost" onclick="aprovCom(false)">Desfazer</button>`:`<button class="btn pri" onclick="aprovCom(true)">Aprovar comunicação</button>`}</div></div>
  <div><h4>Padrão visual da agência (${REVVIS.filter(([k])=>(p.revVis||{})[k]).length} de ${REVVIS.length})</h4><p class="muted small" style="margin:-4px 0 4px">Checklist da seção 13 do Manual de Padrão Visual, antes de a peça ir para a revisão de comunicação.</p>${REVVIS.map(([k,l])=>F('revVis.'+k,l,{type:'check'})).join('')}</div>
  ${brunoBox(p,'Revisão técnica',`${p.tecnicoNovo?'<p class="note warn" style="margin:0">Conteúdo jurídico técnico novo: só publica depois desta revisão.</p>':'<p class="muted small" style="margin:0">Não exigida: a pauta não está marcada como conteúdo jurídico técnico novo. Pode ser usada mesmo assim.</p>'}
   ${REVTEC.map(([k,l])=>F('revTec.'+k,l,{type:'check'})).join('')}
   ${F('parecer','Parecer do Dr. Bruno',{type:'textarea',rows:3,ph:'Ajustes pedidos, ressalvas, ok final.'})}
   <div class="row">${at?`<span class="chip ${at.resultado==='aprovado'?'ok':'warn'}">${at.resultado==='aprovado'?'Aprovado tecnicamente':'Ajustes pedidos'} por ${esc(nameOf(at.by))}, ${ago(at.at)}</span>${!isBruno(at.by)?'<span class="chip warn">Registrado por quem não é o Dr. Bruno</span>':''}<button class="btn ghost" onclick="aprovTec(null)">Desfazer</button>`:`<button class="btn gold" onclick="aprovTec('aprovado')">Aprovar tecnicamente</button><button class="btn" onclick="aprovTec('ajustes')">Pedir ajustes</button>`}</div>`)}`}
 if(n===8){const s2=s;const pubd=p.publicacao?.data||'';const dl=pubd?parseYmd(pubd):null;let lib='';if(dl){const l=new Date(dl);l.setDate(l.getDate()+7);lib=l>new Date()?`Leitura das métricas a partir de ${l.toLocaleDateString('pt-BR')}. Um post pode crescer dias depois de publicado.`:'Já passou 7 dias: pode ler as métricas.'}
  return `<div><h3>8. Publicar, registrar e medir</h3><p class="muted" style="margin:-6px 0 0">Publicar no horário combinado e cumprir a sequência do dia. Mais de uma publicação no dia: pelo menos 30 minutos entre elas (T29).</p></div>
  ${p.status!=='Aprovada'&&STATUS.indexOf(p.status)<5?'<p class="note warn">A pauta ainda não está “Aprovada”. Texto escrito não basta: confira a etapa 7.</p>':''}
  <div class="grid g3">${F('publicacao.data','Publicada em',{type:'date'})}${F('publicacao.hora','Horário',{type:'time'})}${F('publicacao.por','Publicada por',{ph:'Agência, Everton…'})}</div>
  <div class="grid g2">${CANAIS.map(c=>F('publicacao.links.'+c,'Link no '+c,{type:'url'})).join('')}</div>
  ${lib?`<p class="note">${lib}</p>`:''}
  <div><h4>Números da planilha (lidos depois de 7 dias)</h4><div class="grid g3">${F('metricas.alcance','Alcance',{type:'number'})}${F('metricas.salvamentos','Salvamentos',{type:'number'})}${F('metricas.compart','Compartilhamentos',{type:'number'})}</div></div>
  ${F('metricas.obs','Observação',{ph:'O que repetir, o que ajustar'})}
  ${s2?`<p class="note small">O que olhar primeiro em ${esc(s2.nome)}: ${esc(s2.medir)}</p>`:''}
  ${p.metricas?.alcance!=null&&p.status!=='Analisada'?`<div><button class="btn pri" onclick="setStatus('${S.pid}','Analisada')">Marcar como analisada</button></div>`:''}`}
 return '';
}
function setVal(path,v){const el=document.querySelector(`[data-f="${path}"]`);if(el){el.value=v;saveField(el)}}
async function usarSerie(k){const el={value:k,dataset:{special:'serie'}};await special(el)}
async function validar(ok){await writePauta(S.pid,{validacao:ok?{ok:true,by:S.me.id,at:nowISO()}:null,brunoEdit:{by:S.me.id,at:nowISO()}});logAct(S.pid,ok?'registrou a validação de método do Dr. Bruno':'desfez a validação de método',{bruno:true});refresh(true)}
async function aprovCom(ok){await writePauta(S.pid,{aprovCom:ok?{by:S.me.id,at:nowISO()}:null});logAct(S.pid,ok?'aprovou a comunicação':'desfez a aprovação de comunicação');refresh(true)}
async function aprovTec(r){await writePauta(S.pid,{aprovTec:r?{resultado:r,by:S.me.id,at:nowISO()}:null,brunoEdit:{by:S.me.id,at:nowISO()}});
 logAct(S.pid,r==='aprovado'?'aprovou tecnicamente':r==='ajustes'?'pediu ajustes na revisão técnica':'desfez a revisão técnica',{bruno:true});refresh(true)}
function copiar(){const t=S.pautas[S.pid]?.criativo||'';navigator.clipboard?.writeText(t).then(()=>toast('Texto copiado.'),()=>toast('Não foi possível copiar. Selecione o texto e copie manualmente.'))}
/* ============ Claude dentro do app ============ */
function aiErr(e){const c=e?.code;if(c==='cancelled')return;if(c==='not_granted'){toast('O uso do Claude não foi permitido neste app.');return}if(c==='rate_limited'){toast('Muitos pedidos ao mesmo tempo. Espere um pouco e tente de novo.');return}if(c==='invalid_json'){toast('A resposta veio fora do formato. Tente de novo.');return}toast('Claude não respondeu agora. Tente de novo em instantes.')}
function pautaContext(p){const s=serieOf(p);const t=p.toques||{};const f=p.fonte2||{};
 return `PAUTA
Título de trabalho: ${p.titulo||''}
Assunto bruto: ${p.assunto||''}
Fonte: ${p.fonte||'(não informada)'} | Data do fato: ${p.dataFato?fmtD(p.dataFato):'(não informada)'} | Hoje: ${new Date().toLocaleDateString('pt-BR')}
Fato conferido: ${f.fato||''}
Interpretação da BHM: ${f.interpretacao||''}
Limites: ${f.limites||''}
Não afirmar: ${f.naoAfirmar||''}
Resposta jurídica do Dr. Bruno: ${f.resposta||''}
Série: ${s?s.nome+' ('+s.dia+')':'(não definida)'} | Recorte: ${p.recorte||''} | Pilar: ${p.pilar||''} | Subnicho/setor/cargo: ${p.subnicho||''}
Pergunta da série: ${s?.pergunta||''}
Estrutura da série (roteiro, responder em ordem, agrupar em blocos; nunca virar pergunta no slide): ${s?s.estrutura.join(' / '):''}
Ideia central: ${p.ideia||''} | Palavra-chave: ${p.palavraChave||''}
Formato: ${p.formato||''} | Ajuste do dia: ${p.ajuste||''}
Sequência do dia: abertura ${tlabel(t.abertura)||'-'}; entrega ${tlabel(t.entrega)||'-'}; ângulo ${tlabel(t.angulo)||'-'}; aprofundamento ${tlabel(t.aprofundamento)||'-'}; conversa ${tlabel(t.conversa)||'-'}; reaproveitamento ${tlabel(t.reaproveitamento)||'-'}
Observação da série: ${s?.obs||''}
Canal central: ${p.canalCentral||'Instagram'} | Variações: ${Object.entries(p.variacoes||{}).filter(([,v])=>v).map(([k])=>k).join(', ')||'-'}
Conteúdo jurídico técnico novo: ${p.tecnicoNovo?'sim':'não'} | Urgente: ${p.urgente?'sim':'não'} | Anonimizada: ${p.anonimizada?'sim':'não'}`}
async function aiFonte(){const p=S.pautas[S.pid];if(!p?.assunto){toast('Preencha o assunto bruto na etapa 1 primeiro.');return}
 S.prop={kind:'fonte',loading:true};refresh(true);
 try{const r=await S.sample.json(`${BRIEFING}

Tarefa: a partir do assunto abaixo, separe em quatro linhas curtas o que aconteceu (fato), o que a BHM interpreta, até onde vale (limites) e o que não pode ser afirmado. Use só o que está no texto. Qualquer dado que precise ser confirmado na fonte original (data, número, tribunal, Tema, status) fica marcado [CONFERIR]. Não invente nada. Sem travessão.
Responda só com JSON: {"fato":"...","interpretacao":"...","limites":"...","naoAfirmar":"..."}

${pautaContext(p)}`,{modelTier:'default',cache:false});
  S.prop={kind:'fonte',data:{'fonte2.fato':r.fato||'','fonte2.interpretacao':r.interpretacao||'','fonte2.limites':r.limites||'','fonte2.naoAfirmar':r.naoAfirmar||''},labels:{'fonte2.fato':'Fato','fonte2.interpretacao':'Interpretação','fonte2.limites':'Limites','fonte2.naoAfirmar':'Não afirmar'}};
 }catch(e){S.prop=null;aiErr(e)}refresh(true)}
async function aiClassificar(){const p=S.pautas[S.pid];if(!p?.assunto){toast('Preencha o assunto bruto na etapa 1 primeiro.');return}
 S.prop={kind:'class',loading:true};refresh(true);
 const series=SERIE_ORDEM.slice(0,5).map(k=>`- ${k}: ${SERIES[k].nome}. Recortes: ${Object.keys(SERIES[k].recortes).join(' | ')}`).join('\n');
 try{const r=await S.sample.json(`${BRIEFING}

Tarefa: classifique a pauta pela Fase 1 da BHM.
Passo 1 (tipo de material): fato novo, notícia, mudança de lei ou decisão recente → bruno; caso concreto concluído, público ou anonimizável → casos; dúvida ou situação de um cargo → cargo; questão sobre a operação de um setor → setores; como a BHM analisa ou audita algo → metodo; conceito doutrinário sem fato concreto → crie mentalmente uma situação hipotética e reclassifique (nunca casos). Teses e Reforma: nova decisão ou tema em julgamento → bruno; requisitos documentais/processuais → metodo "3. Validação e Segurança Fiscal"; risco/sustentação → metodo "5. Como Classificamos uma Tese por Risco". Tema financeiro segue a mesma triagem.
Atenção à data: Bruno Analisa trabalha com atualidades. Fato antigo sem novidade vai para Casos que Ensinam (Decisões que Ensinam, se for decisão).
Séries e recortes (use os nomes exatos):
${series}
Pilares: ${PILARES.join(' | ')}
Tipos de material: fato, caso, cargo, setor, metodo, doutrina, tese.
Responda só com JSON: {"tipoMaterial":"...","serie":"bruno|casos|setores|cargo|metodo","recorte":"nome exato","pilar":"nome exato","subnicho":"curto","porque":"2 frases, sem travessão","alertas":["..."]}

${pautaContext(p)}`,{modelTier:'default',cache:false});
  const sk=SERIES[r.serie]?r.serie:'';const rec=sk&&SERIES[sk].recortes[r.recorte]?r.recorte:'';const pil=PILARES.includes(r.pilar)?r.pilar:'';
  S.prop={kind:'class',data:{tipoMaterial:TIPOS.find(t=>t[0]===r.tipoMaterial)?r.tipoMaterial:'',serie:sk,recorte:rec,pilar:pil,subnicho:r.subnicho||''},porque:r.porque||'',alertas:Array.isArray(r.alertas)?r.alertas:[],
   labels:{tipoMaterial:'Tipo de material',serie:'Série',recorte:'Recorte',pilar:'Pilar',subnicho:'Subnicho'}};
 }catch(e){S.prop=null;aiErr(e)}refresh(true)}
function propHTML(){const pr=S.prop;if(pr.loading)return `<div class="proposal"><b>Claude está trabalhando…</b><span class="muted small">A primeira resposta pode levar alguns segundos.</span></div>`;
 const show=(k,v)=>k==='serie'?(SERIES[v]?.nome||v):k==='tipoMaterial'?(TIPOS.find(t=>t[0]===v)?.[1]||v):v;
 return `<div class="proposal"><b>Sugestão do Claude</b>${pr.porque?`<span>${esc(pr.porque)}</span>`:''}
 <dl class="kv">${Object.entries(pr.data).map(([k,v])=>`<dt>${esc(pr.labels[k])}</dt><dd>${esc(show(k,v))||'<span class="muted">sem sugestão</span>'}</dd>`).join('')}</dl>
 ${pr.alertas?.length?`<ul style="margin:0;padding-left:18px">${pr.alertas.map(a=>`<li>${esc(a)}</li>`).join('')}</ul>`:''}
 <div class="row"><button class="btn pri" onclick="applyProp()">Aplicar sugestão</button><button class="btn ghost" onclick="S.prop=null;refresh(true)">Descartar</button></div></div>`}
async function applyProp(){const pr=S.prop;if(!pr?.data)return;const p=S.pautas[S.pid];let patch={};
 Object.entries(pr.data).forEach(([k,v])=>{if(v!==''&&v!=null){const o=nestObj(k,v);patch=deepMerge(patch,o)}});
 if(pr.kind==='class'&&patch.serie){const s=SERIES[patch.serie];if(patch.recorte&&s.recortes[patch.recorte]){const r=s.recortes[patch.recorte];patch.formato=r[0];patch.ajuste=r[1];const toques={};TOQUES.forEach(([k])=>{toques[k]=(s.menu[k]?.[0])||''});patch.toques=toques}
  if(s.dow&&!p.dataPublicacao)patch.dataPublicacao=ymd(nextDow(s.dow))}
 await writePauta(S.pid,patch);logAct(S.pid,pr.kind==='class'?'aplicou a classificação sugerida pelo Claude':'aplicou o rascunho da fonte sugerido pelo Claude');S.prop=null;refresh(true)}
function deepMerge(a,b){for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])){a[k]=deepMerge(a[k]||{},b[k])}else a[k]=b[k]}return a}
function pedidoTexto(tipo){
 const base={
  'Pacote do dia completo':`Entregue o pacote do dia completo, nesta ordem, com cada seção começando por um título em linha própria:
1. CLASSIFICAÇÃO: série, recorte e pilar, com o porquê em uma frase.
2. DUAS OPÇÕES DE GANCHO OU TÍTULO.
3. PEÇA PRINCIPAL no formato definido. Carrossel: siga a estrutura de carrossel da série; para cada slide informe tom (escuro ou claro, alternando a partir da capa escura), rótulo do bloco, título em duas linhas (linha de contexto em traço fino / ideia central em negrito), tarja (no máximo uma palavra, ou nenhuma), texto de apoio, elemento (caixa de destaque, cartões de leitura, lista numerada ou nenhum) e sugestão visual; primeiro slide para o dedo; fonte no rodapé dos slides que citam decisão ou norma e completa no último. Vídeo: gancho nos 3 primeiros segundos, roteiro em blocos e texto de tela. Se houver F07, o texto do LinkedIn em primeira pessoa do Dr. Bruno.
4. LEGENDA com a palavra-chave na primeira frase e a chamada T49 no fim.
5. HASHTAGS: 5, sendo 3 específicas e 2 de categoria média.
6. STORIES DO DIA seguindo a sequência de toques definida, com o texto resumido de cada tela.
7. VARIAÇÕES POR CANAL: versão leve para Instagram e Facebook (1080 × 1440), carrossel completo para o LinkedIn em PDF (1080 × 1350) e post único do LinkedIn com imagem própria e texto em primeira pessoa do Dr. Bruno. Indique o modo de imagem e a posição da logo.
8. AVISOS: liste os [CONFERIR] e diga se precisa da revisão do Dr. Bruno.`,
  'Carrossel':'Entregue: 2 opções de título; carrossel slide a slide na estrutura da série (para cada slide: tom escuro ou claro alternando a partir da capa escura, rótulo do bloco, título em duas linhas com contexto e ideia central, tarja de no máximo uma palavra, texto de apoio, elemento e sugestão visual; primeiro slide para o dedo; fonte no rodapé e completa no último); versão leve para Instagram e Facebook e completa para o LinkedIn; legenda com a palavra-chave na primeira frase e chamada T49; 5 hashtags (3 específicas e 2 de categoria média); avisos de [CONFERIR] e de revisão do Dr. Bruno.',
  'Reels':'Entregue: 2 opções de gancho; roteiro de Reels com gancho nos 3 primeiros segundos, blocos de fala e texto de tela de cada bloco; sugestão de capa (T18); legenda com a palavra-chave na primeira frase e chamada T49; 5 hashtags; avisos.',
  'Stories':'Entregue a sequência de Stories do dia seguindo os toques definidos (abertura, aprofundamento e conversa), com começo, meio e fim, texto resumido em cada tela e o sticker de cada uma; avisos.',
  'LinkedIn':'Entregue: 2 opções de primeira linha; texto para o LinkedIn em primeira pessoa do Dr. Bruno, publicado na página da BHM e assinado por ele, com a leitura, as ressalvas e as respostas da estrutura; chamada T49; 5 hashtags; avisos.'};
 return base[tipo]||base['Pacote do dia completo']}
async function aiCriativo(pidArg){const pid0=(typeof pidArg==='string'&&pidArg)||S.pid;const p=S.pautas[pid0];if(!p.serie){toast('Defina a série na etapa 3 antes de gerar.');return}
 const tipo=p.tipoCriativo||'Pacote do dia completo';
 const prompt=`${BRIEFING}

${pautaContext(p)}
Observação do pedido: ${p.obsCriativo||'-'}

PEDIDO: ${tipo}
${pedidoTexto(tipo)}
Regras de forma: texto simples em português do Brasil, sem markdown pesado, sem tabelas, sem asteriscos de negrito. Nunca use travessão. Não invente número, lei, artigo, Tema ou decisão: escreva sem o dado e marque [CONFERIR]. Fato com data antiga leva a data no texto e não é chamado de recente. Exemplo criado para explicar leva "exemplo hipotético".`;
 await runGen(prompt,'gerou o criativo com Claude ('+tipo+')',pid0)}
async function aiAjustar(){const p=S.pautas[S.pid];const inp=$('#ajusteTxt');const pedido=inp?.value.trim();if(!pedido){toast('Escreva o ajuste que você quer.');inp?.focus();return}
 const prompt=`${BRIEFING}

${pautaContext(p)}

TEXTO ATUAL DO CRIATIVO:
${p.criativo}

AJUSTE PEDIDO: ${pedido}
Devolva o criativo inteiro já ajustado, no mesmo formato, mudando só o que o pedido exige. Texto simples, sem markdown pesado, sem travessão, sem inventar dados (use [CONFERIR]).`;
 await runGen(prompt,'ajustou o criativo com Claude: “'+pedido.slice(0,80)+'”')}
async function runGen(prompt,logMsg,pidArg){
 const pid=pidArg||S.pid;const ctl=new AbortController();S.gen={pid,ctl,text:''};refresh(true);
 try{const r=await S.sample(prompt,{signal:ctl.signal,cache:false,modelTier:'default',onText:({text})=>{S.gen.text=text;const g=$('#genOut');if(g)g.textContent=text}});
  const pc=S.pautas[pid]||{};await writePauta(pid,{criativo:r.text,criativoMeta:{by:S.me.id,at:nowISO(),serie:pc.serie||'',recorte:pc.recorte||''}});logAct(pid,logMsg);if(r.truncated)toast('A resposta foi cortada no limite de tamanho. Peça uma parte de cada vez.');
  const inp=$('#ajusteTxt');if(inp)inp.value='';
 }catch(e){if(e?.code==='cancelled'&&S.gen?.text){toast('Geração interrompida. O texto anterior foi mantido.')}else aiErr(e)}
 S.gen=null;refresh(true)}

/* ============ Colar o tema: o Claude monta o resto ============ */
function abrirColar(pre={}){S.modalOpen=true;window._pre=pre;
 $('#modal').innerHTML=`<div class="modal-bg"><div class="modal paste" role="dialog" aria-modal="true" aria-labelledby="mh2" style="max-width:640px"><h3 id="mh2">Nova pauta</h3>
 <p class="muted" style="margin:0">Cole o tema como chegou. O Claude explica o assunto, classifica pela Fase 1, monta o pacote da Fase 2 e escreve o criativo. Tudo fica editável depois.</p>
 <label class="f">Tema<textarea id="mTxt" placeholder="Notícia, texto de página, dúvida de cliente, caso…"></textarea></label>
 <label class="f">Link da página<span class="hint">Opcional. O Claude não abre o link, mas ele fica registrado para a conferência da fonte.</span><input type="url" id="mLink" placeholder="https://"></label>
 ${pre.dataPublicacao?`<p class="note small">Publicação prevista para ${fmtD(pre.dataPublicacao)}.</p>`:''}
 <div class="row"><button class="btn ghost" onclick="closeModal()">Cancelar</button><span class="sp"></span><button class="btn" onclick="closeModal();criarPauta(window._pre)">Criar em branco</button><button class="btn gold" onclick="const t=$('#mTxt').value,l=$('#mLink').value;closeModal();autoPauta(t,l,window._pre)" ${S.sample?'':'disabled title="O Claude está indisponível agora"'}><span class="dia f"></span>Montar com Claude</button></div></div></div>`;
 setTimeout(()=>$('#mTxt')?.focus(),50)}
async function autoPauta(texto,link,pre={}){
 texto=(texto||'').trim();link=(link||'').trim();
 if(texto.length<30){toast('Cole um texto um pouco maior para o Claude entender o tema.');return}
 if(!S.db||!S.sample){toast('O Claude está indisponível agora.');return}
 const id='p'+uidShort();
 const d={titulo:'Pauta em montagem',assunto:texto.slice(0,20000),fonte:link,quemEnviou:nameOf(S.me.id),dataEntrada:todayStr(),dataFato:'',urgente:false,tecnicoNovo:false,reserva:false,
  dataPublicacao:pre.dataPublicacao||'',serie:'',recorte:'',status:'Recebida',etapas:{},criadoPor:S.me.id,criadoEm:nowISO(),atualizadoPor:S.me.id,atualizadoEm:nowISO()};
 try{await S.db.doc('pautas/'+id).set(d)}catch(e){handleWriteErr(e);return}
 S.pautas[id]=d;S.quick={t:'',l:''};logAct(id,'colou um tema e pediu ao Claude para montar a pauta',{titulo:'Pauta em montagem'});
 S.auto={pid:id,fase:1};openPauta(id,6);
 const series=SERIE_ORDEM.slice(0,5).map(k=>`- ${k}: ${SERIES[k].nome} (${SERIES[k].dia}). Pergunta: ${SERIES[k].pergunta} Recortes: ${Object.keys(SERIES[k].recortes).join(' | ')}`).join('\n');
 const prompt=`${BRIEFING}

Você é o editor de pautas da BHM. Alguém colou um material sem saber do que se trata. Faça a triagem completa pela Fase 1 e prepare a pauta.

TRIAGEM DA FASE 1
Passo 1, tipo de material: fato novo, notícia, mudança de lei ou decisão recente → bruno; caso concreto concluído, público ou anonimizável → casos; dúvida ou situação de um cargo → cargo; questão sobre a operação de um setor → setores; como a BHM analisa ou audita algo → metodo; conceito doutrinário sem fato concreto → imagine uma situação hipotética e reclassifique (nunca casos). Teses e Reforma: nova decisão ou tema em julgamento → bruno (recorte "O Que Não Pode Ser Concluído Ainda" se a tese é controvertida, ou "Reforma na Prática"); requisitos documentais/processuais → metodo "3. Validação e Segurança Fiscal"; risco/sustentação → metodo "5. Como Classificamos uma Tese por Risco". Tema financeiro segue a mesma triagem.
Se couber em mais de uma série, decida pelo objetivo: reagir rápido → bruno; estudo com contexto e aprendizado → casos. Ofereça a outra como alternativa.
Data: Bruno Analisa trabalha com atualidades. Procure no texto a data do fato (julgamento, publicação da norma), que pode ser diferente da data da matéria. Hoje é ${new Date().toLocaleDateString('pt-BR')}. Fato antigo sem novidade → casos. Se a data não estiver clara, deixe dataFato vazio e explique em dataAlerta.
Subnicho: confirme que importa para o público da BHM. Se não importar, diga em alertas.
Séries e recortes (use os nomes exatos):
${series}
Pilares (nome exato): ${PILARES.join(' | ')}
Canais: Instagram, LinkedIn, YouTube, Facebook.

Responda só com JSON neste formato:
{"titulo":"título de trabalho curto e específico","explicacao":"3 a 5 frases em linguagem simples, para quem não é advogado: do que se trata e qual o impacto no caixa ou na decisão da empresa","tipoMaterial":"fato|caso|cargo|setor|metodo|doutrina|tese","serie":"bruno|casos|setores|cargo|metodo","recorte":"nome exato","porque":"2 frases dizendo por que esta série e este recorte","alternativas":[{"serie":"...","recorte":"nome exato","porque":"1 frase"}],"pilar":"nome exato","subnicho":"cargo, setor ou público específico","dataFato":"AAAA-MM-DD ou vazio","dataAlerta":"observação sobre a data, ou vazio","tecnicoNovo":true,"urgente":false,"fato":"o que aconteceu","interpretacao":"o que a BHM interpreta","limites":"até onde vale","naoAfirmar":"o que não pode ser afirmado","ideia":"Depois de ver este conteúdo, o público precisa entender que...","palavraChave":"palavra-chave do tema","canalCentral":"Instagram|LinkedIn","conferir":["pontos objetivos que alguém precisa confirmar na fonte original"],"alertas":["cuidados de publicidade, nomes, dados, escopo"]}
Regras: até 2 alternativas. tecnicoNovo é true quando há tese ou interpretação de lei. Use só o que está no texto e marque [CONFERIR] em qualquer dado a confirmar. Não invente julgados, Temas, números ou leis. Sem travessão.

MATERIAL COLADO
Link: ${link||'(não informado)'}
${texto.slice(0,60000)}`;
 let r;
 try{r=await S.sample.json(prompt,{modelTier:'default',cache:false})}catch(e){S.auto=null;aiErr(e);await writePauta(id,{titulo:'Pauta sem montagem (tente de novo)'});refresh(true);return}
 const sk=SERIES[r.serie]?r.serie:'';const rec=sk&&SERIES[sk].recortes[r.recorte]?r.recorte:'';const s=SERIES[sk];
 const alts=(Array.isArray(r.alternativas)?r.alternativas:[]).filter(a=>SERIES[a.serie]&&SERIES[a.serie].recortes[a.recorte]&&!(a.serie===sk&&a.recorte===rec)).slice(0,2);
 const patch={titulo:(r.titulo||'Pauta').slice(0,160),tipoMaterial:TIPOS.find(t=>t[0]===r.tipoMaterial)?r.tipoMaterial:'',serie:sk,recorte:rec,pilar:PILARES.includes(r.pilar)?r.pilar:'',subnicho:r.subnicho||'',
  dataFato:/^\d{4}-\d{2}-\d{2}$/.test(r.dataFato||'')?r.dataFato:'',tecnicoNovo:!!r.tecnicoNovo,urgente:!!r.urgente,
  fonte2:{fato:r.fato||'',interpretacao:r.interpretacao||'',limites:r.limites||'',naoAfirmar:r.naoAfirmar||''},
  ideia:r.ideia||'',palavraChave:r.palavraChave||'',canalCentral:CANAIS.includes(r.canalCentral)?r.canalCentral:'Instagram',tipoCriativo:'Pacote do dia completo',status:'Classificada',tom:'escuro',modoImagem:'sem',versoes:{igfb:true,lidoc:true,lipost:true},
  auto:{por:S.me.id,em:nowISO(),explicacao:r.explicacao||'',porque:r.porque||'',alternativas:alts,conferir:(r.conferir||[]).slice(0,8),alertas:(r.alertas||[]).slice(0,6),dataAlerta:r.dataAlerta||'',original:{serie:sk,recorte:rec}}};
 if(s&&rec){const rc=s.recortes[rec];patch.formato=rc[0];patch.ajuste=rc[1];const toques={};TOQUES.forEach(([k])=>{toques[k]=(s.menu[k]?.[0])||''});patch.toques=toques}
 if(s?.dow&&!d.dataPublicacao)patch.dataPublicacao=ymd(nextDow(s.dow));
 const vari={};CANAIS.filter(c=>c!==patch.canalCentral).forEach(c=>vari[c]=true);patch.variacoes=vari;
 await writePauta(id,patch);logAct(id,'recebeu do Claude a classificação: '+(s?s.nome:'sem série')+(rec?', '+rec:''));
 if(!sk){S.auto=null;toast('O Claude não conseguiu classificar com segurança. Escolha a série no resumo.');refresh(true);return}
 S.auto={pid:id,fase:2};refresh(true);
 await new Promise(r=>setTimeout(r,60));
 await aiCriativo(id);
 await new Promise(r=>setTimeout(r,150));
 if(S.pautas[id]?.criativo){await writePauta(id,{status:'Em produção'});S.auto={pid:id,fase:3};refresh(true);await aiPrevia(id)}
 S.auto=null;refresh(true);
}
function autoPanel(p){
 const run=S.auto&&S.auto.pid===S.pid;
 if(run&&S.auto.fase===1)return `<div class="auto"><div class="auto-h"><span class="dia f"></span><b>O Claude está montando a pauta</b></div><div class="auto-b"><ol class="prog"><li class="on"><span class="dia"></span>Entendendo o tema e classificando pela Fase 1</li><li><span class="dia"></span>Montando o pacote do dia da Fase 2</li><li><span class="dia"></span>Escrevendo o criativo</li><li><span class="dia"></span>Montando a prévia visual dos slides</li></ol><p class="muted small" style="margin:0">Isso leva de 20 segundos a 1 minuto. Pode continuar usando o app.</p></div></div>`;
 const a=p.auto;if(!a)return '';
 if(S.autoHide[S.pid])return `<div class="row" style="margin-bottom:18px"><button class="btn" onclick="S.autoHide[S.pid]=false;refresh(true)"><span class="dia f"></span>Mostrar o resumo do Claude</button></div>`;
 const s=serieOf(p);const cm=p.criativoMeta;const mudou=cm&&(cm.serie!==p.serie||cm.recorte!==p.recorte);
 const alterado=a.original&&(a.original.serie!==p.serie||a.original.recorte!==p.recorte);
 const conf=[...(a.dataAlerta?['Data: '+a.dataAlerta]:[]),...(a.conferir||[])];
 return `<div class="auto"><div class="auto-h"><span class="dia f"></span><b>O que o Claude montou</b><span class="muted small">a pedido de ${who(a.por)}, ${ago(a.em)}</span><span class="sp"></span><button class="btn ghost" onclick="S.autoHide[S.pid]=true;refresh(true)">Ocultar</button></div>
 <div class="auto-b">
  ${a.explicacao?`<div><h4>Do que se trata</h4><p class="expl">${esc(a.explicacao)}</p></div>`:''}
  ${run?`<ol class="prog"><li class="ok"><span class="dia f"></span>Tema classificado</li><li class="ok"><span class="dia f"></span>Pacote do dia montado</li>${S.auto.fase===3?'<li class="ok"><span class="dia f"></span>Criativo escrito</li><li class="on"><span class="dia"></span>Montando a prévia visual dos slides</li>':'<li class="on"><span class="dia"></span>Escrevendo o criativo (acompanhe abaixo, na etapa 6)</li><li><span class="dia"></span>Montando a prévia visual dos slides</li>'}</ol>`:''}
  <div><h4>Onde se encaixa${alterado?' <span class="chip">alterado por você</span>':''}</h4>
  <div class="auto-grid">
   <label class="f">Série<select data-f="serie" data-special="serie" data-label="Série" aria-label="Série">${SERIE_ORDEM.map(k=>`<option value="${k}" ${p.serie===k?'selected':''}>${esc(SERIES[k].nome)} (${esc(SERIES[k].dia)})</option>`).join('')}</select></label>
   <label class="f">Recorte<select data-f="recorte" data-special="recorte" data-label="Recorte" aria-label="Recorte"><option value="">Escolher…</option>${s?Object.keys(s.recortes).map(r=>`<option value="${esc(r)}" ${p.recorte===r?'selected':''}>${esc(r)}${FIN.has(r)?' (a validar)':''}</option>`).join(''):''}</select></label>
   <label class="f">Pilar<select data-f="pilar" data-label="Pilar" aria-label="Pilar"><option value="">Escolher…</option>${PILARES.map(x=>`<option ${p.pilar===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>
   ${a.porque&&!alterado?`<p class="why">Por quê: ${esc(a.porque)}</p>`:''}
  </div></div>
  ${a.alternativas?.length?`<div><h4>Outros encaixes possíveis</h4><div class="stack" style="gap:8px">${a.alternativas.map((x,i)=>{const cur=x.serie===p.serie&&x.recorte===p.recorte;return `<div class="row"><span class="sp small"><b>${esc(SERIES[x.serie].nome)}, ${esc(x.recorte)}.</b> <span class="muted">${esc(x.porque||'')}</span></span>${cur?'<span class="chip ok">Em uso</span>':`<button class="btn" onclick="usarAlt(${i})">Usar este</button>`}</div>`}).join('')}
   ${alterado?`<div class="row"><span class="sp small muted">Sugestão original: ${esc(SERIES[a.original.serie]?.nome||'')}, ${esc(a.original.recorte)}.</span><button class="btn ghost" onclick="usarAlt(-1)">Voltar à sugestão original</button></div>`:''}</div></div>`:''}
  <div class="grid g2"><div><h4>Ideia central</h4><p class="small" style="margin:0">${esc(p.ideia||'Sem ideia definida')}</p></div><div><h4>Pacote do dia</h4><p class="small" style="margin:0">${esc(p.formato||'Escolha o recorte')}${p.dataPublicacao?`, publicação em ${fmtD(p.dataPublicacao)}`:''}</p></div></div>
  ${conf.length||a.alertas?.length?`<div class="note warn"><b>Para você conferir antes de seguir</b><ul style="margin:6px 0 0;padding-left:18px">${conf.map(c=>`<li>${esc(c)}</li>`).join('')}${(a.alertas||[]).map(c=>`<li>${esc(c)}</li>`).join('')}${p.tecnicoNovo?'<li>Marcado como conteúdo jurídico técnico novo: precisa da revisão do Dr. Bruno.</li>':''}</ul></div>`:''}
  ${mudou?'<p class="note">Você mudou a classificação depois do último criativo. Refaça para o texto seguir a nova série e o novo recorte.</p>':''}
  <div class="row">${run?'':`<button class="btn ${mudou?'gold':''}" onclick="S.etapa=6;refresh(true);aiCriativo()" ${p.recorte?'':'disabled'}>Refazer o criativo com estas escolhas</button>`}<button class="btn ghost" onclick="S.etapa=6;announce();refresh(true)">Ver o criativo</button><button class="btn ghost" onclick="S.etapa=2;announce();refresh(true)">Conferir a fonte</button></div>
 </div></div>`}
async function usarAlt(i){const p=S.pautas[S.pid];const a=p.auto;const x=i<0?a.original:a.alternativas[i];if(!x)return;const s=SERIES[x.serie];const rc=s.recortes[x.recorte];
 const toques={};TOQUES.forEach(([k])=>{toques[k]=(s.menu[k]?.[0])||''});
 const patch={serie:x.serie,recorte:x.recorte,formato:rc[0],ajuste:rc[1],toques};if(s.dow)patch.dataPublicacao=ymd(nextDow(s.dow));
 await writePauta(S.pid,patch);logAct(S.pid,'trocou o encaixe para '+s.nome+', '+x.recorte);refresh(true)}

/* ============ Visual da peça e prévia dos slides (Manual de Padrão Visual) ============ */
function visualFields(p){const semDireito=p.modoImagem&&p.modoImagem!=='sem'&&!p.fotoDireito;
 return `<div class="panel" style="background:var(--navy-tint);border-color:transparent"><h4>Visual da peça (Manual de Padrão Visual)</h4>
  <div class="grid g3">${F('tom','Tom da capa e do post',{type:'select',opts:[['escuro','Escuro'],['claro','Claro']],hint:'O carrossel alterna escuro e claro a partir da capa.'})}${F('modoImagem','Modo de imagem',{type:'select',opts:MODOS})}
   <div><span style="font-size:13px;font-weight:500">Versões a entregar</span>${F('versoes.igfb','Instagram e Facebook: versão leve, 1080 × 1440',{type:'check'})}${F('versoes.lidoc','LinkedIn: carrossel completo em PDF, 1080 × 1350',{type:'check'})}${F('versoes.lipost','LinkedIn: post único com imagem própria',{type:'check'})}</div></div>
  ${p.modoImagem&&p.modoImagem!=='sem'?`<div class="grid g2" style="margin-top:12px">${F('fotoOrigem','Foto: origem',{ph:'Ex.: foto do Dr. Bruno no escritório; banco de imagens licenciado'})}<div>${F('fotoDireito','Direito de uso da foto confirmado',{type:'check'})}
   <div class="row" style="margin-top:6px">${p.fotoUrl?`<img src="${esc(p.fotoUrl)}" alt="Foto da peça" style="height:56px;border-radius:3px">`:''}${S.assets?`<label class="btn"><input type="file" accept="image/jpeg,image/png,image/webp" hidden onchange="uploadFoto(this.files[0])">${p.fotoUrl?'Trocar foto':'Enviar foto para a prévia'}</label>`:''}</div></div></div>`:''}
  ${semDireito?'<p class="note warn" style="margin:12px 0 0">Foto de produto, de marca ou de terceiros só entra com direito de uso confirmado.</p>':''}
  <p class="muted small" style="margin:12px 0 0">Nunca texto direto sobre a foto, e o título nunca cobre o rosto. Toda peça sai em versão escura e clara.</p></div>`}
function prevSlides(p){const s=p.prev?.s||{};return Object.keys(s).map(Number).filter(n=>!isNaN(n)).sort((a,b)=>a-b).map(k=>s[k]).filter(Boolean)}
function isDark(p,i,post){const start=p.tom!=='claro';return post?start:((i%2===0)===start)}
function logoHTML(dark,size){const m=S.marca||{};const src=dark?(m.logoClaroUrl||m.logoUrl):m.logoNavyUrl;
 return src?`<div class="logo" style="width:${size}px;height:${size}px"><img alt="Logo BHM" src="${esc(src)}"></div>`:`<div class="logo ph" style="width:${size}px;height:${size}px">LOGO<br>OFICIAL</div>`}
function tituloHTML(sl,size){const id=sl.ideia||'';const tj=(sl.tarja||'').trim();let ideia=esc(id);
 if(tj){const i=id.toLowerCase().indexOf(tj.toLowerCase());if(i>=0)ideia=esc(id.slice(0,i))+'<span class="tarja">'+esc(id.slice(i,i+tj.length))+'</span>'+esc(id.slice(i+tj.length))}
 return `<h2 class="tt" style="font-size:${size}px">${sl.contexto?`<span class="c">${esc(sl.contexto)}</span>`:''}<span class="i">${ideia}</span></h2>`}
function elementoHTML(sl,o){
 if(sl.c1t||sl.c2t)return `<div class="cards"><div class="card a"><b>${esc(sl.c1r||'Leitura 1')}</b><p>${esc(sl.c1t||'')}</p></div><div class="ou">ou</div><div class="card b"><b>${esc(sl.c2r||'Leitura 2')}</b><p>${esc(sl.c2t||'')}</p></div></div>`;
 if(o.capa||o.post)return '';
 if(sl.dt)return `<div class="bx">${sl.dr?`<b>${esc(sl.dr)}</b>`:''}<p>${esc(sl.dt)}</p></div>`;
 const it=String(sl.lista||'').split(/\n|\|/).map(x=>x.trim()).filter(Boolean).slice(0,5);
 if(it.length)return `<ol class="ls">${it.map((t,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${esc(t)}</li>`).join('')}</ol>`;
 return ''}
function slideHTML(p,sl,o){
 const s=serieOf(p);const pr=p.prev||{};const serieLab=esc((s?.nome||'Série').toUpperCase());const tema=esc(String(pr.tema||'').toUpperCase());
 const li=o.canal==='li';const H=li?1350:1440;const dark=isDark(p,o.i,o.post);const cap=o.capa||o.post;
 const modo=cap?(p.modoImagem||'sem'):'sem';const areaH=li?(o.post?560:600):700;
 const foto=p.fotoUrl?`<img alt="" src="${esc(p.fotoUrl)}">`:`<div class="ph-photo">Foto</div>`;
 const size=o.post?(modo==='area'?84:modo==='fundo'?100:(li?106:112)):o.capa?(modo==='area'?88:modo==='fundo'?104:(li?106:112)):(li?96:100);
 const header=modo==='area'?`<div class="serie" style="margin-bottom:28px">${serieLab}${tema?' · '+tema:''}</div>`
  :`<div class="hd${cap?' nofil':''}"><span class="serie">${serieLab}</span>${cap?(tema?`<span class="etp">${tema}</span>`:''):`<span class="etp"><i></i>${esc(String(sl.etapa||'').toUpperCase())}</span>`}</div>`;
 const el=elementoHTML(sl,o);const apoio=sl.apoio&&!(o.post&&modo==='area')?`<p class="ap">${esc(sl.apoio)}</p>`:'';
 const body=cap?`${modo==='sem'?'<div class="los"></div>':''}${tituloHTML(sl,size)}${o.post?el+'<div style="height:34px"></div>'+apoio:'<div style="height:40px"></div>'+apoio+el}`
  :`${tituloHTML(sl,size)}<div class="fil"></div>${apoio}${el}`;
 const num=!o.post?`<span class="num">${String(o.i+1).padStart(2,'0')} / ${String(o.total).padStart(2,'0')}${li?' · Leitura do Dr. Bruno':''}</span>`:'';
 const ass=o.post&&li?'<span class="ass">Leitura do Dr. Bruno · BHM Advogados</span>':'';
 const fonte=(o.post||sl.fonte||o.last)&&pr.fonte?`<span>${esc(pr.fonte)}</span>`:'';
 return `<div class="sl ${dark?'dk':'lt'}${modo==='area'?' has-area':''}${modo==='fundo'?' has-bg':''}" style="height:${H}px;${modo==='area'?`padding-top:${areaH+56}px`:''}">
  ${modo==='area'?`<div class="area" style="height:${areaH}px">${foto}${logoHTML(true,96)}</div>`:''}${modo==='fundo'?`<div class="bg">${foto}</div>`:''}
  ${header}${modo==='fundo'?`<div style="height:${li?440:500}px;flex:none"></div>`:''}<div class="body">${body}</div>
  <div class="ft"><div class="l">${ass}${num}${fonte}</div>${modo==='area'?'':logoHTML(dark,o.post?84:84)}</div></div>`}
function slideBox(inner,H,w,onclick){const sc=w/1080;return `<div class="sl-wrap" style="width:${w}px;height:${Math.round(H*sc)}px" ${onclick?`role="button" tabindex="0" onclick="${onclick}" onkeydown="if(event.key==='Enter')${onclick}"`:''}><div style="transform:scale(${sc});transform-origin:top left;width:1080px;height:${H}px">${inner}</div></div>`}
function prevItems(p,v){const sl=prevSlides(p);const post=v==='pig'||v==='pli';
 if(post)return [{s:{...(p.prev?.post||{})},o:{i:0,total:1,canal:v==='pli'?'li':'ig',post:true,capa:true,last:true},lab:'Post único'}];
 return sl.map((s,i)=>({s,o:{i,total:sl.length,canal:v==='li'?'li':'ig',post:false,capa:i===0,last:i===sl.length-1},lab:(i+1)+'. '+(s.etapa||(i===0?'Capa':'Slide'))}))}
function prevSection(p){const sl=prevSlides(p);const gen=S.prevGen===S.pid;const v=S.prevView||'ig';let body='';
 if(gen)body='<div class="proposal"><b>Claude está montando a prévia…</b><span class="muted small">Ele transforma o criativo no texto de cada arte, no padrão do Manual.</span></div>';
 else if(!sl.length)body=`<p class="muted small" style="margin:0">A prévia desenha cada slide com o texto real da pauta, nas cores, fontes e medidas do Manual de Padrão Visual. A arte final continua sendo da agência, com a logo oficial.</p><div class="row"><button class="btn gold" onclick="aiPrevia()" ${S.sample&&p.criativo?'':'disabled'}><span class="dia f"></span>Montar a prévia visual com Claude</button>${p.criativo?'':'<span class="muted small">Gere o criativo primeiro.</span>'}</div>`;
 else{const H=(v==='li'||v==='pli')?1350:1440;const tabs=[['ig','Carrossel Instagram e Facebook'],['li','Carrossel LinkedIn (PDF)'],['pig','Post Instagram e Facebook'],['pli','Post LinkedIn']];
  body=`<div class="row" style="gap:6px">${tabs.map(([k,l])=>`<button class="btn${v===k?' pri':''}" aria-pressed="${v===k}" onclick="S.prevView='${k}';refresh(true)">${l}</button>`).join('')}</div>
  <div class="row"><span class="small muted">Tom</span>${[['escuro','Escuro'],['claro','Claro']].map(([k,l])=>`<button class="btn${(p.tom||'escuro')===k?' pri':''}" onclick="setTom('${k}')">${l}</button>`).join('')}<span class="small muted" style="margin-left:10px">Imagem</span><select data-f="modoImagem" data-label="Modo de imagem" style="width:auto" aria-label="Modo de imagem">${MODOS.map(([k,l])=>`<option value="${k}" ${(p.modoImagem||'sem')===k?'selected':''}>${l}</option>`).join('')}</select>${(p.modoImagem||'sem')!=='sem'&&!p.fotoUrl?'<span class="muted small">Envie a foto na etapa 5.</span>':''}</div>
  <div class="prev-grid">${prevItems(p,v).map((it,n)=>`<div class="prev-item">${slideBox(slideHTML(p,it.s,it.o),H,240,'zoomSlide('+n+')')}<span>${esc(it.lab)}</span></div>`).join('')}</div>
  ${(S.marca.logoClaroUrl||S.marca.logoUrl)&&S.marca.logoNavyUrl?'':'<p class="note small" style="margin:0">A logo aparece como espaço reservado até as duas versões do arquivo oficial serem enviadas em Equipe e referência.</p>'}
  ${S.prevEdit?prevEditHTML(p,sl):''}`}
 return `<div class="panel" style="border-color:var(--gold);display:flex;flex-direction:column;gap:14px"><div class="row"><h3 style="margin:0">Prévia visual</h3><span class="sp"></span>${sl.length&&!gen?`<button class="btn ghost" onclick="S.prevEdit=!S.prevEdit;refresh(true)">${S.prevEdit?'Fechar edição':'Editar textos dos slides'}</button><button class="btn ghost" onclick="aiPrevia()" ${S.sample?'':'disabled'}>Refazer com Claude</button>`:''}</div>${body}${p.prev?.by?`<span class="muted small">Prévia montada a pedido de ${who(p.prev.by)}, ${ago(p.prev.em)}</span>`:''}</div>
 <div class="panel"><div class="row"><h3 style="margin:0">Bloco de parâmetros para IA</h3><span class="sp"></span><button class="btn ghost" onclick="copiarParam()">Copiar</button></div><p class="muted small">Modelo da seção 14 do Manual, já preenchido com os dados desta pauta. A agência cola em qualquer ferramenta de IA junto com o texto da peça.</p><pre class="gen" style="border-style:solid;max-height:340px;margin:0">${esc(paramBlock(p))}</pre></div>`}
function prevEditHTML(p,sl){
 const fs=(base,o)=>`<div class="grid g2">${F(base+'.contexto','Título: linha de contexto (traço fino)')}${F(base+'.ideia','Título: ideia central (negrito)')}</div>
  ${F(base+'.apoio','Texto de apoio',{type:'textarea',rows:2})}<div class="grid g3">${F(base+'.tarja','Tarja (uma palavra da ideia central)')}${o.capa?'':F(base+'.dr','Caixa de destaque: rótulo')}${o.capa?'':F(base+'.dt','Caixa de destaque: frase')}</div>
  <div class="grid g2">${F(base+'.c1r','Cartão 1: rótulo')}${F(base+'.c1t','Cartão 1: texto')}${F(base+'.c2r','Cartão 2: rótulo')}${F(base+'.c2t','Cartão 2: texto')}</div>
  ${o.capa?'':F(base+'.lista','Lista numerada (um item por linha)',{type:'textarea',rows:2})}${o.post?'':F(base+'.fonte','Mostrar a fonte no rodapé deste slide',{type:'check'})}`;
 return `<div class="stack" style="gap:14px;border-top:1px solid var(--line-soft);padding-top:14px"><p class="muted small" style="margin:0">A prévia se atualiza quando você sai do campo. Use um só elemento por slide: caixa, cartões ou lista.</p>
  <div class="grid g3">${F('prev.tema','Tema no cabeçalho (até 3 palavras)')}${F('prev.fonte','Fonte curta do rodapé')}${F('prev.alt','Texto alternativo da capa (T45)')}</div>
  ${sl.map((x,i)=>`<details class="panel" style="padding:14px 16px"><summary style="cursor:pointer;font-weight:500">${i+1}. ${esc(x.etapa||'Slide')}</summary><div class="stack" style="gap:12px;margin-top:12px">${i>0?F('prev.s.'+i+'.etapa','Rótulo da etapa no cabeçalho'):''}${fs('prev.s.'+i,{capa:i===0})}</div></details>`).join('')}
  <details class="panel" style="padding:14px 16px"><summary style="cursor:pointer;font-weight:500">Post único</summary><div class="stack" style="gap:12px;margin-top:12px">${fs('prev.post',{capa:true,post:true})}</div></details></div>`}
async function setTom(t){await writePauta(S.pid,{tom:t});logAct(S.pid,'mudou o tom da peça para '+t,{throttle:true});refresh(true)}
function zoomSlide(n){S.zoom=n;renderZoom()}
function renderZoom(){const p=S.pautas[S.pid];const v=S.prevView||'ig';const items=p?prevItems(p,v):[];const it=items[S.zoom];if(!it){S.zoom=null;closeModal();return}
 const H=(v==='li'||v==='pli')?1350:1440;const w=Math.max(260,Math.min(560,innerWidth-64,Math.round((innerHeight-170)*1080/H)));
 S.modalOpen=true;$('#modal').innerHTML=`<div class="modal-bg" onclick="if(event.target===this){S.zoom=null;closeModal()}"><div class="modal" role="dialog" aria-modal="true" aria-label="Slide ampliado" style="max-width:${w+48}px;padding:20px 24px;gap:12px">
 <div class="row"><b>${esc(it.lab)}</b><span class="sp"></span><button class="btn ghost" onclick="S.zoom=null;closeModal()">Fechar</button></div>${slideBox(slideHTML(p,it.s,it.o),H,w)}
 ${items.length>1?`<div class="row"><button class="btn" ${S.zoom>0?'':'disabled'} onclick="zoomSlide(${S.zoom-1})">Anterior</button><span class="sp"></span><span class="muted small">${S.zoom+1} de ${items.length}</span><span class="sp"></span><button class="btn" ${S.zoom<items.length-1?'':'disabled'} onclick="zoomSlide(${S.zoom+1})">Próximo</button></div>`:''}</div></div>`}
document.addEventListener('keydown',e=>{if(S.zoom==null||!$('#modal').innerHTML)return;if(e.key==='Escape'){S.zoom=null;closeModal()}else if(e.key==='ArrowRight')zoomSlide(S.zoom+1);else if(e.key==='ArrowLeft'&&S.zoom>0)zoomSlide(S.zoom-1)});
function paramBlock(p){const s=serieOf(p);const pr=p.prev||{};const sl=prevSlides(p);const cap=sl[0]||pr.post||{};const n=sl.length;
 const modo={sem:'sem foto',area:'área de foto no topo de 700 px',fundo:'foto de fundo'}[p.modoImagem||'sem'];
 const ver=p.versoes||{};const redes=[ver.igfb!==false?'Instagram e Facebook 1080 × 1440 (versão leve)':'',ver.lidoc!==false?'LinkedIn 1080 × 1350 (carrossel completo em PDF)':'',ver.lipost!==false?'LinkedIn 1080 × 1350 (post único)':''].filter(Boolean).join(' / ');
 return `Marca: BHM Advogados, advocacia tributária e financeira. Tom sóbrio, técnico, sem alarmismo.
Peça: ${n?`carrossel de ${n} slides`:'[post único / carrossel de N slides]'} para ${redes||'[rede]'}. Versão ${p.tom==='claro'?'clara':'escura'}. Modo de imagem ${modo}.
Cores: navy #071F34, dourado #C9A961, creme #F5F0E6, branco #FFFFFF, apoio #E6E1D6 (escuro) ou #3D4A5A (claro), dourado de texto #9A7B3C só sobre fundo claro.
Fontes: títulos em Cormorant Garamond; apoio em Inter.
Grade: margens de 96 px nas laterais e 88 px em cima e embaixo; nada a menos de 88 px da borda.
Cabeçalho: rótulo da série "${(s?.nome||'[SÉRIE]').toUpperCase()}" em Inter 600, 28 px, maiúsculas, letras +4 px; à direita, "${String(pr.tema||'[TEMA OU ETAPA]').toUpperCase()}" em Inter 600, 26 px, com losango dourado de 16 px; filete de 1 px abaixo.
Título: "${cap.contexto||'[linha de contexto]'}" em Cormorant 400 e, na linha de baixo, "${cap.ideia||'[ideia central]'}" em Cormorant 700; 84 a 112 px; ideia central branca no escuro ou #9A7B3C no claro.
Apoio: Inter 400, 34 a 38 px, entrelinha 1,4.
Elementos: losango de 56 px com contorno dourado na capa; filete dourado de 120 × 3 px; no máximo uma tarja por slide; cartões de leitura quando houver duas possibilidades.
Rodapé: numeração "01 / ${String(n||7).padStart(2,'0')}" em Inter 26 px e fonte "${pr.fonte||'[fonte]'}" em Inter 24 a 27 px à esquerda; logo oficial de 84 px à direita (com área de foto, logo de 96 px no canto superior direito da foto).
Foto: ${p.fotoOrigem||'[descrição]'}; nunca texto direto sobre a foto; título nunca sobre o rosto.
Não fazer: outras cores, outras fontes, emoji, travessão, sombra na logo, texto abaixo de 24 px.`}
function copiarParam(){const p=S.pautas[S.pid];navigator.clipboard?.writeText(paramBlock(p)).then(()=>toast('Bloco copiado.'),()=>toast('Não foi possível copiar. Selecione o texto e copie manualmente.'))}
function prevPrompt(p){const s=serieOf(p);const est=CARR[p.serie];
 const estrutura=est?`Use exatamente ${est.length} slides, nesta ordem: ${est.map((x,i)=>(i+1)+'. '+x).join('; ')}.`:`Use de 5 a 9 slides: 1 capa, depois blocos que agrupam as perguntas da estrutura (${(s?.estrutura||[]).join(' / ')}) e o último com a fonte e a chamada para salvar ou enviar.`;
 return `${BRIEFING}

Tarefa: transformar o criativo desta pauta no texto das artes do carrossel e do post único, no padrão do Manual de Padrão Visual da BHM.
${estrutura}
Regras de cada slide:
- Título em duas partes: "contexto" (linha de contexto em traço fino, até 32 caracteres, termina em dois-pontos, vírgula ou ponto) e "ideia" (ideia central em negrito, até 42 caracteres).
- Capa (slide 1): título que para o dedo (pergunta incômoda, número real ou reenquadramento) e "apoio" curto${p.serie==='bruno'?' terminando com "Arraste para entender."':''}. Na capa, "etapa" vazio.
- Slides internos: "etapa" com o nome do bloco em até 3 palavras; "apoio" com até 190 caracteres, frases curtas.
- No máximo um elemento por slide: caixa de destaque ("dr" rótulo curto, "dt" a frase que o leitor precisa guardar, até 120 caracteres), cartões de leitura quando houver duas possibilidades ("c1r","c1t","c2r","c2t", textos até 28 caracteres) ou lista numerada ("lista", até 4 itens curtos separados por |). Deixe vazios os campos não usados.
- "tarja": no máximo uma palavra que já aparece na ideia central, ou vazio.
- "fonte": true quando o slide cita decisão ou norma.
- As perguntas da estrutura nunca aparecem como pergunta nos slides internos. Sem travessão, sem emoji. Dado não confirmado fica [CONFERIR].
Escreva também "post" (versão em post único: contexto, ideia, apoio até 120 caracteres e cartões se houver duas leituras), "tema" (assunto em até 3 palavras, por exemplo PIS E COFINS), "fonteCurta" (referência curta para o rodapé, por exemplo STJ · Tema 1412 · afetado em fev. 2026, ou [CONFERIR]) e "alt" (texto alternativo da capa).
Responda só com JSON: {"tema":"","fonteCurta":"","alt":"","slides":[{"etapa":"","contexto":"","ideia":"","apoio":"","tarja":"","dr":"","dt":"","c1r":"","c1t":"","c2r":"","c2t":"","lista":"","fonte":false}],"post":{"contexto":"","ideia":"","apoio":"","tarja":"","c1r":"","c1t":"","c2r":"","c2t":""}}

${pautaContext(p)}

CRIATIVO JÁ ESCRITO:
${String(p.criativo||'').slice(0,14000)}`}
async function aiPrevia(pidArg){const pid=(typeof pidArg==='string'&&pidArg)||S.pid;const p=S.pautas[pid];if(!p)return;
 if(!p.serie){toast('Defina a série antes de montar a prévia.');return}if(!p.criativo){toast('Gere o criativo antes de montar a prévia.');return}
 S.prevGen=pid;refresh(true);
 try{const r=await S.sample.json(prevPrompt(p),{modelTier:'default',cache:false});
  const lista=(Array.isArray(r.slides)?r.slides:[]).slice(0,12);if(!lista.length)throw{code:'invalid_json'};
  const clean=o=>{const out={};['etapa','contexto','ideia','apoio','tarja','dr','dt','c1r','c1t','c2r','c2t'].forEach(k=>{out[k]=o&&o[k]!=null?String(o[k]):''});out.lista=String(o?.lista||'').split('|').map(x=>x.trim()).filter(Boolean).join('\n');out.fonte=!!o?.fonte;return out};
  const s={};lista.forEach((x,i)=>s[i]=clean(x));
  const prev={tema:String(r.tema||''),fonte:String(r.fonteCurta||''),alt:String(r.alt||''),s,post:clean(r.post||{}),by:S.me.id,em:nowISO()};
  await writePauta(pid,{prev:null});await writePauta(pid,{prev});logAct(pid,'montou a prévia visual com Claude ('+lista.length+' slides)');
 }catch(e){aiErr(e)}
 S.prevGen=null;refresh(true)}

/* ============ Papel e identidade ============ */
function askRole(first){const cur=papelOf(S.me.id)||'';const needName=!S.me.name||String(S.me.id).startsWith('local-');
 S.modalOpen=true;
 $('#modal').innerHTML=`<div class="modal-bg"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mh"><h3 id="mh">${first?'Bem-vindo ao Estúdio de Pautas':'Seu papel no projeto'}</h3>
 <p class="muted" style="margin:0">${first?'Cada ação no estúdio fica registrada com o seu nome. Diga qual é o seu papel para o painel mostrar o que depende de você.':'O papel muda o que aparece em destaque. Ninguém fica bloqueado.'}</p>
 ${needName?`<label class="f">Seu nome<input type="text" id="mName" value="${esc(S.me.name||S.equipe[S.me.id]?.nome||'')}" placeholder="Como a equipe te conhece"></label>`:''}
 <div class="stack" style="gap:8px">${Object.entries(PAPEIS).map(([k,v])=>`<button class="role-opt" aria-pressed="${cur===k}" onclick="document.querySelectorAll('.role-opt').forEach(b=>b.setAttribute('aria-pressed','false'));this.setAttribute('aria-pressed','true');window._role='${k}'"><b>${v.n}</b><span>${esc(v.d)}</span></button>`).join('')}</div>
 <div class="row"><span class="sp"></span>${first?'':'<button class="btn ghost" onclick="closeModal()">Cancelar</button>'}<button class="btn pri" onclick="saveRole()">Entrar no estúdio</button></div></div></div>`;
 window._role=cur;}
function closeModal(){$('#modal').innerHTML='';S.modalOpen=false}
async function saveRole(){const r=window._role;if(!r){toast('Escolha um papel.');return}const nm=$('#mName')?.value.trim();
 if($('#mName')&&!nm){toast('Escreva seu nome.');return}
 const entry={papel:r};if(nm){entry.nome=nm;S.me.name=S.me.name||nm;try{localStorage.setItem('bhm-nome',nm)}catch(e){}}
 const isNew=!S.equipe[S.me.id];
 try{if(S.db){const ref=S.db.doc('config/equipe');const snap=await ref.get();if(snap.exists)await queue('equipe',()=>ref.update({membros:{[S.me.id]:entry}}));else await queue('equipe',()=>ref.set({membros:{[S.me.id]:entry}}))}
  S.equipe[S.me.id]={...(S.equipe[S.me.id]||{}),...entry};
  logAct('',isNew?'entrou no estúdio como '+PAPEIS[r].n:'mudou o próprio papel para '+PAPEIS[r].n)}catch(e){handleWriteErr(e)}
 closeModal();refresh(true)}

/* ============ Início ============ */
async function boot(){
 const C=window.claude&&window.claude.use?window.claude:null;
 if(C){
  const [db,user,room,sample,downloads,assets]=await Promise.all(['db','user','room','sample','downloads','assets'].map(n=>C.use(n).catch(()=>null)));
  Object.assign(S,{db,user,room,sample,downloads,assets});
 }
 if(S.user){const m=await S.user.me();S.me.id=m.id;S.me.name=m.name||'';S.me.color=m.color;S.profiles[m.id]={name:m.name,avatarUrl:m.avatarUrl,color:m.color}}
 if(!S.me.id){let lid=null;try{lid=localStorage.getItem('bhm-local-id');if(!lid){lid='local-'+uidShort();localStorage.setItem('bhm-local-id',lid)}S.me.name=localStorage.getItem('bhm-nome')||''}catch(e){lid='local-'+uidShort()}S.me.id=lid}
 if(S.user){try{const cw=await S.user.can('data.write');if(cw===false)S.canWrite=false}catch(e){}}
 if(!S.db){S.noDb=true;S.ready=true;refresh(true);return}
 let gotEquipe=false,gotPautas=false;
 const maybeOnboard=()=>{if(gotEquipe&&gotPautas&&!S.equipe[S.me.id]?.papel&&!S.modalOpen&&S.canWrite)askRole(true)};
 S.db.doc('config/equipe').onSnapshot(s=>{S.equipe=(s.exists&&s.data().membros)||{};gotEquipe=true;maybeOnboard();refresh()},()=>{gotEquipe=true});
 S.db.doc('config/marca').onSnapshot(s=>{S.marca=s.exists?s.data():{};refresh()},()=>{});
 S.db.collection('pautas').onSnapshot(s=>{const o={};s.docs.forEach(d=>o[d.id]=d.data());S.pautas=o;gotPautas=true;S.ready=true;maybeOnboard();refresh()},e=>{S.ready=true;refresh(true)});
 S.db.collection('atividade').orderBy('em','desc').limit(60).onSnapshot(s=>{S.atividade=s.docs.map(d=>d.data());refresh()},()=>{});
 if(S.room){S.room.onPeers(ch=>{S.peers=ch.peers.filter(p=>p.kind==='viewer'&&!p.sameTab);refresh()},()=>{});announce()}
 setTimeout(()=>{if(!S.ready){S.ready=true;refresh(true)}},4000);
 setInterval(()=>{if(!activeField()&&!S.gen)refresh()},60000);
}
boot();
