import React from 'react'
import Prismic from 'prismic-javascript'
import Head from 'next/head'

const Index = ({ data }) => {
    return (
        <div className="bg-gray-300">
             <Head>
                <title>{data.pagetitle}</title>
            </Head>
        <div className="w-1/2 mx-auto text-center p-8">
            <h1 className="font-bold text-4xl">{data.title}</h1>
            <img src={data.logo.url} className="mx-auto mt-4 rounded-full shadow-2xl w-64"/>
            {data.body.map((item) => {
                if (item.slice_type === 'secao') {
                    return <h2 className="font-bold text-2xl pt-4">{item.primary.nome}</h2>
                }

                if (item.slice_type === 'link') {
                    return (
                        <div>
                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block" href={item.primary.destino.url}>{item.primary.texto_do_botao}</a>
                        </div>
                        )
                }

                if (item.slice_type === 'imagem') {
                    // return <img src={item.primary.imagem.url} className="mx-auto"/>
                }

                return 
                return null
            })}
            <div className="py-4">
                Projeto criado durante o evendo Dev10K | <a href="https://devpleno.com">DevPleno</a> <br/>
                Código fonte disponivel em 
            </div>
        </div>
        </div>
    )
}

export async function getServerSideProps() {
    const client = Prismic.client('https://website2tests.cdn.prismic.io/api/v2')
    const centralLinks = await client.getSingle('centrallinks')
    return {
        props: {
            data: centralLinks.data,
    },}
}

export default Index