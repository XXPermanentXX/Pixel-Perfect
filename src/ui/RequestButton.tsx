import { Button, Link } from "@nextui-org/react"


const RequestButton = () => {
    return (
        <Button as={Link} href="/request-demo" size="lg" radius="full" variant="solid" color="primary" className="w-48 font-semibold">
            REQUST A   DEMO
        </Button>
    )
}

export default RequestButton