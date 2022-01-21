
const { default: axios } = require('axios')
const api = require('./api.bcb')

jest.mock('axios') //copia demo do objeto Mock

test('getCotacaoAPI', () =>{
    //res.data.value[0].cotacaoVenda
const res = {
    data: {
        value: [
            {
                cotacaoVenda: 5.4978
            }
        ]
    }
}
axios.get.mockResolvedValue(res)
api.getCotacaoAPI('url').then( resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toEqual('url')
})

})
test('extractCotacao', () => {
 const cotacao =  api.extractCotacao({
        data: {
            value: [
                {
                    cotacaoVenda: 5.4978
                }
            ]
        }
    })

    expect(cotacao).toBe(5.4978)
})
describe('getToday', () => {
    const RealDate = Date 

    function mockDate(date) {
        globalThis.Date = class extends RealDate {
            constructor() {
                return new RealDate(date)
            }
        }
    }
    afterEach(() => { 
        globalThis.Date = RealDate
    })
    test('getToday', () => {
       mockDate('2019-01-01T12:00:00z')
       const today = api.getToday()
       //console.log(today)
    expect(today).toBe('1-1-2019')
    })

})

test('getURL', () => {
    const url = api.getUrl('MINHA-DATA')
    expect(url).toBe('https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27MINHA-DATA%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao')
})


test('getCotacao', () => {
    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 5.4978
                }
            ]
        }
    }

    const getToday = jest.fn() //criando versao falso da versao
    getToday.mockResolvedValue('01-01-2019')
    const getUrl = jest.fn()
    getUrl.mockResolvedValue('url')
    const getCotacaoAPI = jest.fn()
    getCotacaoAPI.mockResolvedValue(res)
    const extractCotacao = jest.fn()
    extractCotacao.mockResolvedValue(5.4)
     
 api.pure
    .getCotacao({ getToday, getUrl , getCotacaoAPI , extractCotacao})()
   .then(res => { console.log(  res )})
})

/* 
Conceito sobre teste unitario e axios

para fazemos teste com axios e ele seja unitario precissamos fazer um demo 
senão o teste vai ser de integração
*/