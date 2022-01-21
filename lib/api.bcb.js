const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${data}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = (url) =>  axios.get(url)
const extractCotacao = res =>  res.data.value[0].cotacaoVenda
 
const getToday = () => {
    //no javascript o mes 0 - 11  por isso soma +1 no mes
    const today = new Date()
       return (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
}

const getCotacao = ({getToday, getUrl, getCotacaoAPI,extractCotacao}) => async () =>  {
try{
    const today = getToday()
   // console.log(today)
   const url = getUrl(today)
    const res = await getCotacaoAPI(url)//1-19-2022
const cotacao = extractCotacao(res)
return cotacao
}catch (err){
    return ''
    //para o value não desaparece 

}


}



module.exports = {
    getToday,
    getCotacaoAPI,
    getCotacao: getCotacao({ getToday, getUrl, getCotacaoAPI, extractCotacao}),
    extractCotacao,
    getUrl,
    pure: {
        getCotacao
    }
}

