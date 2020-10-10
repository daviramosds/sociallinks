import React, { useEffect } from 'react'
import Prismic from 'prismic-javascript'
import { useRouter } from 'next/router'
import Head from 'next/head'

const RedirectTo = () => {
    const router = useRouter()
    useEffect(() => {
        console.log('Carregou')
        setTimeout(() => {
            router.push('/')
        }, 2000)
    }, [])
    return (
        <div className="w-1/2 mx-auto text-center mt-4">
            <Head>
                <title>Pagina não encontrada</title>
            </Head>
            <h1 className="font-bold text-4xl">URL Não encontrada</h1>
            <p>Estamos redirecionando você para a Central de Links</p>
        </div>
    )
}

export async function getServerSideProps({ params, res }) {
    const client = Prismic.client('https://website2tests.cdn.prismic.io/api/v2')
    const link = await client.getByUID('shortlink', params.slug)
    if (link) {
        res.statusCode = 301
        res.setHeader('Location', link.data.destino.url)
        res.end
    }
    return {
        props: {}
    }
}


export default RedirectTo