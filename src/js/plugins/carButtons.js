//Filtrando os carros
import $ from 'jquery'

//Importando a função para o botão cars funcionar corretamente
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 600

function filterByCar(car) {
    $('[wm-car]').each(function(i, e) {
        const isTarget = $(this).attr('wm-car') === car || car === null
        if (isTarget) {
            $(this)
                .parent()
                .removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this)
                    .parent()
                    .addClass('d-none')
            })
        }
    })
}

function desactiveElements(btnSelected) {
    $('button').each(function(i, e) {
        if (e !== btnSelected) {
            $(e).removeClass('active')
        }
    })
}

//const carButtons = $('[wm-car-buttons]')
$.fn.carButtons = function() {
    //Plugin:
    const cars = new Set()
    $('[wm-car]').each(function(i, e) {
        cars.add($(e).attr('wm-car'))
    })

    const btns = Array.from(cars).map(car => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info'])
            .html(car)
        btn.click(function(e) {
            filterByCar(car)
            $(this).addClass('active')
            // Desativando os elementos, exceto o this
            desactiveElements(this)
        })
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active'])
        .html('Todos')
    btnAll.click(function(e) {
        filterByCar(null)
        $(this).addClass('active')
        desactiveElements(this)
    })
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

//Só vai chamar '[carButtons]' quando a página foi carregada com sucesso
onLoadHtmlSuccess(function() {
    $('[wm-car-buttons]').carButtons()
})
