// ========================
// ESTADO DA APLICAÇÃO
// ========================

const despesas = []

// ========================
// SELETORES
// ========================

const form = document.getElementById("form-item")
const nomeInput = document.getElementById("input-nome")
const categoriaInput = document.getElementById("input-categoria")
const valorInput = document.getElementById("input-valor")

const tabelaBody = document.getElementById("tabela-body")

const totalPlanejadoEl = document.getElementById("total-planejado")
const totalGastoEl = document.getElementById("total-gasto")
const totalRestanteEl = document.getElementById("total-restante")

// ========================
// EVENTO FORM
// ========================

form.addEventListener("submit", function (e) {
    e.preventDefault()

    const nome = nomeInput.value.trim()
    const categoria = categoriaInput.value
    const valor = Number(valorInput.value)

    if (!nome || valor <= 0) return

    const novaDespesa = {
        id: Date.now(),
        nome,
        categoria,
        valor,
        pago: false
    }

    despesas.push(novaDespesa)

    renderizarTabela()
    atualizarResumo()
    limparFormulario()
})

// ========================
// RENDERIZAÇÃO
// ========================

function renderizarTabela() {
    tabelaBody.innerHTML = ""

    despesas.forEach((item) => {
        const tr = document.createElement("tr")

        tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.categoria}</td>
      <td>R$ ${item.valor.toFixed(2)}</td>
      <td class="${item.pago ? 'status-pago' : 'status-pendente'}">
        ${item.pago ? 'Pago' : 'Pendente'}
      </td>
      <td>
        <button onclick="togglePago(${item.id})">✔</button>
        <button onclick="removerItem(${item.id})">🗑</button>
      </td>
    `

        tabelaBody.appendChild(tr)
    })
}

// ========================
// AÇÕES
// ========================

function togglePago(id) {
    const item = despesas.find(d => d.id === id)
    if (!item) return

    item.pago = !item.pago

    renderizarTabela()
    atualizarResumo()
}

function removerItem(id) {
    const index = despesas.findIndex(d => d.id === id)
    if (index === -1) return

    despesas.splice(index, 1)

    renderizarTabela()
    atualizarResumo()
}

// ========================
// RESUMO
// ========================

function atualizarResumo() {
    let totalPlanejado = 0
    let totalGasto = 0

    despesas.forEach(item => {
        totalPlanejado += item.valor
        if (item.pago) totalGasto += item.valor
    })

    const restante = totalPlanejado - totalGasto

    totalPlanejadoEl.textContent = totalPlanejado.toFixed(2)
    totalGastoEl.textContent = totalGasto.toFixed(2)
    totalRestanteEl.textContent = restante.toFixed(2)
}

// ========================
// UTIL
// ========================

function limparFormulario() {
    nomeInput.value = ""
    valorInput.value = ""
}