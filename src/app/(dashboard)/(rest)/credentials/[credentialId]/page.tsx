interface PageProps {
    params: Promise<{
        credentialId: string;
    }>
}

//http://localhost:3000/credentials/123

const Page = async ({ params }: PageProps) => {
    const { credentialId } = await params;
    return <p>credential Id: {credentialId}</p>
}

export default Page;