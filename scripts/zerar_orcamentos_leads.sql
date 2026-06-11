-- Script: zerar orçamentos e leads do sistema
-- Preserva: usuarios, resultado_exame, servico, pergunta_servico
-- Ordem: respostas → orcamentos → pessoas (FK de dentro para fora)

-- BEGIN;

-- DELETE FROM resposta_orcamento;
-- DELETE FROM orcamento;
-- DELETE FROM pessoa;

-- COMMIT;
