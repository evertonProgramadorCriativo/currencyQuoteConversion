
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
/* 
Conceito sobre teste unitario e axios

para fazemos teste com axios e ele seja unitario precissamos fazer um demo 
senão o teste vai ser de integração
*/