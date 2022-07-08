import $ from 'jquery'

//Quando a página for carregada com sucesso as funções dentro do array serão carregadas
const loadHtmlSuccessCallbacks = []

//Registrando array de cima:
export function onLoadHtmlSuccess(callback) {
    //Se a callback passada não estiver dentro do array informadp, vá lá e passe! (push)
    if (!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

//Essa função ler todos os atributos wm-include
function loadIncludes(parent) {
    if (!parent) parent = 'body'
    //procure dentro do parent, todos elementos que possuem wm-include
    $(parent)
        .find('[wm-include]')
        //primeiro o index depois o próprio elemento:
        .each(function(i, e) {
            const url = $(e).attr('wm-include')
            $.ajax({
                url,
                success(data) {
                    //se sucesso pega o resultado obtido e coloca dentro do elemento
                    $(e).html(data)
                    //para não chamar duas vezes o include
                    $(e).removeAttr('wm-include')

                    loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                    // Usa o elemento como parent eaí procura nesse elemento novos includes até carregar todos de forma recursiva
                    loadIncludes(e)
                }
            })
        })
}

//vazio porque eu já defini o 'body' como parent na função
loadIncludes()
