# Codex Instructions

## Scope

* Faça somente alterações diretamente relacionadas ao escopo solicitado no prompt.
* Não realize refatorações, melhorias ou mudanças adicionais que não sejam necessárias para concluir a tarefa.
* Não altere arquivos não relacionados ao problema.
* Caso identifique melhorias fora do escopo, apenas mencione-as brevemente sem implementá-las.

## Git

* **Não crie commits, não faça amend, rebase, merge, push ou qualquer outra operação que altere o histórico Git**, a menos que isso seja explicitamente solicitado.
* É permitido consultar `git status`, `git diff` e informações do repositório quando necessário para entender ou validar as alterações.
* Nunca reverta alterações existentes do usuário que não façam parte do escopo solicitado.

## Tests

* Sempre que possível, sugira testes unitários relacionados às alterações realizadas.
* Se testes já existirem e forem relevantes, execute-os quando possível.
* Não crie uma suíte extensa de testes se isso não fizer parte do escopo solicitado.
* Ao finalizar, informe de forma curta quais testes foram executados ou quais testes são recomendados.

## Responses

* Seja conciso.
* Minimize o uso de tokens.
* Evite explicações longas sobre alterações óbvias.
* Não repita o conteúdo do prompt.
* Não descreva cada passo realizado.
* Ao finalizar uma tarefa, informe apenas:

  * o que foi alterado;
  * arquivos relevantes;
  * testes executados ou sugeridos;
  * eventuais problemas ou decisões que precisem da atenção do usuário.

## General Rule

Priorize sempre a **menor alteração possível** capaz de atender corretamente ao prompt.

Quando houver ambiguidade que possa causar mudanças significativas fora do escopo, pergunte antes de implementar.

## Project Context

* Consulte `PROJECT_CONTEXT.md` antes de alterar o projeto.
* Ao concluir alterações que mudem o estado do projeto, atualize `PROJECT_CONTEXT.md` no mesmo trabalho.
